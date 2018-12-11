import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未发货订单列表
function* fetchDelivers(action) {
    try {
        const result = yield call(Api.fetchDelivers,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取待发货订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchDelivers() {
    yield takeEvery(ActionTypes.Fetching, fetchDelivers);
}

// 获取未付款订单列表
function* deliver(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     orderId:action.orderId,
        //     price:action.price,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeliverSuccess(action.orderId));
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
        // const result = yield call(Api.fetchPays,{
        //     orderIdList:action.orderIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeleteDeliversSuccess(action.orderIdList));
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
