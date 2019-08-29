
/*-- -------------注册登陆路由------------ --*/
const express = require('express');
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js');
const router = express.Router();

/*-- -------------用户注册路由------------ --*/
router.post('/register',(req,res)=>{
	//通过中间件拿到ajax发送的数据
	const { username,password } = req.body;
	//数据库验证
	UserModel.findOne({ username:username })
	.then(user=>{
		if(user){
			res.json({
				status:10,
				message:"该用户名已经被使用"
			})
		}
		else{//数据库插入数据
			UserModel.insertMany({
				username:username,
				password:hmac(password)
			})
			.then(data=>{
				res.json({
					status:0,
					message:"恭喜注册成功",
					data:data
				})
			})
			.catch(err=>{
				res.json({
					status:10,
					message:"注册失败请稍后重试"
				})
			})
		}
	})
	.catch(err=>{
		res.json({
			status:10,
			message:"服务器无响应,请稍后重试"
		})
	})
})

/*-- -------------用户登陆路由------------ --*/
router.post('/login',(req,res)=>{
	//1.通过中间件拿到ajax请求参数
	const { username,password } = req.body;
	//2.用户数据库验证
	UserModel.findOne({ username:username,password:hmac(password) })
	.then(user=>{
		if(user){//验证通过
			//生成cookies返回给前端
			// req.cookies.set('userInfo',JSON.stringify(user));
			//添加session信息
			req.session.userInfo = user;
			res.json({
				status:0,
				message:'登陆成功',
				data:user
			})
		}
		else{//验证不通过
			res.json({
				status:10,
				message:'登陆失败,用户名或密码错误'
			})
		}
	})
	.catch(err=>{
		res.json({
			status:10,
			message:'登陆失败,用户名或密码错误'
		})
	})
})

module.exports = router;