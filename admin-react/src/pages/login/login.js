import React,{ Component } from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import './login.css';
import logo from '../../assets/images/logo.png';
import { reqLogin } from '../../api';
import memoryUtil from '../../utils/memoryUtils.js';
import storageUtil from '../../utils/storageUtils.js';
import { Redirect } from 'react-router-dom';
/*-----------登陆路由组件-------------*/
class Login extends Component{

	handleSubmit(ev){
		ev.preventDefault();
		this.props.form.validateFields(async (err, values) => {
	      if (!err) {
	        const { username,password } = values;	        
        	const result = await reqLogin(username,password);
	        // console.log("成功了",response.data);
	        if(result.status === 0){
	        	//提示登陆成功
	        	message.success("登陆成功");

	        	//保存用户登陆信息在内存
	        	const user = result.data;
	        	memoryUtil.user = user;//保存在内存中
	        	//保存登陆信息在local中
	        	storageUtil.saveUser(user);

	        	//跳转管理页面,并不需要回退
	        	this.props.history.replace("/");
	        }else{
		      	//登陆失败提示错误信息
		      	message.error(result.message)
		      }
	      }else{
	      	message.error("请求错误")
	      }
	    });
		//得到form对象
		// const form = this.props.form;
		//获取数据
		// form.validateFields()
		// .then(values=>{
		// 	console.log(values);
		// })
	};
	//自定义校验密码
	validator(rules,value,callback){
		if(!value){
			callback("密码必须输入");
		}
		else if(value.length<4){
			callback("密码最低4位");
		}
		else if(value.length>12){
			callback("密码最多12位");
		}
		else if(!/^[a-zA-Z0-9_]+$/.test(value)){
			callback("密码必须是英文,数字,下划线");
		}
		else{
			callback();
		}
	}
	render(){
		//查询用户是否登陆,登陆直接跳转到管理界面
		const user = memoryUtil.user;
		if(user && user._id){
			return <Redirect to="/" />
		}
		//拿到传递过来的form对象
		const form = this.props.form;
		const { getFieldDecorator } = form;
		return (
			<div className="login">
				<header className="login-header">
					<img src={ logo } alt="logo"/>
					<h1>React项目:后台管理系统</h1>
				</header>
				<section className="login-content">
					<h2>用户登陆</h2>
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				        <Form.Item>
				        	{
				        		getFieldDecorator('username',{
				        			rules: [
				        				{ required: true, whitespace:true, message: '用户名必须输入' },
				        				{ min: 4, message: '用户名最低4位' },
				        				{ max: 12, message: '用户名最多12位' },
				        				{ pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文,数字,下划线' }
				        			],
				        		})(
				        		<Input
					              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					              placeholder="用户名"
					            />)
				        	}
				        	
				        </Form.Item>
				        <Form.Item>
					        {
					        	getFieldDecorator('password',{
					        		rules: [
					        			{
					        				validator:this.validator.bind(this)
					        			}
					        		]
					        	})(
					        		<Input
						              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						              type="password"
						              placeholder="密码"
						            />)
					        }
					        
				        </Form.Item>
				        <Form.Item>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            登陆
				          </Button>
				        </Form.Item>
				      </Form>
				</section>
			</div>
		)
	}
}
/*
1.高阶函数
 1).一类特别的函数
  a.接受函数类型的参数
  b.返回值是函数
 2).常见的高阶函数
  a.定时器
  b.Promise
  c.数组的遍历方法
  d.函数对象bind
  e.Form.create
2.高阶组件
 1).本质就是一个函数
 2).接受一个被包装组件,返回一个包装组件包装组件会向被包装组件传递特定属性
 3).拓展组件的功能
*/
/*包装Form组件生成一个新的组件:Form(Login)
新组件会向Form组件传递一个对象属性:form
*/
const WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm