import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    logList: [],
    key: undefined,
    start: 0,
    end: 9999999999999,
    isLoading: false,
    pageNum:0,
    pageSize:0,
    total:0,
    totalPage:0
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
                message.success("搜索日志成功");
                return {...state, logList:data.logList,...data.pageInfo,isLoading: false}
            }
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