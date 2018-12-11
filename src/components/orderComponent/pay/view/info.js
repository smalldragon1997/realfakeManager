import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as UserActions from '../../../userComponent/all/actions';
import * as CommActions from '../../../commodityComponent/all/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import ShowImage from '../../../commom/showImage'
import {getManagerByManId} from '../selector';
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
    Tag,
    Divider,Popconfirm,Modal
} from 'antd';

const CheckboxGroup = Checkbox.Group;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            visible:false,
            price:undefined,
            theOrderId:undefined
        });
    }


    componentDidMount() {

    }

    render() {
        const {
            auth,
            info,
            payInfo,
            isLoading, // 是否加载中
            onDeletePays,
            onUpdatePrice,
            onEditUser,
            onEditComm
        } = this.props;

        const {
            theOrderId,
            price,
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
                    if (index < payInfo.commList.length) {
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
                    if (index < payInfo.commList.length) {
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
                    if (index < payInfo.commList.length) {
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
                    if (index < payInfo.commList.length) {
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
        if(payInfo!==undefined){
            const commList = payInfo.commList;
            for (let i = 0; i < commList.length; i++) {
                options.push({
                    key: commList[i].commId,
                    commId: commList[i].commId,
                    icon: commList[i].icon,
                    title: commList[i],
                    qualName: commList[i].qualName,
                    size: commList[i].size,
                    price: "￥"+commList[i].price,
                })
            }
            if(payInfo.express!==undefined){
                options.push({
                    key: -1,
                    commId: "快递",
                    icon: "",
                    title: "",
                    qualName: "",
                    size: payInfo.express.name,
                    price: "￥"+payInfo.express.price,
                })
            }
            if(payInfo.discount!==undefined){
                options.push({
                    key: -2,
                    commId: "优惠方式",
                    icon: "",
                    title: "",
                    qualName: "",
                    size: payInfo.discount.name,
                    price: "￥"+payInfo.discount.price,
                })
            }
            const express = payInfo.express.price===undefined?(0):(payInfo.express.price);
            const discount = payInfo.discount.price===undefined?(0):(payInfo.discount.price);
            const total = payInfo.commList.reduce((total,next)=>(total+next.price),0)+express-discount;
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
        return (
            <Spin spinning={isLoading}>
                {
                    payInfo === undefined ? (
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
                                        <Icon type="schedule" theme="outlined" /> 订单号：{payInfo.orderId}
                                    </Col>
                                    <Col span={6} style={{textAlign:"right"}}>
                                        <Popconfirm placement="top" title={"确定删除此未付款订单吗？"} onConfirm={()=>{
                                            let orderIdList = [];
                                            orderIdList.push(payInfo.orderId+"");
                                            onDeletePays(localStorage.getItem("RealFakeManagerJwt"),orderIdList);
                                            this.props.history.push("/order/pay");
                                        }} okText="确认" cancelText="点错了">
                                            <Button type={"danger"}>删除订单</Button>
                                        </Popconfirm>
                                        <Button type={"primary"} onClick={()=>{
                                            this.setState({visible:true})
                                        }}>改价</Button>
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
                                    </Col>
                                </Row>
                                <Row type={"flex"}  justify={"space-around"} style={{padding: "3%", paddingTop: 0,paddingBottom:0}}>
                                    <Col span={8}>
                                        <Row style={{padding:"2%",paddingLeft:"8%"}}>用户名:<a onClick={()=>{
                                            onEditUser(payInfo.userInfo.userId);
                                            this.props.history.push("/user/all/info");
                                        }}>{payInfo.userInfo.nickname}</a></Row>
                                        <Row  style={{padding:"2%",paddingLeft:"8%"}}>用户编号:{payInfo.userInfo.userId}</Row>
                                        <Row  style={{padding:"2%",paddingLeft:"8%"}}>交易编号:{payInfo.payId}</Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row style={{padding:"2%"}}>创建时间:{new Date(payInfo.date).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                        <Row style={{padding:"2%"}}>有效时间:{new Date(payInfo.date+24*60*60*1000).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Row style={{color:"#bfbfbf"}}>状态</Row>
                                                <Row style={{fontSize:20}}>待付款</Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row style={{color:"#bfbfbf"}}>订单金额</Row>
                                                <Row style={{fontSize:20}}>￥{payInfo.total}</Row>
                                            </Col>
                                        </Row>
                                        <Divider>收货信息</Divider>
                                        <Row>收件人:{payInfo.address.name}</Row>
                                        <Row>联系电话:{payInfo.address.tel}</Row>
                                        <Row>收货地址:{payInfo.address.area+" "+payInfo.address.detail}</Row>
                                        <Row>买家留言:{payInfo.message}</Row>
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
    const pay = state.order.pay;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        payInfo: pay.payInfo,
        isLoading: pay.isLoading
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));