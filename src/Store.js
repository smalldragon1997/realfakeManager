import {createStore, applyMiddleware,combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {reducer as loginReducer} from './containers/login';
import {reducer as highReducer} from './containers/high';
import {reducer as allReducer} from './containers/all';
import {reducer as orderReducer} from './containers/order';
import {reducer as commReducer} from './containers/commodity';
import {reducer as userReducer} from './containers/user';
import {reducer as personReducer} from './containers/person';
import {reducer as navReducer} from './components/shareComponents/navLink';
import rootSaga from './rootSaga';
const reducer = combineReducers({
    navLink:navReducer,
    login:loginReducer,
    high:highReducer,
    all:allReducer,
    order:orderReducer,
    commodity:commReducer,
    user:userReducer,
    person:personReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];
const store = createStore(reducer,applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);

export default store;