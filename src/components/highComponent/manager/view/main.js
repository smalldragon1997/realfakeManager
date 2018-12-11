import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {getManagerByFilter} from '../selector';
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
    Select,
    Divider,
    Popconfirm
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 过滤条件
            filter: "nickname",
            // 关键字
            key: undefined,
            // 过滤是否禁用
            isForbidden: undefined,
            // 列表复选
            selectedRowKeys: [],
        });
    }

    componentDidMount() {
        // 通过令牌去获取管理员列表
        const jwt = localStorage.getItem("RealFakeManagerJwt");
        if (jwt !== undefined || jwt !== null) {
            this.props.onFetchManagers(jwt);
        }
    }

    render() {
        const {
            info,//  当前给管理员信息
            auth, // 权限
            managerList, // 管理员列表
            isLoading, // 是否加载中
            onDelManager, // 删除管理员
            onDelManagers, // 删除多个管理员
            onForbiddenManager, //禁用管理员
            onForbiddenManagers, // 禁用多个管理员
            onCancelForbiddenManager, // 取消禁用管理员
            onCancelForbiddenManagers, // 取消禁用多个管理员
            onFilterManagers, // 筛选管理员
            onReFilterManagers,// 重置筛选条件
            onEditManager, // 编辑管理员
        } = this.props;

        const {
            filter,
            key,
            isForbidden,
            selectedRowKeys,
        } = this.state;


        // 表格数据绑定表头
        const columns = [
            {
                title: '管理员编号',
                dataIndex: 'manId',
                key: 'manId',
            }, {
                title: '昵称',
                dataIndex: 'nickname',
                key: 'nickname',
            }, {
                title: '状态',
                dataIndex: 'state',
                render: isForbidden => (isForbidden ? ("禁用") : ("可用")),
                key: 'state',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: manager => (<span>
            <Tag color="blue" key={manager.manId + "1"} onClick={() => {
                // 查看管理员信息
                onEditManager(manager.manId);
                // 跳转
                this.props.history.push("/high/manager/info");
            }}>编辑</Tag>
                    {
                        manager.isForbidden ? (
                            <Tag color="grey" key={manager.manId + "2"} onClick={() => {
                                // 取消禁用管理员
                                onCancelForbiddenManager(manager.manId)
                            }}>取消禁用</Tag>
                        ) : (
                            <Tag color="grey" key={manager.manId + "2"} onClick={() => {
                                // 禁用管理员
                                onForbiddenManager(manager.manId)
                            }}>禁用</Tag>
                        )
                    }
                    <Popconfirm placement="top" title={"确定删除管理员 " + manager.nickname + " 吗？"} onConfirm={() => {
                        // 删除管理员
                        onDelManager(manager.manId)
                    }} okText="确认" cancelText="点错了">

                    <Tag color="red" key={manager.manId + "3"}>删除</Tag>
                    </Popconfirm>
        </span>),
            }];
        // 表格数据填充
        let options = [];
        for (let i = 0; i < managerList.length; i++) {
            options.push({
                key: managerList[i].manId,
                manId: managerList[i].manId,
                nickname: managerList[i].nickname,
                state: managerList[i].isForbidden,
                actions: managerList[i],
            })
        }

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
                                    {/*添加管理员*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingBottom:"1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            // 跳转
                                            this.props.history.push("/high/manager/add");
                                        }}> + 添加管理员</Button>
                                    </Row>
                                    {/*批量操作和过滤条件*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0,paddingBottom:"1%"}}>
                                        <Col span={6}>
                                            <Button type={"primary"} onClick={() => {
                                                // 禁用多个管理员
                                                onForbiddenManagers(selectedRowKeys);
                                                this.setState({
                                                    ...this.state,
                                                    selectedRowKeys: []
                                                });
                                            }}
                                                    loading={isLoading}
                                                    disabled={!selectedRowKeys.length > 0}
                                            >禁用</Button>
                                            <Button onClick={() => {
                                                // 取消禁用多个管理员
                                                onCancelForbiddenManagers(selectedRowKeys);
                                                this.setState({
                                                    ...this.state,
                                                    selectedRowKeys: []
                                                });
                                            }}
                                                    loading={isLoading}
                                                    disabled={!selectedRowKeys.length > 0}
                                            >取消禁用</Button>

                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个管理员吗？"}
                                                        onConfirm={() => {
                                                            // 删除多个管理员
                                                            onDelManagers(selectedRowKeys);
                                                            this.setState({
                                                                ...this.state,
                                                                selectedRowKeys: []
                                                            });
                                                        }} okText="确认" cancelText="点错了">
                                                <Button type={"danger"}
                                                        loading={isLoading}
                                                        disabled={!selectedRowKeys.length > 0}
                                                >删除</Button>
                                            </Popconfirm>

                                        </Col>
                                        <Col span={18}>
                                            <Row>
                                                <Col span={10}
                                                     style={{textAlign: "right",paddingRight:5}}>
                                                    <RadioGroup
                                                        onChange={(e) => {
                                                            this.setState({
                                                                ...this.state,
                                                                filter: e.target.value
                                                            })
                                                        }} defaultValue="nickname">
                                                        <RadioButton value="nickname">昵称</RadioButton>
                                                        <RadioButton value="manId">编号</RadioButton>
                                                    </RadioGroup>
                                                </Col>
                                                <Col span={3} style={{paddingRight:5}}>
                                                    <Select
                                                        defaultValue={undefined}
                                                        placeholder={"状态"} style={{width: "100%"}} onChange={(e) => {
                                                        this.setState({
                                                            isForbidden: e
                                                        });
                                                        // 过滤是否禁用的管理员
                                                        onFilterManagers(filter, key, e)
                                                    }}>
                                                        <Option value={undefined} key={1}>全部</Option>
                                                        <Option value={true} key={2}>已禁用</Option>
                                                        <Option value={false} key={3}>可用</Option>
                                                    </Select>
                                                </Col>
                                                <Col span={5} style={{paddingRight:5}}>
                                                    <Input
                                                        value={key}
                                                        style={{width: "100%"}} placeholder={"搜索管理员"} onChange={(e) => {
                                                        this.setState({
                                                            ...this.state,
                                                            key: e.target.value
                                                        })
                                                    }}/>
                                                </Col>
                                                <Col span={3} style={{paddingRight:5}}>
                                                    <Button
                                                        style={{width: "100%"}} type={"primary"} onClick={() => {
                                                        if (key === undefined) {
                                                            message.error("请输入关键字");
                                                        } else {
                                                            // 过滤条件搜索管理员
                                                            onFilterManagers(filter, key, isForbidden)
                                                        }
                                                    }}>搜索</Button>
                                                </Col>
                                                <Col span={3}>
                                                    <Button
                                                        style={{width: "100%"}} onClick={() => {
                                                        this.setState({
                                                            ...this.state,
                                                            key: undefined,
                                                            isForbidden: undefined
                                                        });
                                                        // 重置过滤条件
                                                        onReFilterManagers()
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
                        )
                    )
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const manager = state.high.manager;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        managerList: getManagerByFilter(manager.managerList, manager.filter, manager.key, manager.isForbidden),
        isLoading: manager.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchManagers: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(jwt));
        },
        onDelManager: (manId) => {
            let manIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.DelManager(manIdList.concat(manId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onDelManagers: (manIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DelManager(manIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onForbiddenManager: (manId) => {
            let manIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.ForbidManager(manIdList.concat(manId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onForbiddenManagers: (manIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.ForbidManager(manIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onCancelForbiddenManager: (manId) => {
            let manIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.CanCelForbidManager(manIdList.concat(manId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onCancelForbiddenManagers: (manIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.CanCelForbidManager(manIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onFilterManagers: (filter, key, isForbidden) => {
            dispatch(Actions.Start());
            dispatch(Actions.Filter(filter, key, isForbidden));
        },
        onReFilterManagers: () => {
            dispatch(Actions.Start());
            dispatch(Actions.ReFilter());
        },
        onEditManager: (manId) => {
            dispatch(Actions.EditManager(manId));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));