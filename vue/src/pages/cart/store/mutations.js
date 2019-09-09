//唯一更改state的方法
//mutation必须是同步函数
import {GET_ADS} from './types.js'
export default {
    [GET_ADS](state,payload){
        state.ads = payload.homeAds      
    }                  
}