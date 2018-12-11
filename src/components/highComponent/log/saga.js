import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取日志列表
function* fetchLogList(action) {
    try {
        const result = yield call(Api.fetchLogList,{
            jwt:action.jwt
        });
        yield put(Actions.Success(result.data.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取日志列表时发生错误："+e.toString()));
    }
}

export function* watchFetchLogList() {
    yield takeEvery(ActionTypes.Fetching, fetchLogList);
}
