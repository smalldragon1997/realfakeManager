import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect,withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown,Button,Badge} from 'antd';

const SubMenu = Menu.SubMenu;
// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});
class navLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            current: this.props.location.pathname.split("/",3)[2]===""?"user":this.props.location.pathname.split("/",3)[2],
        });
        console.log(this.state)
    }

    // 如果接受不到info则返回登录页面
    componentWillReceiveProps(nextProps){
        if(nextProps.info===undefined&&nextProps.info===this.props.info){
            this.props.history.push("/");
        }
    }

    componentDidMount() {
    }

    render() {
        const {
            auth, // 管理员权限信息
            info, //管理员信息
            isLoading, // 是否加载中
        } = this.props;

        const{
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
                        mode="inline"
                    >
                        <Menu.Item key="all" onClick={()=>{
                            this.props.history.push("/user/all");
                        }}>全部用户</Menu.Item>
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