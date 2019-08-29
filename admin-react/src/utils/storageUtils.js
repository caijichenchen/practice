/*-----------用来在local中保存数据的模块-------------*/
import store from 'store'
export default {
	//设置user
	saveUser(user){
		// window.localStorage.setItem('user_key',JSON.stringify(user))
		store.set('user_key',user)
	},
	//读取user
	getUser(){
		// return JSON.parse(window.localStorage.getItem('user_key') || '{}')
		return store.get('user_key') || {}
	},
	//删除user
	removeUser(){
		// window.localStorage.removeItem('user_key')
		store.remove('user_key')
	}
}