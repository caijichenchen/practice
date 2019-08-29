import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import ProductHome from './home.js';
import ProductDetail from './detail.js';
import ProductAddUpdate from './add-update.js';
/*-----------商品路由组件-------------*/
export default class Product extends Component {
	render(){
		return (
			<Switch>
				<Route path="/product" exact component={ProductHome}/>
				<Route path="/product/detail" component={ProductDetail}/>
				<Route path="/product/addupdate" component={ProductAddUpdate}/>
			</Switch>
		)
	}
}