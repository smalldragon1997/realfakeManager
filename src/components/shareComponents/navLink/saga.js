import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

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

function* authJwt(action) {
    try {
        const result = yield call(Api.login);
        yield put(Actions.Success(result.data.data.info));
        localStorage.setItem("RealFakeManagerJwt",result.data.data.info.jwt);
        console.log("接收到新令牌"+localStorage.getItem("RealFakeManagerJwt"));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("验证jwt时发生错误："+e.toString()));
    }
}

export function* watchAuthJwt() {
    yield takeEvery(ActionTypes.Fetching, authJwt);
}
