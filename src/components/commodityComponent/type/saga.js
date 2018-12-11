import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 删除权限
function* deleteType(action) {
    try {
        // 删除管理员Api
        // const result = yield call(Api.delManager,{
        //     man_idList:action.man_id,
        //     jwt:action.jwt
        // });
        yield put(Actions.DeleteSuccess(action.typeIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除系列时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteType);
}

// 更新权限信息
function* update(action) {
    try {
        // const result = yield call(Api.updateManager,{
        //     man_id:action.man_id,
        //     auths:JSON.stringify(action.auths),
        //     nickname:action.nickname,
        //     jwt:action.jwt
        // });
        yield put(Actions.UpdateSuccess(action.typeInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新系列信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {
    try {
        // const result = yield call(Api.addManager,{
        //     username:action.username,
        //     password:action.password,
        //     isForbidden:action.isForbidden,
        //     auths:JSON.stringify(action.auths),
        //     nickname:action.auths,
        //     jwt:action.jwt
        // });
        yield put(Actions.AddSuccess(action.typeInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加系列时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}