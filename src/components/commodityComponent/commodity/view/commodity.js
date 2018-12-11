import React from 'react';
import {connect} from 'react-redux';
import {view as NavLink} from '../../navLink/'
import {HashRouter, BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';

import {view as All} from '../../all'
import {view as Comment} from '../../comment'
import {view as Brand} from '../../brand'
import {view as Unite} from '../../unite'
import {view as Series} from '../../series'
import {view as Type} from '../../type'
import {view as Quality} from '../../quality'
import {view as Size} from '../../size'
import {view as Express} from '../../express'
import {view as Discount} from '../../discount'
import {view as Home} from '../../home'
import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message} from 'antd';


export default () => {
    return (
        <Row  style={{marginTop:"2%",marginBottom:"2%",backgroundColor: "#fff"}}>
            <Col xs={24} sm={24} md={24} lg={24} xl={4} xxl={4}>
                <NavLink/>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
                <Switch>
                    <Route path="/commodity/all/"  component={All}/>
                    <Route path="/commodity/comment/" component={Comment}/>
                    <Route path="/commodity/brand/" component={Brand}/>
                    <Route path="/commodity/unite/" component={Unite}/>
                    <Route path="/commodity/series/" component={Series}/>
                    <Route path="/commodity/type/" component={Type}/>
                    <Route path="/commodity/size/" component={Size}/>
                    <Route path="/commodity/quality/" component={Quality}/>
                    <Route path="/commodity/discount/" component={Discount}/>
                    <Route path="/commodity/express/" component={Express}/>
                    <Route path="/commodity/home/" component={Home}/>
                    <Redirect to="/commodity/all/"/>
                </Switch>
            </Col>
        </Row>
    );
}