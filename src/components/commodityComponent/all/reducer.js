import * as ActionTypes from './actionTypes';
import {message} from 'antd';
import commodity from "../../../containers/commodity/view/commodity";

// 默认
const initFilter = {
    brandId:undefined,
    seriesId:undefined,
    typeId:undefined,
    uniteId:undefined,
    price:undefined,
    sort:"like",
    desc:true,
};
const initState = {
    ...initFilter,
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
            message.succuss("商品获取成功");
            return {...state, commList:action.result, isLoading: false}
        }
        case ActionTypes.Edit: {
            return {...state, commId:action.commId, isLoading: false}
        }
        case ActionTypes.Filter: {
            return {
                ...state,
                brandId:action.brandId,
                seriesId:action.seriesId,
                typeId:action.typeId,
                uniteId:action.uniteId,
                price:action.price,
                sort:action.sort,
                desc:action.desc,
                isLoading: false
            }
        }
        case ActionTypes.ReFilter: {
            return {...state,...initFilter, isLoading: false}
        }
        case ActionTypes.DeleteCommoditySuccess: {
            message.success("删除商品成功");
            return {...state,isLoading: false}
        }
        case ActionTypes.UpdateCommoditySuccess: {
            message.success("更新商品成功");
            return {...state,isLoading: false}
        }
        case ActionTypes.AddCommoditySuccess: {
            message.success("添加商品成功");
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