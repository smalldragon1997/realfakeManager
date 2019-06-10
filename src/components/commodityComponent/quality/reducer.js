import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    isLoading: false,   // 是否加载中
    qualityId: undefined, // auth
    qualityList:[],
    qualityInfo:undefined,
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
                return {...state, qualityList:data.qualityList, isLoading: false}
            }
        }
        case ActionTypes.FetchQualityInfoSuccess: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                return {...state, qualityInfo:data.qualityInfo, isLoading: false}
            }
        }
        case ActionTypes.Edit: {
            return {...state, qualityId:action.qualityId, isLoading: false}
        }
        case ActionTypes.AddSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("添加品质成功");
            }
            return {...state, isLoading: false}
        }
        case ActionTypes.UpdateSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("更新品质信息成功");
            }
            return {...state, isLoading: false}
        }
        case ActionTypes.DeleteSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("删除品质成功");
            }
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