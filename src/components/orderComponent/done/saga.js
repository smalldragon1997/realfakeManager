import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未发货订单列表
function* fetchOrders(action) {
    try {
        let result = yield call(Api.fetchOrders,{
            jwt:action.jwt,
            manId:action.manId,
            state:5
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取待收货订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchDoneOrders() {
    yield takeEvery(ActionTypes.Fetching, fetchOrders);
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

export function* watchFetchDoneInfo() {
    yield takeEvery(ActionTypes.FetchOrderInfo, fetchPayInfo);
}

// 获取未付款订单列表
function* deleteOrders(action) {
    try {
        const result = yield call(Api.deleteOrder,{
            orderId:action.orderId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteOrdersSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除待收货订单时发生错误："+e.toString()));
    }
}

export function* watchDeleteDoneOrders() {
    yield takeEvery(ActionTypes.DeleteOrders, deleteOrders);
}