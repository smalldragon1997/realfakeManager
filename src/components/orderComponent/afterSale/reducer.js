import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    start:0,
    end:9999999999999,
    filter:"orderId",
    key:undefined,
    afterSaleInfo:undefined,
    afterSaleList:[],
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
            return {...state, afterSaleInfo:action.afterSaleInfo, isLoading: false}
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
        case ActionTypes.DeleteAfterSalesSuccess: {
            let newAfterSaleList = state.afterSaleList;

            for(let i=0;i<newAfterSaleList.length;i++){
                for(let j=0;j<action.aftIdList.length;j++) {
                    if (newAfterSaleList[i].aftId === action.aftIdList[j]) {
                        newAfterSaleList.remove(i);
                    }
                }
            }
            message.success("删除售后成功");
            return {...state, afterSaleList:newAfterSaleList,isLoading: false}
        }
        case ActionTypes.AgreeAfterSalesSuccess: {
            let newAfterSaleList = state.afterSaleList;

            for(let i=0;i<newAfterSaleList.length;i++){
                for(let j=0;j<action.aftIdList.length;j++) {
                    if (newAfterSaleList[i].aftId === action.aftIdList[j]) {
                        newAfterSaleList[i].state=1;
                    }
                }
            }
            message.success("同意售后成功");
            return {...state, afterSaleList:newAfterSaleList,isLoading: false}
        }
        case ActionTypes.CloseAfterSalesSuccess: {
            let newAfterSaleList = state.afterSaleList;

            for(let i=0;i<newAfterSaleList.length;i++){
                for(let j=0;j<action.aftIdList.length;j++) {
                    if (newAfterSaleList[i].aftId === action.aftIdList[j]) {
                        newAfterSaleList[i].state=action.state;
                    }
                }
            }
            message.success("售后已关闭");
            return {...state, afterSaleList:newAfterSaleList,isLoading: false}
        }
        case ActionTypes.DisAgreeAfterSalesSuccess: {
            let newAfterSaleList = state.afterSaleList;

            for(let i=0;i<newAfterSaleList.length;i++){
                for(let j=0;j<action.aftIdList.length;j++) {
                    if (newAfterSaleList[i].aftId === action.aftIdList[j]) {
                        newAfterSaleList[i].state=3;
                    }
                }
            }
            message.success("拒绝售后成功");
            return {...state, afterSaleList:newAfterSaleList,isLoading: false}
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