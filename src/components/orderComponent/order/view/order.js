import React from 'react';
import {connect} from 'react-redux';
import {view as NavLink} from '../../navLink/'
import {HashRouter, BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';

import {view as Pay} from '../../pay'
import {view as Deliver} from '../../deliver'
import {view as Take} from '../../take'
import {view as Done} from '../../done'
import {view as AfterSale} from '../../afterSale'

import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message} from 'antd';

export default () => {
    return (
        <Row  style={{marginTop:"2%",marginBottom:"2%",backgroundColor: "#fff"}}>
            <Col xs={24} sm={24} md={24} lg={24} xl={4} xxl={4}>
                <NavLink/>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={20}>
                <Switch>
                    <Route path="/order/pay/"  component={Pay}/>
                    <Route path="/order/deliver/"  component={Deliver}/>
                    <Route path="/order/take/"  component={Take}/>
                    <Route path="/order/done/"  component={Done}/>
                    <Route path="/order/afterSale/"  component={AfterSale}/>
                    <Redirect to="/order/pay/"/>
                </Switch>
            </Col>
        </Row>
    );
}


// 日期转换
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};