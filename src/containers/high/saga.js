import {watchFetchManagers} from '../../components/highComponent/manager/saga'
import {watchDelManager} from '../../components/highComponent/manager/saga'
import {watchForbidManager} from '../../components/highComponent/manager/saga'
import {watchCancelForbidManager} from '../../components/highComponent/manager/saga'
import {watchFetchAuthList} from '../../components/highComponent/manager/saga'
import {watchUpdateManager} from '../../components/highComponent/manager/saga'
import {watchAddManager} from '../../components/highComponent/manager/saga'
import {watchAddAuth} from '../../components/highComponent/auth/saga'
import {watchDelAuth} from '../../components/highComponent/auth/saga'
import {watchUpdateAuth} from '../../components/highComponent/auth/saga'
import {watchFetchLogList} from '../../components/highComponent/log/saga'


export const watchFetchManagersSaga = watchFetchManagers;
export const watchDelManagerSaga = watchDelManager;
export const watchForbidManagerSaga = watchForbidManager;
export const watchCancelForbidManagerSaga = watchCancelForbidManager;
export const watchFetchAuthListSaga = watchFetchAuthList;
export const watchUpdateManagerSaga = watchUpdateManager;
export const watchAddManagerSaga = watchAddManager;

export const watchAddAuthSaga = watchAddAuth;
export const watchDelAuthSaga = watchDelAuth;
export const watchUpdateAuthSaga = watchUpdateAuth;

export const watchFetchLogListSaga = watchFetchLogList;