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

export function* watchFetchDoneOrders() {
    yield takeEvery(ActionTypes.Fetching, fetchOrders);
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

export function* watchDeleteDoneOrders() {
    yield takeEvery(ActionTypes.DeleteOrders, deleteOrders);
}