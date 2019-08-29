/*
封装一个可以发送ajax请求的函数模块
封装axios库
函数返回的是一个promise对象
1.优化: 统一处理异常情况
2.优化: 返回数据是response.data
*/
import axios from 'axios';
import { message } from 'antd';

export default function ajax(url,data={},type="GET"){
	//返回一个promise对象
	let promise;
	return new Promise((resolve,reject)=>{
		if(type === "GET"){//发送get请求
			promise = axios.get(url,{//配置对象
				params:data//接收的数据
			})
		}else{//发送post请求
			promise = axios.post(url,data)
		}
		promise
		.then(response=>{//如果成功了,调用reslove
			resolve(response.data)
		})
		.catch(err=>{//如果失败了,提示错误信息
			message.error("请求出错了：",err.message);
		})
	})
}

