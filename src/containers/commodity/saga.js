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


export const watchAddCommoditySaga = allSagas.watchAddCommodity;
export const watchDeleteCommoditySaga = allSagas.watchDeleteCommodity;
export const watchUpdateCommoditySaga = allSagas.watchUpdateCommodity;

export const watchDeleteCommentsSaga = commentSagas.watchDeleteComments;
export const watchReplySaga = commentSagas.watchReply;

export const watchAddBrandSaga = brandSagas.watchAdd;
export const watchDeleteBrandSaga = brandSagas.watchDelete;
export const watchUpdateBrandSaga = brandSagas.watchUpdate;

export const watchDeleteUniteSaga = uniteSagas.watchDelete;
export const watchAddUniteSaga = uniteSagas.watchAdd;
export const watchUpdateUniteSaga = uniteSagas.watchUpdate;

export const watchDeleteSeriesSaga = seriesSagas.watchDelete;
export const watchAddSeriesSaga = seriesSagas.watchAdd;
export const watchUpdateSeriesSaga = seriesSagas.watchUpdate;

export const watchDeleteTypeSaga = typeSagas.watchDelete;
export const watchAddTypeSaga = typeSagas.watchAdd;
export const watchUpdateTypeSaga = typeSagas.watchUpdate;

export const watchDeleteQualitySaga = qualitySagas.watchDelete;
export const watchAddQualitySaga = qualitySagas.watchAdd;
export const watchUpdateQualitySaga = qualitySagas.watchUpdate;

export const watchDeleteSizeSaga = sizeSagas.watchDelete;
export const watchAddSizeSaga = sizeSagas.watchAdd;
export const watchUpdateSizeSaga = sizeSagas.watchUpdate;

export const watchDeleteExpressSaga = expressSagas.watchDelete;
export const watchAddExpressSaga = expressSagas.watchAdd;
export const watchUpdateExpressSaga = expressSagas.watchUpdate;

export const watchDeleteDiscountSaga = discountSagas.watchDelete;
export const watchAddDiscountSaga = discountSagas.watchAdd;
export const watchUpdateDiscountSaga = discountSagas.watchUpdate;

export const watchUpdateHomeSaga = homeSagas.watchUpdate;