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
            if(action.result.status!=="200"){
                return {...state,isLoading:false}
            }else{
                message.success("登录成功，正在跳转");
                return {...state,...action.result,isLoading:false}
            }
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}