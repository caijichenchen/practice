/* 用 户 注 册 的 路 由 组 件 */
import React,{Component} from 'react'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile'
import Logo from '../../components/logo/logo.js'
const ListItem = List.Item
export default class Register extends Component {
	//初始化定义状态
	state = {
		username:'',//用户名
		password:'',//密码
		respassword:'',//确认密码
		type:'dashen'//用户类型
	}

	//收集输入框数据更新state
	handleChange = (name,val)=>{
		this.setState({
			[name]:val
		})
	}
	//跳转login路由
	toLogin = () =>{
		this.props.history.replace('/login')
	}
	//注 册 
	register = () => { 
		console.log(JSON.stringify(this.state)) 
	}

	render() {
		const {type} = this.state
		return (
			<div>
				<NavBar style={{ backgroundColor:'#1DA57A'}}>谷&nbsp;粒&nbsp;直&nbsp;聘&nbsp;</NavBar>
				<Logo/>
				<WingBlank> 
				<List> 
					<InputItem placeholder='请输入用户名'  onChange={val => this.handleChange("username",val)}> 用户名: </InputItem> 
					<WhiteSpace/> 
					<InputItem placeholder='请输入密码'  onChange={val => this.handleChange("password",val)}> 密&nbsp;&nbsp;&nbsp;码: </InputItem> 
					<WhiteSpace/> 
					<InputItem placeholder='请确认密码' onChange={val => this.handleChange("respassword",val)}> 确认密码: </InputItem> 
					<WhiteSpace/> 
					<List.Item> 
					<span style={{marginRight: 30}}>用户类型:</span> 
					<Radio 
						checked={this.state.type === 'dashen'}
						onChange={val => this.handleChange("type",val)}
					>大神</Radio> 
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
					<Radio
						checked={this.state.type === 'laoban'}
						onChange={val => this.handleChange("type",val)}
					>老板</Radio> 
					</List.Item> 
					<WhiteSpace/> 
					<Button 
						type='primary' 
						style={{ backgroundColor:'#1DA57A'}}
						onClick={this.register}
					>注&nbsp;&nbsp;&nbsp;册 </Button> 
					<WhiteSpace/> 
					<Button onClick={this.toLogin}>已经有账号</Button> 
					</List> 
				</WingBlank>
			</div>
		)
	}
}