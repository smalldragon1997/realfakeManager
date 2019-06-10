import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    isLoading: false,   // 是否加载中
    auth: undefined, // auth
    authId:undefined,
    auths:[]
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {

        case ActionTypes.Start: {
            return {...state, isLoading: true}
        }
        case ActionTypes.Success: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                return {...state, auths:data.auths,isLoading: false}
            }
        }
        case ActionTypes.FetchAuthInfoSuccess: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                return {...state, auth:data.authInfo,isLoading: false}
            }
        }
        case ActionTypes.EditAuth: {
            return {...state, authId:action.authId, isLoading: false}
        }
        case ActionTypes.AddAuthSuccess: {
            message.success("添加权限成功");
            return {...state, isLoading: false}
        }
        case ActionTypes.UpdateAuthSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("修改成功");
            }
            return {...state, isLoading: false}
        }
        case ActionTypes.DelAuthSuccess: {
            message.success("删除成功");
            return {...state, isLoading: false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state, isLoading: false}
        }
        default:
            return state;
    }
}

Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (let i = 0, n = 0; i < this.length; i++) {
        if (this[i] !== this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};