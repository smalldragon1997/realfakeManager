import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取品牌列表
function* fetchQualityList(action) {
    try {
        const result = yield call(Api.fetchQualityList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取品质列表时发生错误："+e.toString()));
    }
}

export function* watchFetchQualityList() {
    yield takeEvery(ActionTypes.Fetching, fetchQualityList);
}
// 获取品牌列表
function* fetchQualityInfo(action) {
    try {
        const result = yield call(Api.fetchQualityInfo,{
            qualityId:action.qualityId
        });
        yield put(Actions.FetchQualityInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取品质信息时发生错误："+e.toString()));
    }
}

export function* watchFetchQualityInfo() {
    yield takeEvery(ActionTypes.FetchQualityInfo, fetchQualityInfo);
}
// 删除权限
function* deleteQuality(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteQuality,{
            qualityId:action.qualityId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除品质时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteQuality);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateQualityInfo,{
            manId:action.qualityInfo.manId,
            qualityId:action.qualityInfo.qualityId,
            qualName:action.qualityInfo.qualName,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新品质信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {
    try {
        const result = yield call(Api.addQuality,{
            manId:action.qualityInfo.manId,
            qualName:action.qualityInfo.qualName,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加品质时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}