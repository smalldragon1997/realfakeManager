import React from 'react';
import {connect} from 'react-redux';
// import Main from './main'
// import Info from './info'
// import Add from './add'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table,Tag} from 'antd';


import Loadable from '../../../commom/loadable';
const Info = Loadable(() => import('./info'));
export default () => {
    return (
        <div>
            <Switch>
                <Route path="/commodity/home/" exact component={Info}/>
            </Switch>
        </div>
    );
}