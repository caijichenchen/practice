import React,{ Component } from 'react';
import './left-nav.less';
import { Link,withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Menu, Icon } from 'antd';
import menuList from '../../config/menuConfig.js'

const { SubMenu } = Menu;
/*左侧导航组件*/
 class LeftNav extends Component {
	//根据MenuList的数据生成标签数组
	//使用map+递归调用
	getMenuNodes(menuList){
		//拿到请求地址
		const path = this.props.location.pathname;
		return menuList.map(item=>{
			if(!item.children){
				return (
					<Menu.Item key={item.key}>
			          <Link to={item.key}>
			          	<Icon type={item.icon} />
			            <span>{item.title}</span>
			          </Link>
		          	</Menu.Item> 
				)
			}else{
				//查找一个与当前路径匹配的子列表
				const cItem = item.children.find(cItem=>cItem.key === path);
				if(cItem){
					//如果存在说明当前列表需要展开
					this.openKey = item.key;
				}
				
				return (
					<SubMenu
		            key={item.key}
		            title={
		              <span>
		                <Icon type={item.icon} />
		                <span>{item.title}</span>
		              </span>
			            }
			        >
			           {
			           	this.getMenuNodes(item.children)
			           }
			        </SubMenu>
				)
			}
		})
	}
	//在第一次render之前执行一次
	//为第一次render数据之前做准备
	componentWillMount(){
		this.menuNodes = this.getMenuNodes(menuList)
	}

	render() {
		//拿到请求地址
		const path = this.props.location.pathname;
		const openKey = this.openKey;
		return (
			<div>
				<div className="left-nav">
					<Link to="/" className="left-nav-header">
						<img src={logo} alt="logo" />
						<h1>谷粒后台</h1>
					</Link>
				</div>
				<Menu
		          mode="inline"
		          theme="dark"
		          selectedKeys={[path]}
		          defaultOpenKeys={[openKey]}
		        >
		         {
		         	this.menuNodes
		         }
		        </Menu>
			</div>
			
		)
	}
}
//包装非路由组件,返回一个新的路由组件,传递history/location/match
export default withRouter(LeftNav)