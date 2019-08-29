/*
包含应用中所有接口请求模块
每个函数的返回值都是promise
*/
import jsonp from 'jsonp';
import { message } from 'antd';
import ajax from './ajax.js';
// const BASE = 'http://localhost:5000';
const BASE = "";

/*-----------登陆的接口---------*/
export const reqLogin=(username,password)=>ajax(BASE+"/login",{username,password},"POST")
/*-----------添加用户的接口---------*/
export const reqAddUser=(user)=>ajax(BASE+"/manage/user/add",user,"POST")
/*-----------一级/二级分类的接口---------*/
export const reqCategories = (parentId)=>ajax(BASE+'/manage/category/list',{parentId})
/*-----------添加分类的接口---------*/
export const reqAddCategories = ({categoryName,parentId})=>ajax(BASE+'/manage/category/add',{categoryName,parentId},"POST")
/*-----------更新分类的接口---------*/
export const reqUpdateCategories = ({parentId,categoryName})=>ajax(BASE+'/manage/category/update',{parentId,categoryName},"POST")

//发送jsonp请求
export const reqWeather = (city)=>{
	return new Promise((resolve,reject)=>{
		const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
		jsonp(url,{},(err,data)=>{
			//如果成功了取出需要的数据
			if(!err && data.status === 'success'){
				//拿到需要的数据
				const { dayPictureUrl,weather } = data.results[0].weather_data[0];
				resolve({ dayPictureUrl,weather })
			}else{//失败了打印错误信息
				message.error("获取天气数据失败")
			}
			
		})
	})
}