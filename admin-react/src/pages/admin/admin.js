import React,{ Component } from 'react';
import memoryUtil from '../../utils/memoryUtils.js';
import { Redirect,Route,Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../../components/header/header.js';
import LeftNav from '../../components/left-nav/left-nav.js';
import Home from '../home/home.js';
import Product from '../product/product.js';
import User from '../user/user.js';
import Role from '../role/role.js';
import Category from '../category/category.js';
import Bar from '../charts/bar.js';
import Line from '../charts/line.js';
import Pie from '../charts/pie.js';
const { Footer, Sider, Content } = Layout;

/*-----------后台管理路由组件-------------*/
export default class Admin extends Component{
	render(){
		//拿到模块内的存储信息
		const user = memoryUtil.user;
		if(!user || !user._id){
			//如果查询没有登陆自动跳转登陆界面
			return <Redirect to="/login" />
		}
		return (
			<Layout style={{height:'100%'}}>
		      <Sider>
		      	<LeftNav/>
		      </Sider>
		      <Layout>
		        <Header>Header</Header>
		        <Content style={{ margin:'20px', backgroundColor:'#fff'}}>
		        	<Switch>
		        		<Route path='/home' component={Home}/> 
		        		<Route path='/category' component={Category}/> 
		        		<Route path='/product' component={Product}/> 
		        		<Route path='/role' component={Role}/> 
		        		<Route path='/user' component={User}/> 
		        		<Route path='/charts/bar' component={Bar}/> 
		        		<Route path='/charts/line' component={Line}/> 
		        		<Route path='/charts/pie' component={Pie}/> 
		        		<Redirect to='/home' /> </Switch> 
		        </Content>
		        <Footer style={{ textAlign:'center',color:'#ccc' }}>推荐使用谷歌浏览器,可以获得更佳体验效果</Footer>
		      </Layout>
		    </Layout>
		)
	}
}