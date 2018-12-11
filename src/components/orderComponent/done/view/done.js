import React from 'react';
import {connect} from 'react-redux';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table,Tag} from 'antd';

import Loadable from '../../../commom/loadable';

const Main = Loadable(() => import('./main'));
const Info = Loadable(() => import('./info'));

export default () => {
    return (
        <Switch>
            <Route path="/order/done/" exact component={Main}/>
            <Route path="/order/done/info" exact component={Info}/>
        </Switch>
    );
}