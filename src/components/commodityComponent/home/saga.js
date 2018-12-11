import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 更新权限信息
function* update(action) {
    try {
        // const result = yield call(Api.updateManager,{
        //     man_id:action.man_id,
        //     auths:JSON.stringify(action.auths),
        //     nickname:action.nickname,
        //     jwt:action.jwt
        // });
        yield put(Actions.UpdateSuccess(action.homeInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新主页信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}
