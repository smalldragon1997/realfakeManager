import {combineReducers} from 'redux';

import {reducer as allReducer} from '../../components/allComponent/all/';

export const reducer = combineReducers({
    all:allReducer,
});