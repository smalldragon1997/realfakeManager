import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {
    Menu,
    Icon,
    Row,
    Col,
    Avatar,
    Dropdown,
    Spin,
    Button,
    Radio,
    Input,
    message,
    Table,
    Tag,
    Divider,
    Popconfirm
} from 'antd';
import ShowImage from '../../../commom/showImage';
import ShowImages from '../../../commom/showImages';

// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 搜索条件
            key: "",
            // 列表复选
            selectedRowKeys: [],
            //
            userList: [],
        });
    }

    componentDidMount() {

        //获取用户信息
        this.searchUser(this.state.key);
    }


    // 搜索用户
    searchUser(key) {
        if (key === "") {
            client.search({
                index: 'user_info',
                type: 'user_info',
                body: {
                    query: {
                        match_all: {}
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({userList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        } else {
            client.search({
                index: 'user_info',
                type: 'user_info',
                body: {
                    query: {
                        bool: {
                            should: [
                                {match: {userId: key}},
                                {match: {nickname: key}},
                            ],
                        }
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({userList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
        } = this.props;

        const {
            selectedRowKeys,
            userList,
            key
        } = this.state;

        const columns = [
            {
                title: '用户编号',
                dataIndex: 'userId',
                key: 'userId',
            }, {
                title: '头像',
                dataIndex: 'icon',
                key: 'icon',
                render: icon => <ShowImage image={icon} size={50}/>
            }, {
                title: '用户名',
                dataIndex: 'nickname',
                key: 'nickname',
            }, {
                title: '注册时间',
                dataIndex: 'createDate',
                key: 'createDate',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: userInfo => (
                    <span>
            <Tag color="blue" key={userInfo.userId + "1"} onClick={() => {
                onEdit(userInfo.userId);
                this.props.history.push("/user/all/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除用户 " + userInfo.nickname + " 吗？"} onConfirm={() => {
                        let userIdList = [];
                        userIdList.push(userInfo.userId);
                        onDelete(userIdList);
                        let newUserList = this.state.userList;
                        for (let i = 0; i < newUserList.length; i++) {
                            if (newUserList[i].userId === userInfo.userId) {
                                newUserList.remove(i);
                                break;
                            }
                        }
                        this.setState({
                            userList: newUserList
                        })
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={userInfo.userId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < userList.length; i++) {
            options.push({
                key: userList[i].userId,
                userId: userList[i].userId,
                createDate: new Date(userList[i].createDate).Format("yyyy-MM-dd hh:mm:ss"),
                icon: userList[i].icon,
                nickname: userList[i].nickname,
                actions: userList[i],
            })
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_user || info.isSuper) ? (
                            <Row>
                                <Col>
                                    {/*全选和搜索*/}
                                    <Row type={"flex"} align={"middle"}
                                         style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Col span={10}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个用户吗？"}
                                                        onConfirm={() => {
                                                            onDelete(selectedRowKeys);
                                                            let newUserList = this.state.userList;
                                                            for (let j = 0; j < selectedRowKeys.length; j++) {
                                                                for (let i = 0; i < newUserList.length; i++) {
                                                                    if (newUserList[i].userId === selectedRowKeys[j]) {
                                                                        newUserList.remove(i);
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            this.setState({
                                                                ...this.state,
                                                                userList: newUserList,
                                                                selectedRowKeys: []
                                                            });
                                                        }} okText="确认" cancelText="点错了">
                                                <Button type={"danger"}
                                                        loading={isLoading}
                                                        disabled={!selectedRowKeys.length > 0}
                                                >删除</Button>
                                            </Popconfirm>

                                        </Col>
                                        <Col span={14} style={{textAlign: "right"}}>
                                            <Row type={"flex"} align={"middle"}>
                                                <Col span={12} style={{paddingRight:5}}>
                                                    <Input
                                                        value={key}
                                                        style={{width: "100%"}} placeholder={"用户编号、名字"}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                ...this.state,
                                                                key: e.target.value
                                                            })
                                                        }}/>
                                                </Col>
                                                <Col span={6} style={{paddingRight:5}}>
                                                    <Button
                                                        style={{width: "100%"}} type={"primary"} onClick={() => {
                                                        if (key === "") {
                                                            message.error("请输入关键字");
                                                        } else {
                                                            this.searchUser(this.state.key);
                                                        }
                                                    }}>搜索</Button>
                                                </Col>
                                                <Col span={6}>
                                                    <Button
                                                        style={{width: "100%"}} onClick={() => {
                                                        this.setState({key:""});
                                                        this.searchUser("")
                                                    }}>重置</Button>
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                    {/*表格数据*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            style={{width: "100%"}}
                                            rowSelection={{
                                                selectedRowKeys,
                                                onChange: (selectedRowKeys) => {
                                                    this.setState({...this.state, selectedRowKeys});
                                                    console.log(this.state.selectedRowKeys)
                                                },
                                            }} columns={columns} dataSource={options}/>
                                    </Row>
                                </Col>
                            </Row>
                        ) : (
                            <Divider>权限不足</Divider>
                        )
                    )
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const all = state.user.all;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: all.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (userIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(userIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (userId) => {
            dispatch(Actions.Edit(userId));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));