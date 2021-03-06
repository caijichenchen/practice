import axios from 'axios'
import * as types from './actionTypes.js'
import {message} from 'antd'
import { request } from 'util'
import api from 'api'


export const getSetImageAction = (fileList)=>({
    type:types.SET_IMAGE,
    payload:fileList
})

const setImageError = ()=>({
    type:types.SET_IMAGE_ERROR
})


export const getSaveAction = (err,values)=>{
    return (dispatch,getState)=>{
        console.log("11",values);
        const state = getState().get('ad');
        const image = state.get('image');
        console.log(image);
        let hasError = false;
        if(err){
            hasError = true;
        }
        if(!image){
            dispatch(setImageError())
            hasError = true;
        }       
        if(hasError){
            return;
        }
        let request = api.addAds
        if(values.id){
            request = api.updateAds
        }
        request({
            ...values,
            image:image,        
        })
        .then(result=>{
            if(result.code == 0){
                message.success(result.message)
                window.location.href = '/ad'
            }else{
                message.error(result.message)
            }
        })
    }
}

const getSetPageAction = (payload)=>{
    return {
        type:types.SET_PAGE,
        payload
    }
}
const getPageRequstAction = ()=>{
    return {
        type:types.PAGE_REQUEST
    }
}

const getPageDoneAction = ()=>{
    return {
        type:types.PAGE_DONE
    }
}
export const getPageAction = (page)=>{
    return (dispatch)=>{
        dispatch(getPageRequstAction())
        api.getAdsList({
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }           
        })
        .finally(()=>{
            dispatch(getPageDoneAction())
        })  
    }
}
export const getUpdateOrderAction = (id,newOrder)=>{
    return (dispatch,getState)=>{
        const state = getState().get('ad');
        api.updateAdsOrder({
            id:id,
            order:newOrder,
            page:state.get('current')           
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }           
        })
    }
}

export const getUpdateIsShowAction = (id,newIsShow)=>{
    return (dispatch,getState)=>{
        const state = getState().get('ad');
        api.updateAdsIsShow({
            id:id,
            isShow:newIsShow,
            page:state.get('current')           
        })          
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }           
        })
    }
}


const setAdDetail = (payload)=>({
    type:types.SET_AD_DETAIL,
    payload
})
export const getAdDetailAction = (adId)=>{
    return (dispatch)=>{
        api.getAdsDetail({
            id:adId
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(setAdDetail(result.data))
            }else{
                message.error(result.message)
            }           
        })
    }
}