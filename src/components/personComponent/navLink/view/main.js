import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect,withRouter} from 'react-router-dom';

import {Menu, Icon, Row, Col, Avatar, Dropdown,Button,Badge} from 'antd';

const SubMenu = Menu.SubMenu;
class navLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            current: this.props.location.pathname.split("/",3)[2]===""?"info":this.props.location.pathname.split("/",3)[2],
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
                        defaultOpenKeys={['info','other']}
                        onClick={(e) => {
                            this.setState({
                                current: e.key
                            })
                        }}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <SubMenu key="info" title={<span><Icon type="mail" /><span>个人信息</span></span>}>
                            <Menu.Item key="info" onClick={()=>{
                                this.props.history.push("/person/info");
                            }}>我的资料</Menu.Item>
                        </SubMenu>
                        <SubMenu key="other" title={<span><Icon type="mail" /><span>其他</span></span>}>
                            <Menu.Item key="comment" onClick={()=>{
                                this.props.history.push("/person/comment");
                            }}>我回复的评论</Menu.Item>
                            {
                                info.isSuper?(
                                    <Menu.Item key="comments" onClick={()=>{
                                        this.props.history.push("/person/comment/all");
                                    }}>全部评论</Menu.Item>
                                ):null
                            }
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