/* 
包 含 多 个 用 于 生 成 新 的 state的 reducer函 数 的 模 块
*/ 
import {combineReducers} from 'redux'
function xxx(state = 0, action) {
	return state
}
function yyy(state = 0, action) {
	return state
}
//返 回 合 并 后 的 reducer函 数 
export default combineReducers({ 
	xxx, yyy 
})
