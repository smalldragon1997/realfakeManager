import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as NavActions from '../../../shareComponents/navLink/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Form, Icon, Input, Button, Checkbox, Row, Col, message,Spin} from 'antd';

const FormItem = Form.Item;

class login extends React.Component {

    constructor(props) {
        super(props);
        // 提交表单值 用户名、密码、是否记住登录状态
        this.state = ({
            username: undefined,
            password: undefined,
            rememberMe: false
        });
    }

    render() {
        const {
            oldInfo,
            info,// 登录后的管理员信息
            isLoading, // 是否是载入状态
            onLogin, //登录
        } = this.props;
        // 如果已经登录过，到个人信息页面
        if(this.props.oldInfo!==undefined){
            this.props.history.push("/person/info");
        }
        return (
            <Spin spinning={isLoading}>
                <Row type={"flex"} align={"center"} justify={"space-around"}
                     style={{padding: "5%", paddingBottom: "12%"}}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10} xxl={10}>
                        <div style={{padding: "10%", backgroundColor: "#fff"}}>
                            <Row style={{padding: "5%", textAlign: "center"}}>
                                <img src="https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/logo.png"
                                     style={{width: "80%"}}/>
                            </Row>
                            <Row style={{padding: "2%"}}>
                                <Input placeholder="用户名" size={"large"} onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        username: e.target.value
                                    });
                                }}/>
                            </Row>
                            <Row style={{padding: "2%"}}>
                                <Input placeholder="密码" size={"large"} onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        password: e.target.value
                                    });
                                }}/>
                            </Row>
                            <Row style={{padding: "2%"}}>
                                <Checkbox onChange={(e) => {
                                    this.setState({
                                        ...this.state,
                                        rememberMe: e.target.checked
                                    });
                                }}>自动登录</Checkbox>
                            </Row>

                            <Row style={{padding: "2%"}}>
                                <Button type={"primary"} size={"large"} style={{width: "100%"}} onClick={() => {
                                    // 登录操作
                                    if (validateLogin(this.state))
                                        onLogin(this.state.username, this.state.password, this.state.rememberMe)
                                }}>登录</Button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Spin>
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const login = state.login.login;
    const navLink = state.navLink;
    return {
        oldInfo: navLink.info,
        info: login.info,
        isLoading: login.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password, rememberMe) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(username, password, rememberMe));
        },
        onSaveInfo:(info)=>{
            dispatch(NavActions.SaveInfo(info));
        },
        onDone:()=>{
            dispatch(Actions.Start());
            dispatch(Actions.Done());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(login));

function validateLogin(state) {
    if (state.username === undefined || state.username === "" || state.password === undefined || state.password === "") {
        message.error("请输入正确的格式");
        return false;
    }
    return true;
}