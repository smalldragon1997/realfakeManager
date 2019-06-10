import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateHomeInfo,{
            ids:action.homeInfo.ids,
            pictures:action.homeInfo.pictures,
            types:action.homeInfo.types,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新主页信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}


// 获取信息
function* fetchHomeInfo(action) {
    try {
        const result = yield call(Api.fetchHomeInfo);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取主页信息时发生错误："+e.toString()));
    }
}

export function* watchFetch() {
    yield takeEvery(ActionTypes.Fetching, fetchHomeInfo);
}