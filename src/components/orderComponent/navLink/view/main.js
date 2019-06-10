import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect,withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown,Button} from 'antd';

const SubMenu = Menu.SubMenu;
class navLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            current: this.props.location.pathname.split("/",3)[2]===""?"order":this.props.location.pathname.split("/",3)[2]
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
                        defaultOpenKeys={['afterSale']}
                        onClick={(e) => {
                            this.setState({
                                current: e.key
                            })
                        }}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <Menu.Item key="pay" onClick={()=>{
                            this.props.history.push("/order/pay");
                        }} >
                            <Icon type="home" theme="outlined" />未付款订单
                        </Menu.Item>
                        <Menu.Item key="deliver" onClick={()=>{
                            this.props.history.push("/order/deliver");
                        }} >
                            <Icon type="home" theme="outlined" />未发货订单
                        </Menu.Item>
                        <Menu.Item key="take" onClick={()=>{
                            this.props.history.push("/order/take");
                        }} >
                            <Icon type="home" theme="outlined" />待收货订单
                        </Menu.Item>
                        <Menu.Item key="done" onClick={()=>{
                            this.props.history.push("/order/done");
                        }} >
                            <Icon type="home" theme="outlined" />已完成订单
                        </Menu.Item>
                        <SubMenu key="afterSale" title={<span><Icon type="mail" /><span>售后订单</span></span>}>
                            <Menu.Item key="untreated" onClick={()=>{
                                this.props.history.push("/order/afterSale");
                            }}>未处理</Menu.Item>
                            {/*<Menu.Item key="process" onClick={()=>{*/}
                                {/*this.props.history.push("/order/afterSale/process");*/}
                            {/*}}>处理中</Menu.Item>*/}
                            {/*<Menu.Item key="afterSaledone" onClick={()=>{*/}
                                {/*this.props.history.push("/order/afterSale/done");*/}
                            {/*}}>处理完成</Menu.Item>*/}
                        </SubMenu>
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