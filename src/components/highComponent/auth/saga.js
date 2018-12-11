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

// 更新权限信息
function* updateAuth(action) {
    try {
        // const result = yield call(Api.updateManager,{
        //     man_id:action.man_id,
        //     auths:JSON.stringify(action.auths),
        //     nickname:action.nickname,
        //     jwt:action.jwt
        // });
        yield put(Actions.UpdateAuthSuccess(action.authId,action.authName,action.describe));
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