import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as NavActions from '../../shareComponents/navLink/actions';
import * as ActionTypes from './actionTypes';
// 获取订单
function* fetchOrders(action) {
    try {
        const result = yield call(Api.fetchOrdersList,{
            jwt:action.jwt
        });
        yield put(Actions.FetchOrdersSuccess(result.data.data.orderList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取订单列表时发生错误："+e.toString()));
    }
}

export function* watchFetchOrders() {
    yield takeEvery(ActionTypes.FetchOrders, fetchOrders);
}
//获取访问
function* fetchVisit(action) {
    try {
        const result = yield call(Api.fetchVisit,{
            jwt:action.jwt
        });
        yield put(Actions.FetchVisitSuccess(result.data.data.visitList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取访问列表时发生错误："+e.toString()));
    }
}
export function* watchFetchVisit() {
    yield takeEvery(ActionTypes.FetchVisit, fetchVisit);
}

//获取售后
function* fetchAfterSale(action) {
    try {
        const result = yield call(Api.fetchAfterSale,{
            jwt:action.jwt
        });
        yield put(Actions.FetchAfterSaleSuccess(result.data.data.afterSaleList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取售后列表时发生错误："+e.toString()));
    }
}

export function* watchFetchAfterSale() {
    yield takeEvery(ActionTypes.FetchAfterSale, fetchAfterSale);
}
//获取商品
function* fetchCommodities(action) {
    try {
        const result = yield call(Api.fetchCommodities,{
            jwt:action.jwt
        });
        yield put(Actions.FetchCommoditiesSuccess(result.data.data.commList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取商品列表时发生错误："+e.toString()));
    }
}

export function* watchFetchCommodities() {
    yield takeEvery(ActionTypes.FetchCommodities, fetchCommodities);
}
//获取搜索
function* fetchKeyWords(action) {
    try {
        const result = yield call(Api.fetchKeyWords,{
            jwt:action.jwt
        });
        yield put(Actions.FetchKeyWordsSuccess(result.data.data.keyList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取搜索列表时发生错误："+e.toString()));
    }
}

export function* watchFetchKeyWords() {
    yield takeEvery(ActionTypes.FetchKeyWords, fetchKeyWords);
}
