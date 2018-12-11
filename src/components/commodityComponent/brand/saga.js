import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 删除权限
function* deleteBrands(action) {
    try {
        // 删除管理员Api
        // const result = yield call(Api.delManager,{
        //     man_idList:action.man_id,
        //     jwt:action.jwt
        // });
        yield put(Actions.DeleteBrandSuccess(action.brandIdList));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除品牌时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.DeleteBrand, deleteBrands);
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
        yield put(Actions.UpdateBrandSuccess(action.brandInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新品牌信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.UpdateBrand, update);
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
        yield put(Actions.AddBrandSuccess(action.brandInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加品牌时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.AddBrand, add);
}