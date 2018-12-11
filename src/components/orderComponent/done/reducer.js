import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    start:0,
    end:9999999999999,
    filter:"orderId",
    key:undefined,
    orderInfo:undefined,
    orderList:[],
    isLoading: false,   // 是否加载中
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
        case ActionTypes.Edit: {
            return {...state, orderInfo:action.orderInfo, isLoading: false}
        }
        case ActionTypes.Filter: {
            return {...state, filter:action.filter,key:action.key, isLoading: false}
        }
        case ActionTypes.ReFilter: {
            return {...state,key:undefined, isLoading: false}
        }
        case ActionTypes.DateFilter: {
            return {...state, start:action.start,end:action.end, isLoading: false}
        }
        case ActionTypes.ReDateFilter: {
            return {...state,start:0,end:9999999999999, isLoading: false}
        }
        case ActionTypes.DeleteOrdersSuccess: {
            let newOrderList = state.orderList;

            for(let i=0;i<newOrderList.length;i++){
                for(let j=0;j<action.orderIdList.length;j++) {
                    if (newOrderList[i].orderId === action.orderIdList[j]) {
                        newOrderList.remove(i);
                    }
                }
            }
            message.success("删除订单成功");
            return {...state, orderList:newOrderList,isLoading: false}
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