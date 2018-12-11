import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as NavActions from '../../shareComponents/navLink/actions';
import * as ActionTypes from './actionTypes';

function* login(action) {
    try {
        const result = yield call(Api.login,{
            username:action.username,
            password:action.password,
            rememberMe:action.rememberMe
        });
        yield put(Actions.Success(result.data.data));
        yield put(NavActions.Success(result.data.data.info));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("登录时发生错误："+e.toString()));
    }
}

export function* watchLogin() {
    yield takeEvery(ActionTypes.Fetching, login);
}
