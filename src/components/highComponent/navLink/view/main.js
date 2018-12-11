import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect,withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown,Button} from 'antd';

class navLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            current: this.props.location.pathname.split("/",3)[2]===""?"manager":this.props.location.pathname.split("/",3)[2]
        });
    }

    // 如果接受不到info则返回登录页面
    componentWillReceiveProps(nextProps){
        if(nextProps.info===undefined&&nextProps.info===this.props.info){
            this.props.history.push("/");
        }
    }
    render() {
        const {
            auth, // 管理员权限信息
            info, //管理员信息
            isLoading, // 是否加载中
        } = this.props;

        return (
            info === undefined ? (<div style={{margin:"5%"}}>
                <Button style={{width:"100%"}}
                    onClick={()=>{
                    this.props.history.push("/");
                }}>请登录</Button>
            </div>) : (
                <div>
                    <Menu
                        onClick={(e) => {
                            this.setState({
                                current: e.key
                            })
                        }}
                        selectedKeys={[this.state.current]}
                        mode="vertical"
                    >
                        <Menu.Item key="manager" onClick={()=>{
                            this.props.history.push("/high/manager/");
                        }} >
                            <Icon type="home" theme="outlined" />管理员管理
                        </Menu.Item>
                        <Menu.Item key="auth" onClick={()=>{
                            this.props.history.push("/high/auth/");
                        }} >
                            <Icon type="key" theme="outlined" />权限管理
                        </Menu.Item>
                        <Menu.Item key="log" onClick={()=>{
                            this.props.history.push("/high/log/");
                        }} >
                            <Icon type="file" theme="outlined" />操作日志
                        </Menu.Item>
                    </Menu>
                </div>

            )

        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: navLink.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAuthJwt:(jwt)=>{

        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navLink));