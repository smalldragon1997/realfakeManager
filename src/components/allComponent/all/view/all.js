import React from 'react';
import {connect} from 'react-redux';
// import Main from './main'
// import Info from './info'
// import Add from './add'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import Loadable from '../../../commom/loadable';

const Main = Loadable(() => import('./main'));

export default () => {
    return (
        <Main/>
    );
}