import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 删除权限
function* deletes(action) {
    try {
        // 删除管理员Api
        // const result = yield call(Api.delManager,{
        //     man_idList:action.man_id,
        //     jwt:action.jwt
        // });
        yield put(Actions.DeleteSuccess(action.userIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除用户时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deletes);
}

// 更新权限信息
function* DisCount(action) {
    try {
        // const result = yield call(Api.DisCountManager,{
        //     man_id:action.man_id,
        //     auths:JSON.stringify(action.auths),
        //     nickname:action.nickname,
        //     jwt:action.jwt
        // });
        yield put(Actions.DiscountSuccess(action.disInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("设置代金卷时发生错误："+e.toString()));
    }
}

export function* watchDisCount() {
    yield takeEvery(ActionTypes.Discount, DisCount);
}
