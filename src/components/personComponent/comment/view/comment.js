import React from 'react';
import {connect} from 'react-redux';
// import Main from './main'
// import Info from './info'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import Loadable from '../../../commom/loadable';

const Main = Loadable(() => import('./main'));
const AllMain = Loadable(() => import('./allMain'));
export default () => {
    return (
        <Switch>
            <Route path="/person/comment/" exact component={Main}/>
            <Route path="/person/comment/all" exact component={AllMain}/>
        </Switch>
    );
}
