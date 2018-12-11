import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import ShowImages from '../../../commom/showImages'
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
    Select,
    Divider,
    Modal,
    Popconfirm
} from 'antd';
import {getOrderListByFilter} from '../selector';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 搜索关键字
            filter: "orderId",
            key: undefined,
            // 列表复选
            selectedRowKeys: [],
            // 修改物流信息弹框
            theOrderId: undefined,
            expId: undefined,
            number: undefined,
            expMessage: undefined,
            visible: false,
        });
    }

    componentDidMount() {
        // 通过令牌去获取管理员列表
        const jwt = localStorage.getItem("RealFakeManagerJwt");
        if (jwt !== undefined || jwt !== null) {
            this.props.onFetchOrders(jwt);
            this.props.onFetchExpress(jwt);
        }
    }

    render() {
        const {
            auth,
            info,
            expressList, // 物流列表
            orderList, //  未付款订单列表
            isLoading, // 是否加载中
            onUpdateDeliver, // 修改物流信息
            onDeleteOrders, // 删除订单
            onEditOrder, // 编辑订单
            onFilter, // 过滤
            onReFilter, // 重置
        } = this.props;

        const {
            theOrderId, expId, number, expMessage,
            visible,
            filter,
            key,
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
            }, {
                title: '商品封面',
                dataIndex: 'commList',
                key: 'commList',
                render: commList => {
                    let pictures = [];
                    for(let i=0;i<commList.length;i++){
                        pictures.push(commList[i].cover);
                    }
                    return <ShowImages images={pictures} size={50}/>
                }
            }, {
                title: '订单价格',
                dataIndex: 'total',
                key: 'total',
            }, {
                title: '支付时间',
                dataIndex: 'payDate',
                key: 'payDate',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (orderInfo) => (
                    <span>
                    <Tag color="blue" key={orderInfo.orderId + "1"} onClick={() => {
                        this.setState({visible: true, theOrderId: orderInfo.orderId})
                    }}>修改物流</Tag>
                    <Tag color="blue" key={orderInfo.orderId + "2"} onClick={() => {
                        onEditOrder(orderInfo);
                        this.props.history.push("/order/take/info");
                    }}>详情</Tag>
                    <Popconfirm placement="top" title={"确定删除此待收货订单吗？"} onConfirm={() => {
                        let orderIdList = [];
                        orderIdList.push(orderInfo.orderId + "");
                        onDeleteOrders(localStorage.getItem("RealFakeManagerJwt"), orderIdList);
                    }} okText="确认" cancelText="点错了">
                        <Tag color="red" key={orderInfo.orderId + "3"}>删除</Tag>
                    </Popconfirm>

                </span>
                ),
            }];

        // 表格数据
        let options = [];
        for (let i = 0; i < orderList.length; i++) {
            options.push({
                key: orderList[i].orderId,
                orderId: orderList[i].orderId,
                address: orderList[i].address,
                commList: orderList[i].commList,
                name: orderList[i].express.name,
                message: orderList[i].message,
                number: orderList[i].number,
                deliverDate: new Date(orderList[i].deliverDate).Format("yyyy-MM-dd hh:mm:ss"),
                payDate: new Date(orderList[i].payDate).Format("yyyy-MM-dd hh:mm:ss"),
                total: "￥" + orderList[i].total,
                actions: orderList[i],
            })
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_order || info.isSuper) ? (
                            <Row>
                                {/*修改物流信息弹框*/}
                                <Modal
                                    title="修改物流信息"
                                    visible={visible}
                                    onOk={() => {
                                        if (expId === undefined || number === undefined) {
                                            message.error("请输入完整")
                                        } else {
                                            onUpdateDeliver(localStorage.getItem("RealFakeManagerJwt"), theOrderId, expId, number, expMessage);
                                            this.setState({
                                                visible: false,
                                                expId: undefined,
                                                number: undefined,
                                                expMessage: undefined, theOrderId: undefined
                                            })
                                        }
                                    }}
                                    onCancel={() => {
                                        this.setState({
                                            visible: false,
                                            expId: undefined,
                                            number: undefined,
                                            expMessage: undefined, theOrderId: undefined
                                        })
                                    }}
                                >
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                        <Col span={4}>
                                            物流公司：
                                        </Col>
                                        <Col span={20}>
                                            <Select placeholder={"请选择物流公司"} style={{width: "100%"}} onChange={(e) => {
                                                this.setState({expId: e})
                                            }}>
                                                {
                                                    expressList.map((item, index) => (
                                                        <Option value={item.expId} key={index}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                        <Col span={4}>
                                            快递单号：
                                        </Col>
                                        <Col span={20}>
                                            <Input placeholder={"请输入快递单号"} value={number} onChange={(e) => {
                                                this.setState({number: e.target.value})
                                            }}/>
                                        </Col>
                                    </Row>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                        <Col span={4}>
                                            发货说明：
                                        </Col>
                                        <Col span={20}>
                                            <Input placeholder={"请输入备注信息"} value={expMessage} onChange={(e) => {
                                                this.setState({expMessage: e.target.value})
                                            }}/>
                                        </Col>
                                    </Row>
                                </Modal>

                                <Col>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: 10}}>
                                        <Col span={2}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个未付款订单吗？"}
                                                        onConfirm={() => {
                                                            onDeleteOrders(localStorage.getItem("RealFakeManagerJwt"), selectedRowKeys);
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
                                        <Col span={13} style={{textAlign: "right"}}>
                                            <RadioGroup
                                                style={{width: "100%"}}
                                                onChange={(e) => {
                                                    this.setState({
                                                        ...this.state,
                                                        filter: e.target.value
                                                    })
                                                }} defaultValue="orderId">
                                                <RadioButton value="orderId">订单号</RadioButton>
                                                <RadioButton value="address">地址</RadioButton>
                                                <RadioButton value="nickname">用户名</RadioButton>
                                                <RadioButton value="userId">用户编号</RadioButton>
                                            </RadioGroup>
                                        </Col>
                                        <Col span={9}>
                                            <Input
                                                value={key}
                                                style={{width: "50%"}} placeholder={"搜索未付款订单"}
                                                onChange={(e) => {
                                                    this.setState({
                                                        ...this.state,
                                                        key: e.target.value
                                                    })
                                                }}/>
                                            <Button
                                                style={{width: "25%"}} type={"primary"} onClick={() => {
                                                if (key === undefined) {
                                                    message.error("请输入关键字");
                                                } else {
                                                    onFilter(filter, key);
                                                }
                                            }}>搜索</Button>

                                            <Button
                                                style={{width: "25%"}} onClick={() => {
                                                this.setState({
                                                    ...this.state,
                                                    key: undefined,
                                                });
                                                onReFilter()
                                            }}>重置</Button>
                                        </Col>

                                    </Row>

                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            defaultExpandAllRows
                                            expandedRowRender={orderInfo =>
                                                <span>
                                                    <Row style={{marginLeft:"5%"}}>
                                                        收货信息：{orderInfo.address.area + " " +
                                                    orderInfo.address.detail + " " + orderInfo.address.name + " " + orderInfo.address.tel}
                                                    </Row>
                                                    <Row style={{marginLeft:"5%"}}>
                                                        买家留言：{orderInfo.message}
                                                    </Row>
                                                    <Row style={{marginLeft:"5%"}}>
                                                        物流公司：{orderInfo.name} 快递单号:{orderInfo.number}  发货时间：{orderInfo.deliverDate}
                                                    </Row>
                                                </span>}
                                            style={{width: "100%"}}
                                            rowSelection={{
                                                selectedRowKeys,
                                                onChange: (selectedRowKeys) => {
                                                    this.setState({...this.state, selectedRowKeys});
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
    const take = state.order.take;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        expressList: take.expressList,
        orderList: getOrderListByFilter(take.orderList, take.filter, take.key),
        isLoading: take.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: (filter, key) => {
            dispatch(Actions.Start());
            dispatch(Actions.Filter(filter, key));
        },
        onReFilter: () => {
            dispatch(Actions.Start());
            dispatch(Actions.ReFilter());
        },
        onFetchOrders: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(jwt));
        },
        onFetchExpress: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchExpress(jwt));
        },
        onUpdateDeliver: (jwt, orderId, expId, number, expMessage) => {
            dispatch(Actions.Start());
            dispatch(Actions.UpdateDeliver(jwt, orderId, expId, number, expMessage));
        },
        onEditOrder: (orderInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Edit(orderInfo));
        },
        onDeleteOrders: (jwt, orderIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteOrders(jwt, orderIdList));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));