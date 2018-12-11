import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    logList: [],
    filter: "manId",
    key: undefined,
    isSuccess: undefined,
    start: 0,
    end: 9999999999999,
    operationList: [],
    isLoading: false,
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {

        case ActionTypes.Start: {
            return {...state, isLoading: true}
        }
        case ActionTypes.Success: {
            return {...state, ...action.result, isLoading: false}
        }
        case ActionTypes.FetchOperationSuccess: {
            return {...state, ...action.result, isLoading: false}
        }
        case ActionTypes.Filter: {
            return {...state, filter: action.filter, key: action.key,
                isSuccess:action.isSuccess,start:action.start,end:action.end,isLoading: false,
                operation:action.operation
            }
        }
        case ActionTypes.ReFilter: {
            return {
                ...state, key: undefined, isSuccess: undefined,
                operation:undefined,
                start: 0,
                end: 9999999999999, isLoading: false
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