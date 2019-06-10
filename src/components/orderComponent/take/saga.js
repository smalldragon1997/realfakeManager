import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未发货订单列表
function* fetchOrders(action) {
    try {
        const result = yield call(Api.fetchOrders,{
            state:3,
            manId:action.manId,
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取待收货订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchTakeOrders() {
    yield takeEvery(ActionTypes.Fetching, fetchOrders);
}

// 获取未付款订单列表
function* updateDeliver(action) {
    try {
        const result = yield call(Api.updateOrder,{
            state:3,
            orderId:action.info.orderId,
            expId:action.info.expId,
            number:action.info.number,
            expMessage:action.info.expMessage,
            manId:action.info.manId,
            jwt:action.jwt
        });
        yield put(Actions.UpdateDeliverSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("修改物流时发生错误："+e.toString()));
    }
}

export function* watchUpdateDeliver() {
    yield takeEvery(ActionTypes.UpdateDeliver, updateDeliver);
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

export function* watchDeleteTakeOrders() {
    yield takeEvery(ActionTypes.DeleteOrders, deleteOrders);
}
// 获取未付款订单列表
function* fetchOrder(action) {
    try {
        const result = yield call(Api.fetchOrderInfo,{
            orderId:action.orderId,
            jwt:action.jwt
        });
        yield put(Actions.FetchOrderInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单信息时发生错误："+e.toString()));
    }
}

export function* watchFetchTakeExpress() {
    yield takeEvery(ActionTypes.FetchOrderInfo, fetchOrder);
}
