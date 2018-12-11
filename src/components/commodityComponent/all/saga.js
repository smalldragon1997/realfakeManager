import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as ElasticApi from '../../../elasticApi';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';



// 删除商品
function* deleteCommodity(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeleteCommoditySuccess(action.commId));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除商品时发生错误："+e.toString()));
    }
}

export function* watchDeleteCommodity() {
    yield takeEvery(ActionTypes.DeleteCommodity, deleteCommodity);
}

// 更新商品
function* UpdateCommodity(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.UpdateCommoditySuccess(action.commInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新商品时发生错误："+e.toString()));
    }
}

export function* watchUpdateCommodity() {
    yield takeEvery(ActionTypes.UpdateCommodity, UpdateCommodity);
}

// 添加商品
function* AddCommodity(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     AfterSaleIdList:action.AfterSaleIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.AddCommoditySuccess(action.commInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加商品时发生错误："+e.toString()));
    }
}

export function* watchAddCommodity() {
    yield takeEvery(ActionTypes.AddCommodity, AddCommodity);
}