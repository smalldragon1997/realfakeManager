import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取品牌列表
function* fetchDiscountList(action) {
    try {
        const result = yield call(Api.fetchDiscountList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取代金卷列表时发生错误："+e.toString()));
    }
}

export function* watchFetchDiscountList() {
    yield takeEvery(ActionTypes.Fetching, fetchDiscountList);
}

// 获取品牌列表
function* fetchDiscountInfo(action) {
    try {
        const result = yield call(Api.fetchDiscountInfo,{
            disId:action.disId
        });
        yield put(Actions.FetchDiscountInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取代金卷列表时发生错误："+e.toString()));
    }
}

export function* watchFetchDiscountInfo() {
    yield takeEvery(ActionTypes.FetchDiscountInfo, fetchDiscountInfo);
}
// 删除权限
function* deleteDis(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteDiscount,{
            disId:action.disId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除代金卷时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteDis);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateDiscountInfo,{
            manId:action.disInfo.manId,
            disId:action.disInfo.disId,
            disName:action.disInfo.disName,
            price:action.disInfo.price,
            cover:action.disInfo.cover,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新代金卷信息时发生错误："+e.toString()));
    }
}

export function* watchUpdate() {
    yield takeEvery(ActionTypes.Update, update);
}

// 添加管理员信息
function* add(action) {
    try {
        const result = yield call(Api.addDiscount,{
            manId:action.disInfo.manId,
            disName:action.disInfo.disName,
            price:action.disInfo.price,
            cover:action.disInfo.cover,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加代金卷时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}