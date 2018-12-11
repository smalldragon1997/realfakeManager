import React from 'react';
import {connect} from 'react-redux';
// import Untreated from './untreated'
// import Process from './process'
// import Done from './done'
// import Info from './info'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table,Tag} from 'antd';

import Loadable from '../../../commom/loadable';

const Main = Loadable(() => import('./main'));
const Add = Loadable(() => import('./add'));
const Info = Loadable(() => import('./info'));

export default () => {
    return (
        <Switch>
            <Route path="/commodity/all/" exact component={Main}/>
            <Route path="/commodity/all/add" exact component={Add}/>
            <Route path="/commodity/all/info" exact component={Info}/>
        </Switch>
    );
}