import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取未付款订单列表
function* fetchPays(action) {
    try {
        const result = yield call(Api.fetchPays,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取未付款订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchPays() {
    yield takeEvery(ActionTypes.Fetching, fetchPays);
}

// 获取未付款订单列表
function* updatePrice(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     orderId:action.orderId,
        //     price:action.price,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.UpdatePriceSuccess(action.orderId,action.price));
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
        // const result = yield call(Api.fetchPays,{
        //     orderIdList:action.orderIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeletePaysSuccess(action.orderIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除未付款订单时发生错误："+e.toString()));
    }
}

export function* watchDeletePays() {
    yield takeEvery(ActionTypes.DeletePays, deletePays);
}
