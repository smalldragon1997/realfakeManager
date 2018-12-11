import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import ShowImages from '../../../commom/showImages'
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {getManagerByFilter} from '../selector';
import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table, Tag, Select,Divider,Modal,Popconfirm} from 'antd';
import {getPayListByFilter} from '../selector';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Loadable from 'react-loadable';
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
            // 改价弹框
            theOrderId:undefined,
            price:undefined,
            visible:false,
        });
    }

    componentDidMount() {
        // 通过令牌去获取管理员列表
        const jwt = localStorage.getItem("RealFakeManagerJwt");
        if (jwt !== undefined || jwt !== null) {
            this.props.onFetchPays(jwt);
        }
    }

    render() {
        const {
            auth,
            info,
            payList, //  未付款订单列表
            isLoading, // 是否加载中
            onUpdatePrice, // 改价
            onDeletePays, // 删除订单
            onEditPay, // 编辑订单
            onFilter, // 过滤
            onReFilter, // 重置
        } = this.props;

        const {
            theOrderId,
            price,
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
            title: '创建时间',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '操作',
            dataIndex: 'actions',
            key: 'actions',
            render: (orderInfo) => (
                <span>
                    <Tag color="blue" key={orderInfo.orderId + "1"} onClick={() => {
                        this.setState({visible:true,theOrderId:orderInfo.orderId})
                    }}>改价</Tag>
                    <Tag color="blue" key={orderInfo.orderId + "2"} onClick={() => {
                        onEditPay(orderInfo);
                        this.props.history.push("/order/pay/info");
                    }}>详情</Tag>
                    <Popconfirm placement="top" title={"确定删除此未付款订单吗？"} onConfirm={()=>{
                        let orderIdList = [];
                        orderIdList.push(orderInfo.orderId+"");
                        onDeletePays(localStorage.getItem("RealFakeManagerJwt"),orderIdList);
                    }} okText="确认" cancelText="点错了">
                        <Tag color="red" key={orderInfo.orderId + "3"}>删除</Tag>
                    </Popconfirm>

                </span>
            ),
        }];

        // 表格数据
        let options = [];
        for (let i = 0; i < payList.length; i++) {
            options.push({
                key: payList[i].orderId,
                orderId: payList[i].orderId,
                commList: payList[i].commList,
                address: payList[i].address,
                message: payList[i].message,
                date: new Date(payList[i].date).Format("yyyy-MM-dd hh:mm:ss"),
                total: "￥"+payList[i].total,
                actions: payList[i],
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
                                {/*改价弹框*/}
                                <Modal
                                    // maskStyle={{opacity:0.1,backgroundColor:"#fff"}}
                                    title="改价"
                                    visible={visible}
                                    onOk={()=>{
                                        if(price<=0||price===undefined){
                                            message.error("价格不能为空或小于0")
                                        }else{
                                            onUpdatePrice(localStorage.getItem("RealFakeManagerJwt"),theOrderId,price);
                                            this.setState({visible:false,price:undefined,theOrderId:undefined})
                                        }
                                    }}
                                    onCancel={()=>{
                                        this.setState({visible:false,price:undefined,theOrderId:undefined})
                                    }}
                                >
                                    <Input placeholder={"请输入最终价格"} value={price} onChange={(e)=>{
                                        this.setState({price:e.target.value})
                                    }}/>
                                </Modal>

                                <Col>
                                    <Row type={"flex"} align={"middle"}  style={{padding: "3%",paddingBottom:10}}>
                                        <Col span={2}>
                                            <Popconfirm placement="top" title={"确定删除这"+selectedRowKeys.length+"个未付款订单吗？"} onConfirm={()=>{
                                                onDeletePays(localStorage.getItem("RealFakeManagerJwt"),selectedRowKeys);
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
                                        <Col span={13} style={{textAlign:"right",paddingRight:5}}>
                                            <RadioGroup
                                                style={{width:"100%"}}
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
                                                    onFilter(filter,key);
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
    const pay = state.order.pay;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        payList: getPayListByFilter(pay.payList,pay.filter,pay.key),
        isLoading: pay.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: (filter,key) => {
            dispatch(Actions.Start());
            dispatch(Actions.Filter(filter,key));
        },
        onReFilter: () => {
            dispatch(Actions.Start());
            dispatch(Actions.ReFilter());
        },
        onEditPay: (payInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.EditPay(payInfo));
        },
        onFetchPays: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(jwt));
        },
        onUpdatePrice: (jwt,orderId,price) => {
            dispatch(Actions.Start());
            dispatch(Actions.UpdatePrice(jwt,orderId,price));
        },
        onDeletePays: (jwt,orderIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeletePays(jwt,orderIdList));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));
