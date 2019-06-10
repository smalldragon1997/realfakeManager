import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';
// 获取品牌列表
function* fetchBrandList(action) {
    try {
        const result = yield call(Api.fetchBrandList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取品牌列表时发生错误："+e.toString()));
    }
}

export function* watchFetchBrandList() {
    yield takeEvery(ActionTypes.Fetching, fetchBrandList);
}

function* fetchBrandInfo(action) {
    try {
        const result = yield call(Api.fetchBrandInfo,{
            brandId:action.brandId
        });
        yield put(Actions.FetchBrandInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取品牌信息时发生错误："+e.toString()));
    }
}

export function* watchFetchBrandInfo() {
    yield takeEvery(ActionTypes.FetchBrandInfo, fetchBrandInfo);
}
// 删除
function* deleteBrands(action) {
    try {
        // 删除
        const result = yield call(Api.deleteBrand,{
            brandId:action.brandId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteBrandSuccess(result.data));
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
        const result = yield call(Api.updateBrand,{
            manId:action.brandInfo.manId,
            brandId:action.brandInfo.brandId,
            brandName:action.brandInfo.brandName,
            describe:action.brandInfo.describe,
            cover:action.brandInfo.cover,
            sizeTable:action.brandInfo.sizeTable,
            pictures:action.brandInfo.pictures,
            types:action.brandInfo.types,
            ids:action.brandInfo.ids,
            jwt:action.jwt
        });
        yield put(Actions.UpdateBrandSuccess(result.data));
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
        const result = yield call(Api.addBrand,{
            manId:action.brandInfo.manId,
            brandName:action.brandInfo.brandName,
            describe:action.brandInfo.describe,
            cover:action.brandInfo.cover,
            sizeTable:action.brandInfo.sizeTable,
            pictures:action.brandInfo.pictures,
            types:action.brandInfo.types,
            ids:action.brandInfo.ids,
            jwt:action.jwt
        });
        yield put(Actions.AddBrandSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加品牌时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.AddBrand, add);
}