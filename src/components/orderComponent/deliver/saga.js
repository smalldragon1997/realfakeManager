import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未发货订单列表
function* fetchDelivers(action) {
    try {
        const result = yield call(Api.fetchOrders,{
            jwt:action.jwt,
            manId:action.manId,
            state:2
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取待发货订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchDelivers() {
    yield takeEvery(ActionTypes.Fetching, fetchDelivers);
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

export function* watchFetchDeliverInfo() {
    yield takeEvery(ActionTypes.FetchOrderInfo, fetchPayInfo);
}

// 获取未付款订单列表
function* deliver(action) {
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
        yield put(Actions.DeliverSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("发货时发生错误："+e.toString()));
    }
}

export function* watchDeliver() {
    yield takeEvery(ActionTypes.Deliver, deliver);
}


// 获取未付款订单列表
function* deleteDelivers(action) {
    try {
        const result = yield call(Api.deleteOrder,{
            orderId:action.orderId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteDeliversSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除待付款订单时发生错误："+e.toString()));
    }
}

export function* watchDeleteDelivers() {
    yield takeEvery(ActionTypes.DeleteDelivers, deleteDelivers);
}
// 获取未付款订单列表
function* fetchExpress(action) {
    try {
        const result = yield call(Api.fetchExpress,{
            jwt:action.jwt
        });
        yield put(Actions.FetchExpressSuccess(result.data.data.expressList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取物流列表时发生错误："+e.toString()));
    }
}

export function* watchFetchExpress() {
    yield takeEvery(ActionTypes.FetchExpress, fetchExpress);
}


// 获取表格下载地址
function* fetchExcel(action) {
    try {
        const result = yield call(Api.fetchExcel,{
            jwt:action.jwt
        });
        yield put(Actions.FetchExcelSuccess(result.data.data.url));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取未发货表格时发生错误："+e.toString()));
    }
}

export function* watchFetchExcel() {
    yield takeEvery(ActionTypes.FetchExcel, fetchExcel);
}
