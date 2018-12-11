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
            current: this.props.location.pathname.split("/",3)[2]===""?"commodity":this.props.location.pathname.split("/",3)[2],
            commentCount:0
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
        this.fetchComments();
    }

    // 获取评论
    fetchComments() {
        client.search({
            index: 'comment',
            type: 'comment',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits.reduce((total, next) => {
                    if(next._score === 0||next.reply!==undefined){
                        return total;
                    }else{
                        return total+1;
                    }
                }, 0);
                this.setState({commentCount: value.length});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }
    render() {
        const {
            auth, // 管理员权限信息
            info, //管理员信息
            isLoading, // 是否加载中
        } = this.props;

        const{
            commentCount,
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
                        defaultOpenKeys={['comm','category']}
                        onClick={(e) => {
                            this.setState({
                                current: e.key
                            })
                        }}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <SubMenu key="comm" title={<span><Icon type="mail" /><span>商品信息</span></span>}>
                            <Menu.Item key="all" onClick={()=>{
                                this.props.history.push("/commodity/all");
                            }}>总览</Menu.Item>
                            <Menu.Item key="comment" onClick={()=>{
                                this.props.history.push("/commodity/comment");
                            }}>
                                <Badge count={commentCount} dot>新增评论</Badge>
                            </Menu.Item>

                        </SubMenu>

                        <SubMenu key="category" title={<span><Icon type="mail" /><span>类目信息</span></span>}>
                            <Menu.Item key="home" onClick={()=>{
                                this.props.history.push("/commodity/home");
                            }}>主页管理</Menu.Item>
                            <Menu.Item key="brand" onClick={()=>{
                                this.props.history.push("/commodity/brand");
                            }}>品牌管理</Menu.Item>
                            <Menu.Item key="unite" onClick={()=>{
                                this.props.history.push("/commodity/unite");
                            }}>联名管理</Menu.Item>
                            <Menu.Item key="series" onClick={()=>{
                                this.props.history.push("/commodity/series");
                            }}>系列管理</Menu.Item>
                            <Menu.Item key="type" onClick={()=>{
                                this.props.history.push("/commodity/type");
                            }}>类型管理</Menu.Item>
                            <Menu.Item key="quality" onClick={()=>{
                                this.props.history.push("/commodity/quality");
                            }}>品质管理</Menu.Item>
                            <Menu.Item key="size" onClick={()=>{
                                this.props.history.push("/commodity/size");
                            }}>尺码管理</Menu.Item>
                            <Menu.Item key="discount" onClick={()=>{
                                this.props.history.push("/commodity/discount");
                            }}>代金券管理</Menu.Item>
                            <Menu.Item key="express" onClick={()=>{
                                this.props.history.push("/commodity/express");
                            }}>快递管理</Menu.Item>
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