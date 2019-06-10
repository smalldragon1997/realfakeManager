import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect,withRouter} from 'react-router-dom';
import {searchCommodity} from '../../../../elasticApi';
import {Menu, Icon, Row, Col, Avatar, Dropdown} from 'antd';

class navLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            current: this.props.location.pathname.split("/",2)[1]===""?"high":this.props.location.pathname.split("/",2)[1]
        });
        // 如果存在jwt，则验证令牌有效性
        const jwt = localStorage.getItem("RealFakeManagerJwt");
        if(jwt!==undefined&&jwt!==null&&jwt!==""){
            this.props.onAuthJwt(jwt);
        }
    }

    render() {
        const {
            auth, // 管理员权限信息
            info, //管理员信息
            isLoading, // 是否加载中
        } = this.props;

        return (
            info === undefined ? null : (
                <Row type={"flex"} align={"middle"} justify={"space-around"} style={{backgroundColor: "#001529"}}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={16} >
                        <Row type={"flex"} align={"middle"}>
                            <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={4}>
                                <img src="https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/logo.png"
                                     style={{width: "56%"}}/>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
                                <Menu
                                    theme={"dark"}
                                    onClick={(e) => {
                                        this.setState({
                                            current: e.key
                                        })
                                    }}
                                    selectedKeys={[this.state.current]}
                                    mode="horizontal"
                                >
                                    {
                                        info.isSuper?(
                                            <Menu.Item key="high" onClick={()=>{
                                                this.props.history.push("/high/manager");
                                            }}>
                                                高级管理
                                            </Menu.Item>
                                        ):null
                                    }
                                    {/*{*/}
                                        {/*auth.see_all||info.isSuper?(*/}
                                            {/*<Menu.Item key="all" onClick={()=>{*/}
                                                {/*this.props.history.push("/all");*/}
                                            {/*}}>*/}
                                                {/*流量总览*/}
                                            {/*</Menu.Item>*/}
                                        {/*):null*/}
                                    {/*}*/}
                                    {
                                        auth.see_order||info.isSuper?(
                                            <Menu.Item key="order" onClick={()=>{
                                                this.props.history.push("/order/pay");
                                            }}>
                                                订单监控
                                            </Menu.Item>
                                        ):null
                                    }
                                    {
                                        auth.see_commodity||info.isSuper?(
                                            <Menu.Item key="commodity" onClick={()=>{
                                                this.props.history.push("/commodity/all");
                                            }}>
                                                商品管理
                                            </Menu.Item>
                                        ):null
                                    }
                                    {/*{*/}
                                        {/*auth.see_user||info.isSuper?(*/}
                                            {/*<Menu.Item key="user" onClick={()=>{*/}
                                                {/*this.props.history.push("/user/all");*/}
                                            {/*}}>*/}
                                                {/*用户管理*/}
                                            {/*</Menu.Item>*/}
                                        {/*):null*/}
                                    {/*}*/}
                                    <Menu.Item key="person" onClick={()=>{
                                        this.props.history.push("/person/info");
                                    }}>
                                        个人信息
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={4} style={{textAlign: "right",color:"#fff",fontSize:17,lineHeight:2}}>
                                <Avatar src={info.icon} size={"default"}/> {info.nickname}
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(jwt));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navLink));