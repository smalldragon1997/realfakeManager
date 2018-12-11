import React from 'react';
import {view as Login} from './containers/login/';
import {view as High} from './containers/high/';
import {view as All} from './containers/all/';
import {view as Order} from './containers/order/';
import {view as Commodity} from './containers/commodity/';
import {view as User} from './containers/user/';
import {view as Person} from './containers/person/';
import {view as NavLink} from './components/shareComponents/navLink/';
import Loadable from 'react-loadable';
import {Row, Col,Card} from 'antd';
import {HashRouter,BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <div>
                <NavLink/>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/high/" component={High}/>
                    <Route path="/all" component={All}/>
                    <Route path="/order/" component={Order}/>
                    <Route path="/commodity/" component={Commodity}/>
                    <Route path="/user/" component={User}/>
                    <Route path="/person/" component={Person}/>
                    <Redirect to="/" />
                </Switch>
            </div>
        </HashRouter>
    );
}

export default App;

