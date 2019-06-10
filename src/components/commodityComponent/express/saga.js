import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取品牌列表
function* fetchExpressList(action) {
    try {
        const result = yield call(Api.fetchExpressList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取快递列表时发生错误："+e.toString()));
    }
}

export function* watchFetchExpressList() {
    yield takeEvery(ActionTypes.Fetching, fetchExpressList);
}
// 获取品牌列表
function* fetchExpressInfo(action) {
    try {
        const result = yield call(Api.fetchExpressInfo,{
            expId:action.expId
        });
        yield put(Actions.FetchExpressInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取快递列表时发生错误："+e.toString()));
    }
}

export function* watchFetchExpressInfo() {
    yield takeEvery(ActionTypes.FetchExpressInfo, fetchExpressInfo);
}
// 删除权限
function* deleteExp(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteExpress,{
            expId:action.expId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除快递时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteExp);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateExpressInfo,{
            manId:action.expInfo.manId,
            expId:action.expInfo.expId,
            expressName:action.expInfo.expName,
            price:action.expInfo.price,
            cover:action.expInfo.cover,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新快递信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {

    try {
        const result = yield call(Api.addExpress,{
            manId:action.expInfo.manId,
            expressName:action.expInfo.expName,
            price:action.expInfo.price,
            cover:action.expInfo.cover,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加快递时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}