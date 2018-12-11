import {combineReducers} from 'redux';

import {reducer as allReducer} from '../../components/userComponent/all/';

export const reducer = combineReducers({
    all:allReducer,
});