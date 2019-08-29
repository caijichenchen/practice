/*-----------应用的根组件-------------*/
import React,{ Component } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import Login from './pages/login/login.js';//登陆
import Admin from './pages/admin/admin.js';//首页

export default class App extends Component{
	render(){
		return (
			<Router>
				<Switch>{/*只匹配其中的一个*/}
					<Route path="/login" component={Login}></Route>
					<Route path="/" component={Admin}></Route>
				</Switch>
			</Router>
		)
	}
}