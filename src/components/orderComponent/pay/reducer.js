import * as ActionTypes from './actionTypes';
import {message} from 'antd';
import pay from "./view/pay";

const initState = {
    filter:"orderId",
    key:undefined,
    payInfo:undefined,
    payList:[],
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
        case ActionTypes.Filter: {
            return {...state, filter:action.filter,key:action.key, isLoading: false}
        }
        case ActionTypes.ReFilter: {
            return {...state,key:undefined, isLoading: false}
        }
        case ActionTypes.EditPay: {
            return {...state, payInfo:action.payInfo, isLoading: false}
        }
        case ActionTypes.UpdatePriceSuccess: {
            let newPayList = state.payList;
            for(let i=0;i<newPayList.length;i++){
                if(newPayList[i].orderId===action.orderId){
                    newPayList[i].total = action.price;
                    break;
                }
            }
            let newPayInfo = state.payInfo;
            if(newPayInfo !== undefined){
                newPayInfo.total = action.price;
            }
            message.success("改价成功");
            return {...state, payList:newPayList, payInfo:newPayInfo,isLoading: false}
        }

        case ActionTypes.DeletePaysSuccess: {
            let newPayList = state.payList;

            for(let i=0;i<newPayList.length;i++){
                for(let j=0;j<action.orderIdList.length;j++) {
                    if (newPayList[i].orderId === action.orderIdList[j]) {
                        newPayList.remove(i);
                    }
                }
            }
            message.success("删除订单成功");
            return {...state, payList:newPayList, isLoading: false}
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