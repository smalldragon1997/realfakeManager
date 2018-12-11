import * as ActionTypes from './actionTypes';
import { message } from 'antd';

const initState = {
    orderList:[],
    visitList:[],
    afterSaleList:[],
    commList:[],
    keyList:[],
    isLoading:false   // 是否加载中
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Start: {
            return {...state,isLoading:true}
        }
        case ActionTypes.FetchOrdersSuccess: {
            return {...state,orderList:action.orderList,isLoading:false}
        }
        case ActionTypes.FetchVisitSuccess: {
            return {...state,visitList:action.visitList,isLoading:false}
        }
        case ActionTypes.FetchAfterSaleSuccess: {
            return {...state,afterSaleList:action.afterSaleList,isLoading:false}
        }
        case ActionTypes.FetchCommoditiesSuccess: {
            return {...state,commList:action.commList,isLoading:false}
        }
        case ActionTypes.FetchKeyWordsSuccess: {
            return {...state,keyList:action.keyList,isLoading:false}
        }
        case ActionTypes.Success: {
            return {...state,isLoading:false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state,isLoading:false}
        }
        default:
            return state;
    }
}