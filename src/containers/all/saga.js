import {watchFetchAfterSale} from '../../components/allComponent/all/saga'
import {watchFetchCommodities} from '../../components/allComponent/all/saga'
import {watchFetchKeyWords} from '../../components/allComponent/all/saga'
import {watchFetchOrders} from '../../components/allComponent/all/saga'
import {watchFetchVisit} from '../../components/allComponent/all/saga'

export const watchFetchAfterSaleSaga = watchFetchAfterSale;
export const watchFetchCommoditiesSaga = watchFetchCommodities;
export const watchFetchKeyWordsSaga = watchFetchKeyWords;
export const watchFetchOrdersSaga = watchFetchOrders;
export const watchFetchVisitSaga = watchFetchVisit;