import * as paySagas from '../../components/orderComponent/pay/saga'
import * as deliverSagas from '../../components/orderComponent/deliver/saga'
import * as takeSagas from '../../components/orderComponent/take/saga'
import * as doneSagas from '../../components/orderComponent/done/saga'
import * as afterSaleSagas from '../../components/orderComponent/afterSale/saga'


export const watchFetchPaysSaga = paySagas.watchFetchPays;
export const watchFetchOrderInfoSaga = paySagas.watchFetchPayInfo;
export const watchDeletePaysSaga = paySagas.watchDeletePays;
export const watchUpdatePriceSaga = paySagas.watchUpdatePrice;

export const watchDeleteDeliversSaga = deliverSagas.watchDeleteDelivers;
export const watchDeliverSaga = deliverSagas.watchDeliver;
export const watchFetchDeliverInfoSaga = deliverSagas.watchFetchDeliverInfo;
export const watchFetchDeliversSaga = deliverSagas.watchFetchDelivers;
export const watchFetchExpressSaga = deliverSagas.watchFetchExpress;
export const watchFetchExcelSaga = deliverSagas.watchFetchExcel;

export const watchDeleteTakeOrdersSaga = takeSagas.watchDeleteTakeOrders;
export const watchFetchTakeExpressSaga = takeSagas.watchFetchTakeExpress;
export const watchFetchTakeOrdersSaga = takeSagas.watchFetchTakeOrders;
export const watchUpdateDeliverSaga = takeSagas.watchUpdateDeliver;

export const watchDeleteDoneOrdersSaga = doneSagas.watchDeleteDoneOrders;
export const watchFetchDoneOrdersSaga = doneSagas.watchFetchDoneOrders;
export const watchFetchDoneInfoSaga = doneSagas.watchFetchDoneInfo;

export const watchDeleteDoneAfterSalesSaga = afterSaleSagas.watchDeleteDoneAfterSales;
export const watchFetchAfterSaleInfoSaga = afterSaleSagas.watchFetchAfterSaleInfo;
export const watchFetchAfterSalesSaga = afterSaleSagas.watchFetchAfterSales;
export const watchAgreeAfterSalesSaga = afterSaleSagas.watchAgreeAfterSales;
export const watchDisAgreeAfterSalesSaga = afterSaleSagas.watchDisAgreeAfterSales;
export const watchCloseAfterSalesSaga = afterSaleSagas.watchCloseAfterSales;