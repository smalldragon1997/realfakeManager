import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 获取品牌列表
function* fetchTypeList(action) {
    try {
        const result = yield call(Api.fetchTypeList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取类型列表时发生错误："+e.toString()));
    }
}

export function* watchFetchTypeList() {
    yield takeEvery(ActionTypes.Fetching, fetchTypeList);
}

// 获取品牌列表
function* fetchTypeInfo(action) {
    try {
        const result = yield call(Api.fetchTypeInfo,{
            typeId:action.typeId
        });
        yield put(Actions.FetchTypeInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取类型信息时发生错误："+e.toString()));
    }
}

export function* watchFetchTypeInfo() {
    yield takeEvery(ActionTypes.FetchTypeInfo, fetchTypeInfo);
}
// 删除权限
function* deleteType(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteType,{
            typeId:action.typeId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除系列时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteType);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateTypeInfo,{
            manId:action.typeInfo.manId,
            typeId:action.typeInfo.typeId,
            typeName:action.typeInfo.typeName,
            describe:action.typeInfo.describe,
            cover:action.typeInfo.cover,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新系列信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {
    try {
        const result = yield call(Api.addType,{
            manId:action.typeInfo.manId,
            typeName:action.typeInfo.typeName,
            describe:action.typeInfo.describe,
            cover:action.typeInfo.cover,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加系列时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}