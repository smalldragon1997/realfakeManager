import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
import md5 from 'md5';

// 获取管理员列表
function* fetchManagers(action) {
    try {
        const result = yield call(Api.fetchManagers,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取管理员列表时发生错误："+e.toString()));
    }
}

export function* watchFetchManagers() {
    yield takeEvery(ActionTypes.Fetching, fetchManagers);
}

// 获取管理员信息
function* fetchManager(action) {
    try {
        const result = yield call(Api.fetchManager,{
            jwt:action.jwt,
            manId:action.manId
        });
        yield put(Actions.FetchManagerInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取管理员信息时发生错误："+e.toString()));
    }
}

export function* watchFetchManager() {
    yield takeEvery(ActionTypes.FetchManagerInfo, fetchManager);
}
// 删除管理员
function* delManager(action) {
    try {
        // 删除管理员Api
        // const result = yield call(Api.delManager,{
        //     manIdList:action.manId,
        //     jwt:action.jwt
        // });
        yield put(Actions.DelManagerSuccess(action.manIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除管理员时发生错误："+e.toString()));
    }
}

export function* watchDelManager() {
    yield takeEvery(ActionTypes.DelManager, delManager);
}

// 禁用管理员
function* forbiddenManager(action) {
    try {
        // 禁用管理员Api
        const result = yield call(Api.forbidManager,{
            manIdList:action.manIdList,
            jwt:action.jwt
        });
        yield put(Actions.ForbidManagerSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("禁用管理员时发生错误："+e.toString()));
    }
}

export function* watchForbidManager() {
    yield takeEvery(ActionTypes.ForbidManager, forbiddenManager);
}

// 取消禁用管理员
function* cancelForbidManager(action) {
    try {
        // 取消禁用管理员Api
        const result = yield call(Api.enableManager,{
            manIdList:action.manIdList,
            jwt:action.jwt
        });
        yield put(Actions.CanCelForbidManagerSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("取消禁用管理员时发生错误："+e.toString()));
    }
}

export function* watchCancelForbidManager() {
    yield takeEvery(ActionTypes.CanCelForbidManager, cancelForbidManager);
}

// 获取权限列表
function* fetchAuthList(action) {
    try {
        const result = yield call(Api.fetchAuthList,{
            jwt:action.jwt
        });
        yield put(Actions.FetchAuthListSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取权限列表时发生错误："+e.toString()));
    }
}

export function* watchFetchAuthList() {
    yield takeEvery(ActionTypes.FetchAuthList, fetchAuthList);
}

// 更新管理员信息
function* updateManager(action) {
    try {
        const result = yield call(Api.updateMangerInfo,{
            manId:action.managerInfo.manId,
            auths:action.managerInfo.auths,
            isSuper:action.managerInfo.isSuper,
            icon:action.managerInfo.icon,
            nickname:action.managerInfo.nickname,
            isForbidden:action.managerInfo.isForbidden,
            jwt:action.jwt
        });
        yield put(Actions.UpdateManagerSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新管理员信息时发生错误："+e.toString()));
    }
}

export function* watchUpdateManager() {
    yield takeEvery(ActionTypes.UpdateManager, updateManager);
}

// 添加管理员信息
function* addManager(action) {
    try {
        const result = yield call(Api.addManager,{
            username:action.managerInfo.username,
            pwdWithMD5:md5(action.managerInfo.password),
            isForbidden:action.managerInfo.isForbidden,
            icon:action.managerInfo.icon,
            auths:action.managerInfo.auths,
            nickname:action.managerInfo.nickname,
            jwt:action.jwt
        });
        yield put(Actions.AddManagerSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加管理员时发生错误："+e.toString()));
    }
}

export function* watchAddManager() {
    yield takeEvery(ActionTypes.AddManager, addManager);
}