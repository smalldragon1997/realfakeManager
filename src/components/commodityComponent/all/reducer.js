import * as ActionTypes from './actionTypes';
import {message} from 'antd';
import commodity from "../../../containers/commodity/view/commodity";

const initState = {

    commList: [], // 商品列表

    commodityInfo:undefined,
    commId:undefined,
    isLoading: false,   // 是否加载中
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
                message.success("商品搜索成功");
                return {...state, commList:data.commodityList, isLoading: false}
            }
        }
        case ActionTypes.Edit: {
            return {...state, commId:action.commId, isLoading: false}
        }
        case ActionTypes.FetchCommoditySuccess: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                return {...state, commodityInfo:data.commodityInfo, isLoading: false}
            }
        }
        case ActionTypes.DeleteCommoditySuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("删除商品成功");
            }
            return {...state,isLoading: false}
        }
        case ActionTypes.UpdateCommoditySuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("更新商品成功");
            }
            return {...state,isLoading: false}
        }
        case ActionTypes.AddCommoditySuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
            }else{
                message.success("添加商品成功");
            }
            return {...state,isLoading: false}
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