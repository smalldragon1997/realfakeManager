import React from 'react';
import {connect} from 'react-redux';
// import Untreated from './untreated'
// import Process from './process'
// import Done from './done'
// import Info from './info'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table,Tag} from 'antd';

import Loadable from '../../../commom/loadable';

const Untreated = Loadable(() => import('./untreated'));
const Process = Loadable(() => import('./process'));
const Done = Loadable(() => import('./done'));
const Info = Loadable(() => import('./info'));

export default () => {
    return (
        <Switch>
            <Route path="/order/afterSale/" exact component={Untreated}/>
            <Route path="/order/afterSale/process" exact component={Process}/>
            <Route path="/order/afterSale/done" exact component={Done}/>
            <Route path="/order/afterSale/info" exact component={Info}/>
        </Switch>
    );
}