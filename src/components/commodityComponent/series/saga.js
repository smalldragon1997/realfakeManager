import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取品牌列表
function* fetchSeriesList(action) {
    try {
        const result = yield call(Api.fetchSeriesList);
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取系列列表时发生错误："+e.toString()));
    }
}

export function* watchFetchSeriesList() {
    yield takeEvery(ActionTypes.Fetching, fetchSeriesList);
}
// 获取信息
function* fetchSeriesInfo(action) {
    try {
        const result = yield call(Api.fetchSeriesInfo,{
            seriesId:action.seriesId
        });
        yield put(Actions.FetchSeriesInfoSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取系列信息时发生错误："+e.toString()));
    }
}

export function* watchFetchSeriesInfo() {
    yield takeEvery(ActionTypes.FetchSeriesInfo, fetchSeriesInfo);
}
// 删除权限
function* deleteSeries(action) {
    try {
        // 删除管理员Api
        const result = yield call(Api.deleteSeries,{
            seriesId:action.seriesId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除系列时发生错误："+e.toString()));
    }
}

export function* watchDelete() {
    yield takeEvery(ActionTypes.Delete, deleteSeries);
}

// 更新权限信息
function* update(action) {
    try {
        const result = yield call(Api.updateSeries,{
            manId:action.seriesInfo.manId,
            seriesId:action.seriesInfo.seriesId,
            brandId:action.seriesInfo.brandId,
            seriesName:action.seriesInfo.seriesName,
            describe:action.seriesInfo.describe,
            cover:action.seriesInfo.cover,
            pictures:action.seriesInfo.pictures,
            types:action.seriesInfo.types,
            ids:action.seriesInfo.ids,
            jwt:action.jwt
        });
        yield put(Actions.UpdateSuccess(result.data));
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
        const result = yield call(Api.addSeries,{
            manId:action.seriesInfo.manId,
            brandId:action.seriesInfo.brandId,
            seriesName:action.seriesInfo.seriesName,
            describe:action.seriesInfo.describe,
            cover:action.seriesInfo.cover,
            pictures:action.seriesInfo.pictures,
            types:action.seriesInfo.types,
            ids:action.seriesInfo.ids,
            jwt:action.jwt
        });
        yield put(Actions.AddSuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加系列时发生错误："+e.toString()));
    }
}

export function* watchAdd() {
    yield takeEvery(ActionTypes.Add, add);
}