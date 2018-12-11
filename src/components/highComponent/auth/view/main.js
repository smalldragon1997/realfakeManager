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

// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 列表复选
            selectedRowKeys: [],
            auths: []
        });
    }

    componentDidMount() {
        this.fetchAuth();
    }


    // 获取权限
    fetchAuth() {
        this.props.onStart();
        client.search({
            index: 'auth',
            type: 'auth',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({auths: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );

        this.props.onSuccess();
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            isLoading, // 是否加载中
            onDelAuth, // 删除权限
            onDelAuths, // 删除多个权限
            onEditAuth, // 编辑权限
        } = this.props;

        const {
            auths, // 管理员列表
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '权限编号',
                dataIndex: 'authId',
                key: 'authId',
            }, {
                title: '权限名',
                dataIndex: 'authName',
                key: 'authName',
            }, {
                title: '权限描述',
                dataIndex: 'describe',
                key: 'describe',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: auth => (
                    <span>
            <Tag color="blue" key={auth.authId + "1"} onClick={() => {
                onEditAuth(auth.authId);
                this.props.history.push("/high/auth/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除权限 " + auth.authName + " 吗？"} onConfirm={() => {
                        onDelAuth(auth.authId);
                        let newAuthList = auths;
                        for (let i = 0; i < newAuthList.length; i++) {
                            if (newAuthList[i].authId === auth.authId) {
                                newAuthList.remove(i);
                                break;
                            }
                        }
                        this.setState({
                            auths: newAuthList
                        })
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={auth.authId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < auths.length; i++) {
            options.push({
                key: auths[i].authId,
                authId: auths[i].authId,
                authName: auths[i].authName,
                describe: auths[i].describe,
                actions: auths[i],
            })
        }
        console.log(isLoading)
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        !info.isSuper ? (
                            <Divider>权限不足</Divider>
                        ) : (
                            <Row>
                                <Col>

                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/high/auth/add");
                                        }}> + 添加权限</Button>
                                    </Row>
                                    <Row type={"flex"} align={"middle"}
                                         style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>
                                        <Col span={10}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个权限吗？"}
                                                        onConfirm={() => {
                                                            onDelAuths(selectedRowKeys);
                                                            let newAuthList = auths;
                                                            for (let j = 0; j < selectedRowKeys.length; j++) {
                                                                for (let i = 0; i < newAuthList.length; i++) {
                                                                    if (newAuthList[i].authId === selectedRowKeys[j]) {
                                                                        newAuthList.remove(i);
                                                                        break;
                                                                    }
                                                                }
                                                                this.setState({
                                                                    ...this.state,
                                                                    auths: newAuthList,
                                                                    selectedRowKeys: []
                                                                });
                                                            }
                                                        }
                                                        } okText="确认" cancelText="点错了">
                                                <Button type={"danger"}
                                                        loading={isLoading}
                                                        disabled={!selectedRowKeys.length > 0}
                                                >删除</Button>
                                            </Popconfirm>

                                        </Col>
                                    </Row>
                                    <Row type={"flex"} align={"middle"} style={{
                                        padding: "3%",
                                        paddingTop: 0
                                    }}>
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
        auth: navLink.auth,
        info: navLink.info,
        isLoading: auth.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onStart: () => {
            dispatch(Actions.Start());
        },
        onSuccess: () => {
            dispatch(Actions.Success());
        },
        onFetchAuths: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(localStorage.getItem("RealFakeManagerJwt")));
        },
        onDelAuth: (authId) => {
            let authIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.DelAuth(authIdList.concat(authId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onDelAuths: (authIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DelAuth(authIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEditAuth: (authId) => {
            dispatch(Actions.EditAuth(authId));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));