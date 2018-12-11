import {combineReducers} from 'redux';

import {reducer as allReducer} from '../../components/commodityComponent/all/';
import {reducer as commentReducer} from '../../components/commodityComponent/comment/';
import {reducer as brandReducer} from '../../components/commodityComponent/brand/';
import {reducer as uniteReducer} from '../../components/commodityComponent/unite/';
import {reducer as seriesReducer} from '../../components/commodityComponent/series/';
import {reducer as typesReducer} from '../../components/commodityComponent/type/';
import {reducer as qualityReducer} from '../../components/commodityComponent/quality/';
import {reducer as sizeReducer} from '../../components/commodityComponent/size/';
import {reducer as expressReducer} from '../../components/commodityComponent/express/';
import {reducer as discountReducer} from '../../components/commodityComponent/discount/';
import {reducer as homeReducer} from '../../components/commodityComponent/home/';

export const reducer = combineReducers({
    all:allReducer,
    comment:commentReducer,
    brand:brandReducer,
    unite:uniteReducer,
    series:seriesReducer,
    type:typesReducer,
    quality:qualityReducer,
    size:sizeReducer,
    express:expressReducer,
    discount:discountReducer,
    home:homeReducer,
});