import React from 'react';
import {connect} from 'react-redux';
// import Main from './main'
// import Info from './info'
// import Add from './add'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table,Tag} from 'antd';


import Loadable from '../../../commom/loadable';

const Main = Loadable(() => import('./main'));
const Info = Loadable(() => import('./info'));
const Add = Loadable(() => import('./add'));
export default () => {
    return (
        <div>
            <Switch>
                <Route path="/commodity/size/" exact component={Main}/>
                <Route path="/commodity/size/info" exact component={Info}/>
                <Route path="/commodity/size/add" exact component={Add}/>
            </Switch>
        </div>
    );
}