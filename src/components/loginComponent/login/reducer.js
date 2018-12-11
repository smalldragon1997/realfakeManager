import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    info:undefined, // 管理员信息
    isLoading:false   // 是否加载中
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.Done: {
            return {...state,isLoading:false}
        }
        case ActionTypes.Success: {
            if(!action.result.isLogin){
                message.error("用户名或密码错误");
                return {...state}
            }else if(action.result.info.isForbidden){
                message.error("该账号被禁用，请联系管理员");
                return {...state}
            }else{
                message.success("登录成功，正在跳转");
            }
            // 如果需要保存登录状态
            localStorage.setItem("RealFakeManagerJwt", action.result.info.jwt);
            console.log("已保存登录状态" + localStorage.getItem("RealFakeManagerJwt"));

            return {...state,...action.result,isLoading:false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}