import {combineReducers} from 'redux';

import {reducer as payReducer} from '../../components/orderComponent/pay/';
import {reducer as deliverReducer} from '../../components/orderComponent/deliver/';
import {reducer as takeReducer} from '../../components/orderComponent/take/';
import {reducer as doneReducer} from '../../components/orderComponent/done/';
import {reducer as afterSaleReducer} from '../../components/orderComponent/afterSale/';

export const reducer = combineReducers({
    pay:payReducer,
    deliver:deliverReducer,
    take:takeReducer,
    done:doneReducer,
    afterSale:afterSaleReducer,
});