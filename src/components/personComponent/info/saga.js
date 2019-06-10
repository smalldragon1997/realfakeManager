import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
import md5 from 'md5';

// 更新g个人信息
function* Update(action) {
    try {
        const result = yield call(Api.updateMangerInfo,{
            manId:action.managerInfo.manId,
            nickname:action.managerInfo.nickname,
            icon:action.managerInfo.icon,
            isSuper:action.managerInfo.isSuper,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新个人信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, Update);
}

// 更新密码
function* UpdatePwd(action) {
    try {
        const result = yield call(Api.updatePwd,{
            manId:action.pwdInfo.manId,
            pwdWithMD5:md5(action.pwdInfo.oldPwd),
            newPwd:md5(action.pwdInfo.newPwd),
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新密码时发生错误："+e.toString()));
    }
}

export function* watchUpdatePwd() {
    yield takeEvery(ActionTypes.UpdatePwd, UpdatePwd);
}
