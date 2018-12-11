import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    filter:"orderId",
    key:undefined,
    orderInfo:undefined,
    orderList:[],
    expressList:[],
    url:undefined,
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
        case ActionTypes.FetchExpressSuccess: {
            return {...state, expressList:action.expressList, isLoading: false}
        }
        case ActionTypes.FetchExcelSuccess: {
            message.success("生成Excel表格成功，可以点击下载");
            return {...state, url:action.url, isLoading: false}
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
        case ActionTypes.DeliverSuccess: {
            let newOrderList = state.orderList;
            for(let i=0;i<newOrderList.length;i++){
                if(newOrderList[i].orderId===action.orderId){
                    newOrderList.remove(i);
                    break;
                }
            }
            message.success("发货成功");
            return {...state, orderList:newOrderList,isLoading: false}
        }

        case ActionTypes.DeleteDeliversSuccess: {
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