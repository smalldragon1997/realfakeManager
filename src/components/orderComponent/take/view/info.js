import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as UserActions from '../../../userComponent/all/actions';
import * as CommActions from '../../../commodityComponent/all/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import ShowImage from '../../../commom/showImage'
import {
    Menu,
    Icon,
    Row,
    Col,
    Avatar,
    Dropdown,
    Spin,
    Button,
    Checkbox,
    Input,
    message,
    Table,
    Tag,Select,
    Divider,Popconfirm,Modal
} from 'antd';
import order from "../../../../containers/order/view/order";

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            visible:false,
            expId:undefined,
            number:undefined,
            expMessage:undefined,
            theOrderId:undefined
        });
    }


    componentDidMount() {
        this.props.onFetchExpress(localStorage.getItem("RealFakeManagerJwt"));
    }

    render() {
        const {
            auth,
            info,
            expressList,
            orderInfo,
            isLoading, // 是否加载中
            onFetchExpress,
            onUpdateDeliver,
            onDeleteOrders,
            onEditUser,
            onEditComm
        } = this.props;

        const{
            theOrderId,expId,number,expMessage,
            visible
        } = this.state;

        const columns = [
            {
                title: '商品编号',
                dataIndex: 'commId',
                key: 'commId',
                render: (text, row, index) => {
                    return <span>{text}</span>;
                },
            }, {
                title: '商品图片',
                dataIndex: 'icon',
                key: 'icon',
                render: (icon, row, index) => {
                    if (index < orderInfo.commOrderList.length) {
                        return <ShowImage image={icon} size={70}/>;
                    }
                    return {
                        children: "",
                    };
                },
            }, {
                title: '商品名称',
                dataIndex: 'title',
                key: 'title',
                render: (commodity, row, index) => {
                    if (index < orderInfo.commOrderList.length) {
                        return <a onClick={()=>{
                            onEditComm(commodity.commId);
                            this.props.history.push("/commodity/all/info");
                        }}>{commodity.title}</a>;
                    }
                    return {
                        children: "",
                    };
                },
            }, {
                title: '品质',
                dataIndex: 'qualName',
                key: 'qualName',
                render: (qualName, row, index) => {
                    if (index < orderInfo.commOrderList.length) {
                        return qualName;
                    }
                    return {
                        children: "",
                    };
                },
            }, {
                title: '尺码',
                dataIndex: 'size',
                key: 'size',
                render: (size, row, index) => {
                    if (index < orderInfo.commOrderList.length) {
                        return size;
                    }
                    return {
                        children: size,
                    };
                },
            }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (price, row, index) => {
                    return <span>{price}</span>;
                },
            }];

        // 表格数据
        let options = [];
        if(orderInfo!==undefined){
            const commOrderList = orderInfo.commOrderList;
            for (let i = 0; i < commOrderList.length; i++) {
                options.push({
                    key: commOrderList[i].commodity.commId,
                    commId: commOrderList[i].commodity.commId,
                    icon: commOrderList[i].cover,
                    title: commOrderList[i],
                    qualName: commOrderList[i].qualName,
                    size: commOrderList[i].size,
                    price: "￥"+commOrderList[i].price,
                })
            }
            if(orderInfo.express!==undefined){
                options.push({
                    key: -1,
                    commId: "快递",
                    icon: "",
                    title: "",
                    qualName: "",
                    size: orderInfo.express.expName,
                    price: "￥"+orderInfo.express.price,
                })
            }
            if(orderInfo.discount!==undefined){
                options.push({
                    key: -2,
                    commId: "优惠方式",
                    icon: "",
                    title: "",
                    qualName: "",
                    size: orderInfo.discount===null?null:orderInfo.discount.disName,
                    price: orderInfo.discount===null?"无代金卷":"￥"+orderInfo.discount.price,
                })
            }
            // const express = orderInfo.express.price===undefined?(0):(orderInfo.express.price);
            // const discount = orderInfo.discount.price===undefined?(0):(orderInfo.discount.price);
            // const total = orderInfo.commList.reduce((total,next)=>(total+next.price),0)+express-discount;
            const total = orderInfo.total
            options.push({
                key: -3,
                commId: "总计",
                icon: "",
                title: "",
                qualName: "",
                size: "",
                price: "￥"+(total)
            })
        }
        console.log(orderInfo)
        return (
            <Spin spinning={isLoading}>
                {
                    orderInfo === undefined ? (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>参数错误请重新操作</Divider>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingBottom: 0}}>
                                    <Divider>订单基本信息</Divider>
                                </Row>
                                {/*订单创建信息*/}
                                <Row type={"flex"} align={"middle"} justify={"space-between"} style={{padding: "3%", paddingTop: 0,paddingBottom:"1%"}}>

                                    <Col span={6} style={{textAlign: "left",fontSize:20,fontWeight:"bold"}}>
                                        <Icon type="schedule" theme="outlined" /> 订单号：{orderInfo.orderId}
                                    </Col>
                                    <Col span={6} style={{textAlign:"right"}}>
                                        <Popconfirm placement="top" title={"确定删除此未付款订单吗？"} onConfirm={()=>{
                                            onDeleteOrders(orderInfo.orderId,info.manId);
                                            this.props.history.push("/order/take");
                                        }} okText="确认" cancelText="点错了">
                                            <Button type={"danger"}>删除订单</Button>
                                        </Popconfirm>
                                    </Col>
                                </Row>
                                <Row type={"flex"}  justify={"space-around"} style={{padding: "3%", paddingTop: 0,paddingBottom:0}}>
                                    <Col span={10}>
                                        <Row style={{padding:"2%",paddingLeft:"8%"}}>用户名:<a onClick={()=>{
                                            onEditUser(orderInfo.userInfo.userId);
                                            this.props.history.push("/user/all/info");
                                        }}>{orderInfo.userInfo.nickname}</a></Row>
                                        <Row  style={{padding:"2%",paddingLeft:"8%"}}>用户编号:{orderInfo.userInfo.userId}</Row>
                                        <Row  style={{padding:"2%",paddingLeft:"8%"}}>交易编号:{orderInfo.payId}</Row>
                                    </Col>
                                    <Col span={7}>
                                        <Row style={{padding:"2%"}}>创建时间:{new Date(orderInfo.date).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                        <Row style={{padding:"2%"}}>支付时间:{new Date(orderInfo.payDate).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                        <Row style={{padding:"2%"}}>发货时间:{new Date(orderInfo.deliverDate).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                    </Col>
                                    <Col span={7}>
                                        <Row>
                                            <Col span={12}>
                                                <Row style={{color:"#bfbfbf"}}>状态</Row>
                                                <Row style={{fontSize:20}}>待收货</Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row style={{color:"#bfbfbf"}}>订单金额</Row>
                                                <Row style={{fontSize:20}}>￥{orderInfo.total}</Row>
                                            </Col>
                                        </Row>
                                        <Divider>收货信息</Divider>
                                        <Row>收件人:{orderInfo.address.name}</Row>
                                        <Row>联系电话:{orderInfo.address.tel}</Row>
                                        <Row>收货地址:{orderInfo.address.area+" "+orderInfo.address.detail}</Row>
                                        <Row>买家留言:{orderInfo.message}</Row>
                                    </Col>
                                </Row>
                                {/*物流信息*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingBottom: 0,paddingTop: 0}}>
                                    <Divider>物流信息</Divider>
                                </Row>
                                <Row type={"flex"}  justify={"space-around"} style={{padding: "3%", paddingTop: 0,paddingBottom:0}}>
                                    <Col span={8}>
                                        <Row style={{padding:"2%",paddingLeft:"8%"}}>物流公司:{orderInfo.express.expName}</Row>
                                        <Row  style={{padding:"2%",paddingLeft:"8%"}}>发货留言:{orderInfo.expMessage}</Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row style={{padding:"2%"}}>单号:{orderInfo.number}</Row>
                                        <Row style={{padding:"2%"}}>发货管理员:{orderInfo.deliverManagerInfo.nickname}</Row>
                                    </Col>
                                    <Col span={8} style={{textAlign:"right"}}>
                                        <Button type={"primary"} onClick={()=>{
                                            this.setState({visible:true})
                                        }}>修改物流信息</Button>
                                        {/*修改物流弹框*/}
                                        <Modal
                                            // maskStyle={{opacity:0.1,backgroundColor:"#fff"}}
                                            title="修改物流信息"
                                            visible={visible}
                                            onOk={()=>{
                                                if(expId===undefined||number===undefined){
                                                    message.error("请输入完整")
                                                }else{
                                                    onUpdateDeliver({
                                                        orderId:orderInfo.orderId,
                                                        expId:expId,
                                                        number:number,
                                                        expMessage:expMessage,
                                                        manId:info.manId,
                                                    });
                                                    this.setState({visible:false,
                                                        expId:undefined,
                                                        number:undefined,
                                                        expMessage:undefined,theOrderId:undefined});
                                                }
                                            }}
                                            onCancel={()=>{
                                                this.setState({visible:false,
                                                    expId:undefined,
                                                    number:undefined,
                                                    expMessage:undefined,theOrderId:undefined})
                                            }}
                                        >
                                            <Row type={"flex"} align={"middle"} style={{padding:"3%"}}>
                                                <Col span={4}>
                                                    物流公司：
                                                </Col>
                                                <Col span={20}>
                                                    <Select placeholder={"请选择物流公司"} style={{width:"100%"}} onChange={(e)=>{
                                                        this.setState({expId:e})
                                                    }}>
                                                        {
                                                            expressList.map((item,index)=>(
                                                                <Option value={item.expId} key={index}>{item.expName}</Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row type={"flex"} align={"middle"} style={{padding:"3%"}}>
                                                <Col span={4}>
                                                    快递单号：
                                                </Col>
                                                <Col span={20}>
                                                    <Input placeholder={"请输入快递单号"} value={number} onChange={(e)=>{
                                                        this.setState({number:e.target.value})
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
                                    </Col>
                                </Row>
                                {/*商品信息*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingBottom: 0,paddingTop: 0}}>
                                    <Divider>商品信息</Divider>
                                </Row>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingTop: 0}}>
                                    <Table
                                        pagination={false}
                                        style={{width: "100%"}}
                                        columns={columns}
                                        dataSource={options}/>
                                </Row>

                            </Col>
                        </Row>
                    )
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const express = state.commodity.express;
    const take = state.order.take;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        expressList:express.expressList,
        orderInfo: take.orderInfo,
        isLoading: take.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onEditUser:(userId)=>{
            dispatch(UserActions.Edit(userId));
        },
        onEditComm:(commId)=>{
            dispatch(CommActions.Edit(commId));
        },
        onFetchExpress: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchExpress(jwt));
        },
        onUpdateDeliver: (info) => {
            dispatch(Actions.Start());
            dispatch(Actions.UpdateDeliver(localStorage.getItem("RealFakeManagerJwt"),info));
            setTimeout(()=>dispatch(Actions.FetchOrderInfo(info.orderId,localStorage.getItem("RealFakeManagerJwt"))),2000)
        },
        onDeleteOrders: (orderId,manId) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteOrders(localStorage.getItem("RealFakeManagerJwt"),orderId));
            setTimeout(()=>dispatch(Actions.Fetching(manId,localStorage.getItem("RealFakeManagerJwt"))),2000)
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));