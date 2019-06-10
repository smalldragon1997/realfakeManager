import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 删除权限
function* delAuth(action) {
    try {
        // 删除管理员Api
        // const result = yield call(Api.delManager,{
        //     man_idList:action.man_id,
        //     jwt:action.jwt
        // });
        yield put(Actions.DelAuthSuccess(action.authIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除权限时发生错误："+e.toString()));
    }
}

export function* watchDelAuth() {
    yield takeEvery(ActionTypes.DelAuth, delAuth);
}

function* fetchAuth(action) {
    try {
        const result = yield call(Api.fetchAuthList,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取权限列表时发生错误："+e.toString()));
    }
}

export function* watchFetchAuth() {
    yield takeEvery(ActionTypes.Fetching, fetchAuth);
}

function* fetchAuthInfo(action) {
    try {
        const result = yield call(Api.fetchAuthInfo,{
            jwt:action.jwt,
            authId:action.authId
        });
        yield put(Actions.FetchAuthInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取权限信息时发生错误："+e.toString()));
    }
}

export function* watchFetchAuthInfo() {
    yield takeEvery(ActionTypes.FetchAuthInfo, fetchAuthInfo);
}

// 更新权限信息
function* updateAuth(action) {
    try {
        const result = yield call(Api.updateAuth,{
            authId:action.authInfo.authId,
            authName:action.authInfo.authName,
            describe:action.authInfo.describe,
            jwt:action.jwt
        });
        yield put(Actions.UpdateAuthSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新权限信息时发生错误："+e.toString()));
    }
}

export function* watchUpdateAuth() {
    yield takeEvery(ActionTypes.UpdateAuth, updateAuth);
}

// 添加管理员信息
function* addAuth(action) {
    try {
        // const result = yield call(Api.addManager,{
        //     username:action.username,
        //     password:action.password,
        //     isForbidden:action.isForbidden,
        //     auths:JSON.stringify(action.auths),
        //     nickname:action.auths,
        //     jwt:action.jwt
        // });
        yield put(Actions.AddAuthSuccess());
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加权限时发生错误："+e.toString()));
    }
}

export function* watchAddAuth() {
    yield takeEvery(ActionTypes.AddAuth, addAuth);
}