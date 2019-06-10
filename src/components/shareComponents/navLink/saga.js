import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
// 无用方法
function* saveInfo(action) {
    try {
        yield put(Actions.Success(action.info));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("跳转时发生错误："+e.toString()));
    }
}

export function* watchSaveInfo() {
    yield takeEvery(ActionTypes.SaveInfo, saveInfo);
}

// 使用令牌登录
function* authJwt(action) {
    try {
        const result = yield call(Api.loginWithJwt,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("验证jwt时发生错误："+e.toString()));
    }
}

export function* watchAuthJwt() {
    yield takeEvery(ActionTypes.Fetching, authJwt);
}

// 退出登录
function* logOut(action) {

    try {
        const result = yield call(Api.logout,{
            jwt:action.jwt,
            manId:action.manId
        });

        yield put(Actions.ExitSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("退出登录时发生错误："+e.toString()));
    }
}

export function* watchLogOut() {
    yield takeEvery(ActionTypes.Exit, logOut);
}
