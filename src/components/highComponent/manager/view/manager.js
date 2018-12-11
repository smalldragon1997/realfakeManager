import React from 'react';
import {connect} from 'react-redux';
// import Main from './main'
// import Info from './info'
// import Add from './add'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import Loadable from '../../../commom/loadable';

// 按需加载组件
const Main = Loadable(() => import('./main'));
const Info = Loadable(() => import('./info'));
const Add = Loadable(() => import('./add'));

export default () => {
    return (
        <Switch>
            <Route path="/high/manager/" exact component={Main}/>
            <Route path="/high/manager/info" exact component={Info}/>
            <Route path="/high/manager/add" exact component={Add}/>
        </Switch>
    );
}