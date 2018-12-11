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
            uniteList: [],
        });
    }

    componentDidMount() {

        //获取联名信息
        this.searchUnite(this.state.key);
    }


    // 搜索联名
    searchUnite(key) {
        if (key === "") {
            client.search({
                index: 'unite',
                type: 'unite',
                body: {
                    query: {
                        match_all: {}
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({uniteList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        } else {
            client.search({
                index: 'unite',
                type: 'unite',
                body: {
                    query: {
                        bool: {
                            should: [
                                {match: {uniteId: key}},
                                {match: {uniteName: key}},
                            ],
                        }
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({uniteList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
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
            uniteList,
            key
        } = this.state;

        const columns = [
            {
                title: '联名编号',
                dataIndex: 'uniteId',
                key: 'uniteId',
            }, {
                title: '联名封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '联名名',
                dataIndex: 'uniteName',
                key: 'uniteName',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: uniteInfo => (
                    <span>
            <Tag color="blue" key={uniteInfo.uniteId + "1"} onClick={() => {
                onEdit(uniteInfo.uniteId);
                this.props.history.push("/commodity/unite/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除联名 " + uniteInfo.uniteName + " 吗？"} onConfirm={() => {
                        let uniteIdList = [];
                        uniteIdList.push(uniteInfo.uniteId);
                        onDelete(uniteIdList);
                        let newUniteList = this.state.uniteList;
                        for (let i = 0; i < newUniteList.length; i++) {
                            if (newUniteList[i].uniteId === uniteInfo.uniteId) {
                                newUniteList.remove(i);
                                break;
                            }
                        }
                        this.setState({
                            uniteList: newUniteList
                        })
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={uniteInfo.uniteId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < uniteList.length; i++) {
            options.push({
                key: uniteList[i].uniteId,
                uniteId: uniteList[i].uniteId,
                cover: uniteList[i].cover,
                pictures: uniteList[i].pictures,
                uniteName: uniteList[i].uniteName,
                describe: uniteList[i].describe,
                actions: uniteList[i],
            })
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_category || info.isSuper) ? (
                            <Row>
                                <Col>
                                    {/*添加联名*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/unite/add");
                                        }}> + 添加联名</Button>
                                    </Row>
                                    {/*全选和搜索*/}
                                    <Row type={"flex"} align={"middle"}
                                         style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>
                                        <Col span={10}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个联名吗？"}
                                                        onConfirm={() => {
                                                            onDelete(selectedRowKeys);
                                                            let newUniteList = this.state.uniteList;
                                                            for (let j = 0; j < selectedRowKeys.length; j++) {
                                                                for (let i = 0; i < newUniteList.length; i++) {
                                                                    if (newUniteList[i].uniteId === selectedRowKeys[j]) {
                                                                        newUniteList.remove(i);
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            this.setState({
                                                                ...this.state,
                                                                uniteList: newUniteList,
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
                                                        style={{width: "100%"}} placeholder={"联名编号、名字"}
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
                                                            this.searchUnite(this.state.key);
                                                        }
                                                    }}>搜索</Button>
                                                </Col>
                                                <Col span={6}>
                                                    <Button
                                                        style={{width: "100%"}} onClick={() => {
                                                        this.setState({key:""});
                                                        this.searchUnite("")
                                                    }}>重置</Button>
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                    {/*表格数据*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            defaultExpandAllRows
                                            expandedRowRender={info =>
                                                <span style={{margin: 0}}>
                                                    <Row>
                                                    联名描述：
                                                        {info.describe}
                                                    </Row>
                                                    <Row>
                                                    联名图片：
                                                        {
                                                            info.pictures === undefined || info.pictures.length === 0 ? null : (
                                                                <ShowImages images={info.pictures} size={50}/>)
                                                        }
                                                    </Row>

                                                </span>}
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
    const unite = state.commodity.unite;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: unite.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (uniteIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(uniteIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (uniteId) => {
            dispatch(Actions.Edit(uniteId));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));