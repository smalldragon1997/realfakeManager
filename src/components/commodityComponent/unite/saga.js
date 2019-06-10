import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取品牌列表
function* fetchUniteList(action) {
    try {
        const result = yield call(Api.fetchUniteList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取联名列表时发生错误："+e.toString()));
    }
}

export function* watchFetchUniteList() {
    yield takeEvery(ActionTypes.Fetching, fetchUniteList);
}
// 获取品牌列表
function* fetchUniteInfo(action) {
    try {
        const result = yield call(Api.fetchUniteInfo,{
            uniteId:action.uniteId
        });
        yield put(Actions.FetchUniteInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取联名信息时发生错误："+e.toString()));
    }
}

export function* watchFetchUniteInfo() {
    yield takeEvery(ActionTypes.FetchUniteInfo, fetchUniteInfo);
}
// 删除权限
function* deleteUnites(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteUnite,{
            uniteId:action.uniteId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除联名时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteUnites);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateUnite,{
            manId:action.uniteInfo.manId,
            uniteId:action.uniteInfo.uniteId,
            uniteName:action.uniteInfo.uniteName,
            describe:action.uniteInfo.describe,
            cover:action.uniteInfo.cover,
            pictures:action.uniteInfo.pictures,
            types:action.uniteInfo.types,
            ids:action.uniteInfo.ids,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新联名信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {
    try {
        const result = yield call(Api.addUnite,{
            manId:action.uniteInfo.manId,
            uniteName:action.uniteInfo.uniteName,
            describe:action.uniteInfo.describe,
            cover:action.uniteInfo.cover,
            pictures:action.uniteInfo.pictures,
            types:action.uniteInfo.types,
            ids:action.uniteInfo.ids,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加联名时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}