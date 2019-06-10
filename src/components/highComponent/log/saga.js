import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取日志列表
function* fetchLogList(action) {

    try {
        const result = yield call(Api.fetchLogList,{
            jwt:action.jwt,
            keyWord:action.searchInfo.keyWord,
            pageSize:action.searchInfo.pageSize,
            pageNum:action.searchInfo.pageNum,
            dateEnd:action.searchInfo.dateEnd,
            dateStart:action.searchInfo.dateStart
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取日志列表时发生错误："+e.toString()));
    }
}

export function* watchFetchLogList() {
    yield takeEvery(ActionTypes.Fetching, fetchLogList);
}
