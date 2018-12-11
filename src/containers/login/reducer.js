import {combineReducers} from 'redux';

import {reducer as loginReducer} from '../../components/loginComponent/login/';

export const reducer = combineReducers({
    login:loginReducer,
});