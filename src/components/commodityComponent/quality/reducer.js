import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    isLoading: false,   // 是否加载中
    qualityId: undefined // auth
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {

        case ActionTypes.Start: {
            return {...state, isLoading: true}
        }
        case ActionTypes.Success: {
            return {...state,  isLoading: false}
        }
        case ActionTypes.Edit: {
            return {...state, qualityId:action.qualityId, isLoading: false}
        }
        case ActionTypes.AddSuccess: {
            message.success("添加品质成功");
            return {...state, isLoading: false}
        }
        case ActionTypes.UpdateSuccess: {
            message.success("更新品质信息成功");
            return {...state,isLoading: false}
        }
        case ActionTypes.DeleteSuccess: {
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