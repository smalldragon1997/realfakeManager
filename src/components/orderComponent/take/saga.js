import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未发货订单列表
function* fetchOrders(action) {
    try {
        const result = yield call(Api.fetchDelivers,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data.data));
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
        // const result = yield call(Api.fetchPays,{
        //     orderId:action.orderId,
        //     price:action.price,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.UpdateDeliverSuccess(action.orderId,action.expId,action.number,action.expMessage));
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
        // const result = yield call(Api.fetchPays,{
        //     orderIdList:action.orderIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeleteOrdersSuccess(action.orderIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除待收货订单时发生错误："+e.toString()));
    }
}

export function* watchDeleteTakeOrders() {
    yield takeEvery(ActionTypes.DeleteOrders, deleteOrders);
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

export function* watchFetchTakeExpress() {
    yield takeEvery(ActionTypes.FetchTakeExpress, fetchExpress);
}
