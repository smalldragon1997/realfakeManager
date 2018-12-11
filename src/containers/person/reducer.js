import {combineReducers} from 'redux';

import {reducer as infoReducer} from '../../components/personComponent/info/';
import {reducer as commentReducer} from '../../components/personComponent/comment/';

export const reducer = combineReducers({
    info:infoReducer,
    comment:commentReducer,
});