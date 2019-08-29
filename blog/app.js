const mongoose = require('mongoose');
const Cookies = require('cookies');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const swig = require('swig');
const app = express();

/*-------------连接数据库------------*/
//1.连接数据库
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true});
mongoose.set('useFindAndModify',false);
//2.获取对象
const db = mongoose.connection;
//3.连接数据库失败
db.on('error',()=>{
	console.log("connect db error");
	throw 'connect db error';
})

db.once('open',()=>{
	console.log("connection success ...");
})

//加载静态
app.use(express.static("public"));

/*-------------配置模板------------*/
//使用模板配置信息
swig.setDefaults({
		cache:false
})
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');

/*-------------使用中间件------------*/
//中间件
app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));

/*-------------配置cookies信息------------*/
//防止用户登陆后刷新页面需重新登陆
/*
app.use((req,res,next)=>{
	//生成cookie对象并且保存到req上
	req.cookies = new Cookies(req,res);
	let userInfo = {};
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'));
	}
	req.userInfo = userInfo;
	next()
})
*/
/*-------------配置cookies+session中间件------------*/
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })   
}))
app.use((req,res,next)=>{
	req.userInfo = req.session.userInfo || {};
	next()
})

/*-------------中心路由处理开始------------*/
app.use('/',require('./routes/index.js'));
app.use('/user',require('./routes/user.js'));
/*-------------中心路由处理结束------------*/


app.listen(3000, () => console.log('Example app listening on port 3000!'));