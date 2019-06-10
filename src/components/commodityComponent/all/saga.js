import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as ElasticApi from '../../../elasticApi';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';

// 获取商品列表
function* fetchCommodityList(action) {
    try {
        const result = yield call(Api.fetchCommodityList,{
            pageNum:action.filterInfo.pageNum,
            pageSize:action.filterInfo.pageSize,
            keyWord:action.filterInfo.keyWord,
            brandId:action.filterInfo.brandId,
            seriesId:action.filterInfo.seriesId,
            typeId:action.filterInfo.typeId,
            uniteId:action.filterInfo.uniteId,
            desc:action.filterInfo.desc,
            sort:action.filterInfo.sort,
            dateStart:action.filterInfo.dateStart,
            dateEnd:action.filterInfo.dateEnd,
            price:action.filterInfo.price,
        });
        yield put(Actions.Success(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("搜索商品时发生错误："+e.toString()));
    }
}

export function* watchFetchCommodityList() {
    yield takeEvery(ActionTypes.Filter, fetchCommodityList);
}

// 获取商品
function* fetchCommodity(action) {
    try {
        const result = yield call(Api.fetchCommodityInfo,{
            commId:action.commId
        });
        yield put(Actions.FetchCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("获取商品信息时发生错误："+e.toString()));
    }
}
export function* watchFetchCommodity() {
    yield takeEvery(ActionTypes.FetchCommodity, fetchCommodity);
}
// 删除商品
function* deleteCommodity(action) {
    try {
        const result = yield call(Api.deleteCommodityInfo,{
            commId:action.commId,
            jwt:action.jwt
        });
        yield put(Actions.DeleteCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除商品时发生错误："+e.toString()));
    }
}

export function* watchDeleteCommodity() {
    yield takeEvery(ActionTypes.DeleteCommodity, deleteCommodity);
}

// 更新商品
function* UpdateCommodity(action) {
    try {
        const result = yield call(Api.updateCommodityInfo,{
            brandId:action.commInfo.brandId,
            commId:action.commInfo.commId,
            cover:action.commInfo.cover,
            title:action.commInfo.title,
            describe:action.commInfo.describe,
            manId:action.commInfo.manId,
            oversize:action.commInfo.oversize,
            pictures:action.commInfo.pictures,
            price:action.commInfo.price,
            qualityId:action.commInfo.qualityId,
            seriesId:action.commInfo.seriesId,
            sizeId:action.commInfo.sizeId,
            soldOut:action.commInfo.soldOut,
            typeId:action.commInfo.typeId,
            uniteId:action.commInfo.uniteId,
            jwt:action.jwt
        });
        yield put(Actions.UpdateCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("更新商品时发生错误："+e.toString()));
    }
}

export function* watchUpdateCommodity() {
    yield takeEvery(ActionTypes.UpdateCommodity, UpdateCommodity);
}

// 添加商品
function* AddCommodity(action) {
    try {
        const result = yield call(Api.addCommodityInfo,{
            brandId:action.commInfo.brandId,
            cover:action.commInfo.cover,
            title:action.commInfo.title,
            describe:action.commInfo.describe,
            manId:action.commInfo.manId,
            oversize:action.commInfo.oversize,
            pictures:action.commInfo.pictures,
            price:action.commInfo.price,
            qualityId:action.commInfo.qualityId,
            seriesId:action.commInfo.seriesId,
            sizeId:action.commInfo.sizeId,
            soldOut:action.commInfo.soldOut,
            typeId:action.commInfo.typeId,
            uniteId:action.commInfo.uniteId,
            jwt:action.jwt
        });
        yield put(Actions.AddCommoditySuccess(result.data));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("添加商品时发生错误："+e.toString()));
    }
}

export function* watchAddCommodity() {
    yield takeEvery(ActionTypes.AddCommodity, AddCommodity);
}