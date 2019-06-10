import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未付款订单列表
function* fetchPays(action) {
    try {
        const result = yield call(Api.fetchOrders,{
            jwt:action.jwt,
            manId:action.manId,
            state:1
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取未付款订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchPays() {
    yield takeEvery(ActionTypes.Fetching, fetchPays);
}

function* fetchPayInfo(action) {
    try {
        const result = yield call(Api.fetchOrderInfo,{
            jwt:action.jwt,
            orderId:action.orderId,
        });
        yield put(Actions.FetchOrderInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息时发生错误："+e.toString()));
    }
}

export function* watchFetchPayInfo() {
    yield takeEvery(ActionTypes.FetchOrderInfo, fetchPayInfo);
}

// 获取未付款订单列表
function* updatePrice(action) {
    try {
        const result = yield call(Api.updatePrice,{
            state:1,
            orderId:action.orderId,
            total:action.price,
            jwt:action.jwt
        });
        yield put(Actions.UpdatePriceSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("改价时发生错误："+e.toString()));
    }
}

export function* watchUpdatePrice() {
    yield takeEvery(ActionTypes.UpdatePrice, updatePrice);
}


// 获取未付款订单列表
function* deletePays(action) {
    try {
        const result = yield call(Api.deleteOrder,{
            orderId:action.orderId,
            jwt:action.jwt
        });
        yield put(Actions.DeletePaysSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除未付款订单时发生错误："+e.toString()));
    }
}

export function* watchDeletePays() {
    yield takeEvery(ActionTypes.DeletePays, deletePays);
}
