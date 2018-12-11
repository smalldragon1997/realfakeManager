import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {Select,Upload,
    Menu,
    Icon,
    Row,
    Col,
    Avatar,
    Dropdown,
    Spin,
    Button,
    Checkbox,
    Input,
    message,
    Table,
    Tag,
    Divider
} from 'antd';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class add extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 需要提交的数据
            authName:undefined,
            describe:undefined
        });
    }


    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            isLoading, // 是否加载中
            onAddAuth, // 添加管理员
        } = this.props;

        const {
            authName,
            describe
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined?(
                        <Divider>请登录</Divider>
                    ):(
                        !info.isSuper?(
                            <Divider>权限不足</Divider>
                        ):(
                            <Row>
                                <Col>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                        <Divider>添加权限</Divider>
                                    </Row>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            权限名：
                                        </Col>
                                        <Col span={18}>
                                            <Input style={{width: "70%"}} placeholder={"权限名"}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           authName: e.target.value
                                                       })
                                                   }}/>
                                        </Col>
                                    </Row>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            权限描述：
                                        </Col>
                                        <Col span={18}>
                                            <Input style={{width: "70%"}} placeholder={"权限描述"}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           describe: e.target.value
                                                       })
                                                   }}/>
                                        </Col>
                                    </Row>
                                    <Row style={{padding: "3%", paddingTop: 0}}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                             xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                            <Button type={"primary"} style={{width: "100%"}}
                                                    onClick={() => {

                                                        if(!(authName&&describe)){
                                                            message.error("请输入完整");
                                                        }else{
                                                            onAddAuth(authName,describe);
                                                            this.props.history.push("/high/auth/");
                                                        }
                                                    }}
                                            >确认添加</Button>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                            <Button
                                                style={{width: "100%"}}
                                                onClick={() => {
                                                    this.props.history.push("/high/auth/");
                                                }}>取消</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    )
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const auth = state.high.auth;
    const navLink = state.navLink;
    return {
        auth:navLink.auth,
        info:navLink.info,
        isLoading: auth.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAddAuth: (authName,describe) => {
            dispatch(Actions.Start());
            dispatch(Actions.AddAuth(localStorage.getItem("RealFakeManagerJwt"),authName,describe));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(add));