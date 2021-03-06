import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未发货订单列表
function* fetchAfterSales(action) {
    try {
        const result = yield call(Api.fetchAfterSales,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取售后列表时发生错误："+e.toString()));
    }
}

export function* watchFetchAfterSales() {
    yield takeEvery(ActionTypes.Fetching, fetchAfterSales);
}


function* fetchAfterSaleInfo(action) {
    try {
        const result = yield call(Api.fetchAfterSaleInfo,{
            jwt:action.jwt,
            aftId:action.aftId
        });
        yield put(Actions.FetchAfterSaleInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取售后信息时发生错误："+e.toString()));
    }
}

export function* watchFetchAfterSaleInfo() {
    yield takeEvery(ActionTypes.FetchAfterSaleInfo, fetchAfterSaleInfo);
}


// 获取未付款订单列表
function* deleteAfterSales(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeleteAfterSalesSuccess(action.aftIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除待收货订单时发生错误："+e.toString()));
    }
}

export function* watchDeleteDoneAfterSales() {
    yield takeEvery(ActionTypes.DeleteAfterSales, deleteAfterSales);
}

// 获取未付款订单列表
function* agreeAfterSales(action) {
    try {
        const result = yield call(Api.updateAfterSaleInfo,{
            orderId:action.orderId,
            aftId:action.aftId,
            message:action.message,
            state:3,
            afterPics:[],
            resultPics:[],
            jwt:action.jwt
        });
        yield put(Actions.AgreeAfterSalesSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("同意售后时发生错误："+e.toString()));
    }
}

export function* watchAgreeAfterSales() {
    yield takeEvery(ActionTypes.AgreeAfterSales, agreeAfterSales);
}

// 获取未付款订单列表
function* disAgreeAfterSales(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DisAgreeAfterSalesSuccess(action.aftIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("拒绝售后时发生错误："+e.toString()));
    }
}

export function* watchDisAgreeAfterSales() {
    yield takeEvery(ActionTypes.DisAgreeAfterSales, disAgreeAfterSales);
}
// 获取未付款订单列表
function* closeAfterSales(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.CloseAfterSalesSuccess(action.aftIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("关闭售后时发生错误："+e.toString()));
    }
}

export function* watchCloseAfterSales() {
    yield takeEvery(ActionTypes.CloseAfterSales, closeAfterSales);
}

function* leaveMsgAfterSales(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.LeaveMsgAfterSalesSuccess(action.aftIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("留言售后时发生错误："+e.toString()));
    }
}

export function* watchLeaveMsgAfterSales() {
    yield takeEvery(ActionTypes.LeaveMsgAfterSales, leaveMsgAfterSales);
}