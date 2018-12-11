import {combineReducers} from 'redux';

import {reducer as managerReducer} from '../../components/highComponent/manager/';
import {reducer as authReducer} from '../../components/highComponent/auth/';
import {reducer as logReducer} from '../../components/highComponent/log/';

export const reducer = combineReducers({
    manager:managerReducer,
    auth:authReducer,
    log:logReducer
});