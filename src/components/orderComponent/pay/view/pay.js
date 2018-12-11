import React from 'react';
import {connect} from 'react-redux';
// import Main from './main'
// import Info from './info'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import Loadable from '../../../commom/loadable';

const Main = Loadable(() => import('./main'));
const Info = Loadable(() => import('./info'));
export default () => {
    return (
        <Switch>
            <Route path="/order/pay/" exact component={Main}/>
            <Route path="/order/pay/info" exact component={Info}/>
        </Switch>
    );
}
