import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取品牌列表
function* fetchSizeList(action) {
    try {
        const result = yield call(Api.fetchSizeList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取尺码列表时发生错误："+e.toString()));
    }
}

export function* watchFetchSizeList() {
    yield takeEvery(ActionTypes.Fetching, fetchSizeList);
}

// 获取品牌列表
function* fetchSizeInfo(action) {
    try {
        const result = yield call(Api.fetchSizeInfo,{
            sizeId:action.sizeId
        });
        yield put(Actions.FetchSizeInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取尺码列表时发生错误："+e.toString()));
    }
}

export function* watchFetchSizeInfo() {
    yield takeEvery(ActionTypes.FetchSizeInfo, fetchSizeInfo);
}
// 删除权限
function* deleteSize(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteSize,{
            sizeId:action.sizeId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除尺码时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteSize);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateSizeInfo,{
            manId:action.sizeInfo.manId,
            sizeId:action.sizeInfo.sizeId,
            sizeName:action.sizeInfo.value,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新尺码信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {
    try {
        const result = yield call(Api.addSize,{
            manId:action.sizeInfo.manId,
            sizeName:action.sizeInfo.value,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加尺码时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}