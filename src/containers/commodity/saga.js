import * as allSagas from '../../components/commodityComponent/all/saga'
import * as commentSagas from '../../components/commodityComponent/comment/saga'
import * as brandSagas from '../../components/commodityComponent/brand/saga'
import * as uniteSagas from '../../components/commodityComponent/unite/saga'
import * as seriesSagas from '../../components/commodityComponent/series/saga'
import * as typeSagas from '../../components/commodityComponent/type/saga'
import * as qualitySagas from '../../components/commodityComponent/quality/saga'
import * as sizeSagas from '../../components/commodityComponent/size/saga'
import * as expressSagas from '../../components/commodityComponent/express/saga'
import * as discountSagas from '../../components/commodityComponent/discount/saga'
import * as homeSagas from '../../components/commodityComponent/home/saga'


export const watchFetchCommodityListSaga = allSagas.watchFetchCommodityList;
export const watchFetchCommoditySaga = allSagas.watchFetchCommodity;
export const watchAddCommoditySaga = allSagas.watchAddCommodity;
export const watchDeleteCommoditySaga = allSagas.watchDeleteCommodity;
export const watchUpdateCommoditySaga = allSagas.watchUpdateCommodity;

export const watchDeleteCommentsSaga = commentSagas.watchDeleteComments;
export const watchReplySaga = commentSagas.watchReply;

export const watchFetchBrandListSaga = brandSagas.watchFetchBrandList;
export const watchFetchBrandInfoSaga = brandSagas.watchFetchBrandInfo;
export const watchAddBrandSaga = brandSagas.watchAdd;
export const watchDeleteBrandSaga = brandSagas.watchDelete;
export const watchUpdateBrandSaga = brandSagas.watchUpdate;

export const watchFetchUniteListSaga = uniteSagas.watchFetchUniteList;
export const watchFetchUniteInfoSaga = uniteSagas.watchFetchUniteInfo;
export const watchDeleteUniteSaga = uniteSagas.watchDelete;
export const watchAddUniteSaga = uniteSagas.watchAdd;
export const watchUpdateUniteSaga = uniteSagas.watchUpdate;

export const watchDeleteSeriesSaga = seriesSagas.watchDelete;
export const watchFetchSeriesListSaga = seriesSagas.watchFetchSeriesList;
export const watchFetchSeriesInfoSaga = seriesSagas.watchFetchSeriesInfo;
export const watchAddSeriesSaga = seriesSagas.watchAdd;
export const watchUpdateSeriesSaga = seriesSagas.watchUpdate;

export const watchDeleteTypeSaga = typeSagas.watchDelete;
export const watchFetchTypeListSaga = typeSagas.watchFetchTypeList;
export const watchFetchTypeInfoSaga = typeSagas.watchFetchTypeInfo;
export const watchAddTypeSaga = typeSagas.watchAdd;
export const watchUpdateTypeSaga = typeSagas.watchUpdate;

export const watchDeleteQualitySaga = qualitySagas.watchDelete;
export const watchFetchQualityListSaga = qualitySagas.watchFetchQualityList;
export const watchFetchQualityInfoSaga = qualitySagas.watchFetchQualityInfo;
export const watchAddQualitySaga = qualitySagas.watchAdd;
export const watchUpdateQualitySaga = qualitySagas.watchUpdate;

export const watchDeleteSizeSaga = sizeSagas.watchDelete;
export const watchFetchSizeListSaga = sizeSagas.watchFetchSizeList;
export const watchFetchSizeInfoSaga = sizeSagas.watchFetchSizeInfo;
export const watchAddSizeSaga = sizeSagas.watchAdd;
export const watchUpdateSizeSaga = sizeSagas.watchUpdate;

export const watchDeleteExpressSaga = expressSagas.watchDelete;
export const watchFetchExpressInfoSaga = expressSagas.watchFetchExpressInfo;
export const watchFetchExpressListSaga = expressSagas.watchFetchExpressList;
export const watchAddExpressSaga = expressSagas.watchAdd;
export const watchUpdateExpressSaga = expressSagas.watchUpdate;

export const watchFetchDiscountListSaga = discountSagas.watchFetchDiscountList;
export const watchFetchDiscountInfoSaga = discountSagas.watchFetchDiscountInfo;
export const watchDeleteDiscountSaga = discountSagas.watchDelete;
export const watchAddDiscountSaga = discountSagas.watchAdd;
export const watchUpdateDiscountSaga = discountSagas.watchUpdate;

export const watchUpdateHomeSaga = homeSagas.watchUpdate;
export const watchFetchHomeSaga = homeSagas.watchFetch;