import React,{ Component } from 'react';
import './header.less';
import { reqWeather } from '../../api/index.js';
import { withRouter } from 'react-router-dom';
import memoryUtil from '../../utils/memoryUtils.js';
import storageUtil from '../../utils/storageUtils.js';
import { formateDate } from '../../utils/dateUtils.js';
import menuList from '../../config/menuConfig.js';
import { Modal} from 'antd';
import LinkButton from '../link-button/button.js'
/*头部导航组件*/
class Header extends Component {

	//初始化定义状态
	state = {
		currentTime: formateDate(Date.now()),//当前时间字符串
		dayPictureUrl:'',//天气图片
		weather:'',//天气信息
		city:'许昌'
	}

	getCurrentTime(){
		this.timer=setInterval(()=>{//实时获取状态数据
			const currentTime = formateDate(Date.now());
			this.setState({currentTime})
		},1000)
	}
	getWeather = async () => {
	    // 调用接口请求异步获取数据
	    const {dayPictureUrl, weather} = await reqWeather(this.state.city)
	    // 更新状态
	    this.setState({dayPictureUrl, weather})
	 }

	 getTitle(){
	 	//获取到当前路径名
	 	const path = this.props.location.pathname;
	 	let title;
	 	menuList.forEach(item=>{
	 		if(item.key === path){
	 			title = item.title
	 		}else if(item.children){
	 			//在子item查找
	 			const cItem = item.children.find(cItem=> cItem.key===path)
	 			if(cItem){
	 				title = cItem.title
	 			}
	 		}
	 	})
	 	return title
	 }

	//退出登陆
	logout=()=>{
		// 显示确认框
	    Modal.confirm({
	      content: '确定退出吗?',
	      onOk: () => {
	        // console.log('OK', this);
	        //删除保存的user数据
	        storageUtil.removeUser();
	        memoryUtil.user = {};
	        //跳转到登陆页面
	        this.props.history.replace('/login')
	      }
	    })
	}

	//第一次render之后执行一次,一般发送异步请求
	componentDidMount(){
		//获取当前时间
		this.getCurrentTime()
		//获取当前天气
		this.getWeather()
	}
	//当前组件死亡卸载前调用
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	render() {
		const { currentTime,dayPictureUrl,weather,city } = this.state;
		const username = memoryUtil.user.username;
		//得到当前需要显示的title
		const title = this.getTitle()
		return (
			<div className="header">
				<div className="header-top">
		          <span>欢迎, {username}</span>
		          <LinkButton onClick={this.logout}>退出</LinkButton>
		        </div>
		        <div className="header-bottom">
		          <div className="header-bottom-left">{ title }</div>
		          <div className="header-bottom-right">
		            <span>{currentTime}</span>
		            <img src={dayPictureUrl} alt="weather"/>
		            <span>{city}&nbsp;&nbsp;</span>
		            <span>{weather}</span>
		          </div>
		        </div>
			</div>
		)
	}
}

export default withRouter(Header)