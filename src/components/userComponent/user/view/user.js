import React from 'react';
import {connect} from 'react-redux';
import {view as NavLink} from '../../navLink/'
import {HashRouter, BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';

import {view as All} from '../../all'
import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message} from 'antd';


export default () => {
    return (
        <Row  style={{marginTop:"2%",marginBottom:"2%",backgroundColor: "#fff"}}>
            <Col xs={24} sm={24} md={24} lg={24} xl={4} xxl={4}>
                <NavLink/>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
                <Switch>
                    <Route path="/user/all/"  component={All}/>
                    <Redirect to="/user/all/"/>
                </Switch>
            </Col>
        </Row>
    );
}