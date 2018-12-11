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
            disList: [],
        });
    }

    componentDidMount() {

        //获取代金卷信息
        this.searchDiscount(this.state.key);
    }


    // 搜索代金卷
    searchDiscount(key) {
        if (key === "") {
            client.search({
                index: 'discount',
                type: 'discount',
                body: {
                    query: {
                        match_all: {}
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({disList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        } else {
            client.search({
                index: 'discount',
                type: 'discount',
                body: {
                    query: {
                        bool: {
                            should: [
                                {match: {disId: key}},
                                {match: {disName: key}},
                            ],
                        }
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({disList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
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
            disList,
            key
        } = this.state;

        const columns = [
            {
                title: '代金卷编号',
                dataIndex: 'disId',
                key: 'disId',
            }, {
                title: '代金卷封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '代金卷名',
                dataIndex: 'disName',
                key: 'disName',
            }, {
                title: '代金卷价格',
                dataIndex: 'price',
                key: 'price',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: disInfo => (
                    <span>
            <Tag color="blue" key={disInfo.disId + "1"} onClick={() => {
                onEdit(disInfo.disId);
                this.props.history.push("/commodity/discount/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除代金卷 " + disInfo.disName + " 吗？"} onConfirm={() => {
                        let disIdList = [];
                        disIdList.push(disInfo.disId);
                        onDelete(disIdList);
                        let newDisList = this.state.disList;
                        for (let i = 0; i < newDisList.length; i++) {
                            if (newDisList[i].disId === disInfo.disId) {
                                newDisList.remove(i);
                                break;
                            }
                        }
                        this.setState({
                            disList: newDisList
                        })
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={disInfo.disId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < disList.length; i++) {
            options.push({
                key: disList[i].disId,
                disId: disList[i].disId,
                cover: disList[i].cover,
                price: disList[i].price,
                disName: disList[i].disName,
                actions: disList[i],
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
                                    {/*添加代金卷*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/discount/add");
                                        }}> + 添加代金卷</Button>
                                    </Row>
                                    {/*全选和搜索*/}
                                    <Row type={"flex"} align={"middle"}
                                         style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>
                                        <Col span={10}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个代金卷吗？"}
                                                        onConfirm={() => {
                                                            onDelete(selectedRowKeys);
                                                            let newDisList = this.state.disList;
                                                            for (let j = 0; j < selectedRowKeys.length; j++) {
                                                                for (let i = 0; i < newDisList.length; i++) {
                                                                    if (newDisList[i].disId === selectedRowKeys[j]) {
                                                                        newDisList.remove(i);
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            this.setState({
                                                                ...this.state,
                                                                disList: newDisList,
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
                                                        style={{width: "100%"}} placeholder={"代金卷编号、名字"}
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
                                                            this.searchBrand(this.state.key);
                                                        }
                                                    }}>搜索</Button>
                                                </Col>
                                                <Col span={6}>
                                                    <Button
                                                        style={{width: "100%"}} onClick={() => {
                                                        this.setState({key:""});
                                                        this.searchDiscount("")
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
    const discount = state.commodity.discount;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: discount.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (disIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(disIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (disId) => {
            dispatch(Actions.Edit(disId));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));