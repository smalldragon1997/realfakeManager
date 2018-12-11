import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as UserActions from '../../../userComponent/all/actions';
import * as CommActions from '../../../commodityComponent/all/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import ShowImage from '../../../commom/showImage'
import ShowImages from '../../../commom/showImages'
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
    Tag, Select,
    Divider, Popconfirm, Modal, Upload, Timeline
} from 'antd';
import order from "../../../../containers/order/view/order";

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            visibleAgreeSingle: false,
            aftId: undefined,
            visibleDisAgreeSingle: false,
            visibleClose: false,
            message: undefined,
            fileList: [],
        });
    }


    componentDidMount() {
    }

    render() {
        const {
            auth,
            info,
            afterSaleInfo,
            isLoading, // 是否加载中
            onDeleteAfterSales,
            AgreeAfterSales,
            onDisAgreeAfterSales,
            onCloseAfterSales,
            onEditUser,
            onEditComm
        } = this.props;

        const {
            visibleClose,
            visibleAgreeSingle,
            visibleDisAgreeSingle,
            message,
            fileList,
            aftId
        } = this.state;

        const columns = [
            {
                title: '商品编号',
                dataIndex: 'commId',
                key: 'commId',
                render: (text) => (<span>{text}</span>),
            }, {
                title: '商品图片',
                dataIndex: 'icon',
                key: 'icon',
                render: (icon) => (<ShowImage image={icon} size={70}/>)
            }, {
                title: '商品名称',
                dataIndex: 'title',
                key: 'title',
                render: (commodity) => (<a onClick={()=>{
                    onEditComm(commodity.commId);
                    this.props.history.push("/commodity/all/info");
                }}>{commodity.title}</a>)
                ,
            }, {
                title: '品质',
                dataIndex: 'qualName',
                key: 'qualName',
                render: (qualName) => (qualName),
            }, {
                title: '尺码',
                dataIndex: 'size',
                key: 'size',
                render: (size) => (size),
            }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (price) => (price),
            }];

        // 表格数据
        let options = [];
        if (afterSaleInfo !== undefined) {
            const commodity = afterSaleInfo.commodity;
            options.push({
                key: commodity.commId,
                commId: commodity.commId,
                icon: commodity.icon,
                title: commodity,
                qualName: commodity.qualName,
                size: commodity.size,
                price: "￥" + commodity.price,
            });
        }
        return (
            <Spin spinning={isLoading}>
                {
                    afterSaleInfo === undefined ? (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>参数错误请重新操作</Divider>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Modal
                                title="售后寄回说明"
                                visible={visibleAgreeSingle}
                                onOk={() => {
                                    if (this.state.message === undefined) {
                                        message.error("请输入完整")
                                    } else {
                                        let aftIdList = [];
                                        aftIdList.push(aftId + "");
                                        AgreeAfterSales(localStorage.getItem("RealFakeManagerJwt"), aftIdList, message);
                                        this.setState({
                                            visibleAgreeSingle: false,
                                            message: undefined,
                                            aftId: undefined
                                        });
                                        this.props.history.push("/order/afterSale");
                                    }
                                }}
                                onCancel={() => {
                                    this.setState({
                                        visibleAgreeSingle: false,
                                        message: undefined, aftId: undefined
                                    })
                                }}
                            >
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Col span={5}>
                                        售后寄回说明：
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"请输入寄回说明"} value={message} onChange={(e) => {
                                            this.setState({message: e.target.value})
                                        }}/>
                                    </Col>
                                </Row>
                            </Modal>
                            <Modal
                                title="拒绝售后说明"
                                visible={visibleDisAgreeSingle}
                                onOk={() => {
                                    if (this.state.message === undefined) {
                                        message.error("请输入完整")
                                    } else {
                                        let afterSaleIdList = [];
                                        afterSaleIdList.push(aftId + "");
                                        let imageList = fileList.reduce((list, next) => (list.concat([next.name])), []);
                                        onDisAgreeAfterSales(localStorage.getItem("RealFakeManagerJwt"), afterSaleIdList, message, imageList);
                                        this.setState({
                                            visibleDisAgreeSingle: false,
                                            message: undefined,
                                            aftId: undefined,
                                            fileList: []
                                        });
                                        this.props.history.push("/order/afterSale");
                                    }
                                }}
                                onCancel={() => {
                                    this.setState({
                                        visibleDisAgreeSingle: false,
                                        message: undefined, aftId: undefined,
                                        fileList: []
                                    })
                                }}
                            >
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Col span={5}>
                                        拒绝售后说明：
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"请输入说明"} value={message} onChange={(e) => {
                                            this.setState({message: e.target.value})
                                        }}/>
                                    </Col>
                                    <Col span={5}>
                                        图片：
                                    </Col>
                                    <Col span={19}>
                                        <Upload
                                            action="/mock/upload"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={(file) => {
                                                this.setState({
                                                    previewImage: file.url || file.thumbUrl,
                                                    previewVisible: true,
                                                })
                                            }}
                                            onChange={({fileList}) => this.setState({fileList})}
                                        >
                                            {fileList.length >= 3 ? null : (
                                                <div>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">上传图片</div>
                                                </div>
                                            )}
                                        </Upload>
                                    </Col>
                                </Row>
                            </Modal>
                            <Modal
                                title="关闭售后说明"
                                visible={visibleClose}
                                onOk={() => {
                                    if (this.state.message === undefined) {
                                        message.error("请输入完整")
                                    } else {
                                        let afterSaleIdList = [];
                                        afterSaleIdList.push(aftId + "");
                                        let imageList = fileList.reduce((list, next) => (list.concat([next.name])), []);
                                        onCloseAfterSales(localStorage.getItem("RealFakeManagerJwt"), afterSaleIdList, message, imageList);
                                        this.setState({
                                            visibleClose: false,
                                            message: undefined,
                                            aftId: undefined,
                                            fileList: []
                                        });
                                        this.props.history.push("/order/afterSale");
                                    }
                                }}
                                onCancel={() => {
                                    this.setState({
                                        visibleClose: false,
                                        message: undefined, aftId: undefined,
                                        fileList: []
                                    })
                                }}
                            >
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Col span={5}>
                                        关闭售后说明：
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"请输入说明"} value={message} onChange={(e) => {
                                            this.setState({message: e.target.value})
                                        }}/>
                                    </Col>
                                    <Col span={5}>
                                        图片：
                                    </Col>
                                    <Col span={19}>
                                        <Upload
                                            action="/mock/upload"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={(file) => {
                                                this.setState({
                                                    previewImage: file.url || file.thumbUrl,
                                                    previewVisible: true,
                                                })
                                            }}
                                            onChange={({fileList}) => this.setState({fileList})}
                                        >
                                            {fileList.length >= 3 ? null : (
                                                <div>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">上传图片</div>
                                                </div>
                                            )}
                                        </Upload>
                                    </Col>
                                </Row>
                            </Modal>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: 0}}>
                                    <Divider>订单基本信息</Divider>
                                </Row>
                                {/*订单创建信息*/}
                                <Row type={"flex"} align={"middle"} justify={"space-between"}
                                     style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>

                                    <Col span={6} style={{textAlign: "left", fontSize: 20, fontWeight: "bold"}}>
                                        <Icon type="schedule" theme="outlined"/> 订单号：{afterSaleInfo.orderId}
                                    </Col>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        <Popconfirm placement="top" title={
                                            afterSaleInfo.state > 0 ? ("确定删除此售后记录吗？") : (
                                                "确定删除此售后申请吗？"
                                            )
                                        } onConfirm={() => {
                                            let aftIdList = [];
                                            aftIdList.push(afterSaleInfo.aftId + "");
                                            onDeleteAfterSales(localStorage.getItem("RealFakeManagerJwt"), aftIdList);
                                            this.props.history.goBack();
                                        }} okText="确认" cancelText="点错了">
                                            <Button type={"danger"}>删除</Button>
                                        </Popconfirm>
                                        {
                                            afterSaleInfo.state < 2 ? (
                                                <Popconfirm placement="top" title={
                                                    "确定拒绝售后申请?"
                                                } onConfirm={() => {
                                                    this.setState({
                                                        aftId: afterSaleInfo.aftId,
                                                        visibleDisAgreeSingle: true
                                                    })
                                                }} okText="确认" cancelText="点错了">
                                                    <Button type={"dashed"}>拒绝售后</Button>
                                                </Popconfirm>
                                            ) : null
                                        }
                                        {
                                            afterSaleInfo.state === 0 ? (
                                                <Popconfirm placement="top" title={
                                                    "确定同意售后申请?"
                                                } onConfirm={() => {
                                                    this.setState({
                                                        aftId: afterSaleInfo.aftId,
                                                        visibleAgreeSingle: true
                                                    })
                                                }} okText="确认" cancelText="点错了">
                                                    <Button type={"primary"}>同意售后</Button>
                                                </Popconfirm>
                                            ) : null
                                        }
                                        {
                                            afterSaleInfo.state === 1 ? (
                                                <Popconfirm placement="top" title={
                                                    "确定关闭此售后?"
                                                } onConfirm={() => {
                                                    this.setState({
                                                        aftId: afterSaleInfo.aftId,
                                                        visibleClose: true
                                                    })
                                                }} okText="确认" cancelText="点错了">
                                                    <Button type={"primary"}>关闭售后</Button>
                                                </Popconfirm>
                                            ) : null
                                        }
                                    </Col>
                                </Row>
                                <Row type={"flex"} justify={"space-around"}
                                     style={{padding: "3%", paddingTop: 0, paddingBottom: 0}}>
                                    <Col span={8}>
                                        <Row style={{
                                            padding: "2%",
                                            paddingLeft: "8%"
                                        }}>用户名:<a onClick={()=>{
                                            onEditUser(afterSaleInfo.userInfo.userId);
                                            this.props.history.push("/user/all/info");
                                        }}>{afterSaleInfo.userInfo.nickname}</a></Row>
                                        <Row style={{
                                            padding: "2%",
                                            paddingLeft: "8%"
                                        }}>用户编号:{afterSaleInfo.userInfo.userId}</Row>
                                        <Row style={{padding: "2%", paddingLeft: "8%"}}>售后编号:{afterSaleInfo.aftId}</Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row
                                            style={{padding: "2%"}}>申请时间:{new Date(afterSaleInfo.applyDate).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                        {
                                            afterSaleInfo.state > 1 ? (
                                                <Row
                                                    style={{padding: "2%"}}>完成时间:{new Date(afterSaleInfo.doneDate).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                            ) : null
                                        }
                                    </Col>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <Row style={{color: "#bfbfbf"}}>售后状态</Row>
                                                {
                                                    afterSaleInfo.state === 0 ? (
                                                        <Row style={{fontSize: 20}}>未处理</Row>
                                                    ) : (
                                                        afterSaleInfo.state === 1 ? (
                                                            <Row style={{fontSize: 20}}>处理中</Row>
                                                        ) : (
                                                            afterSaleInfo.state === 2 ? (
                                                                <Row style={{fontSize: 20}}>退款成功</Row>
                                                            ) : (
                                                                <Row style={{fontSize: 20}}>申请失败</Row>
                                                            )
                                                        )
                                                    )

                                                }
                                            </Col>
                                            <Col span={12}>
                                                <Row style={{color: "#bfbfbf"}}>退款金额</Row>
                                                <Row style={{fontSize: 20}}>￥{afterSaleInfo.commodity.price}</Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingTop: 0, paddingBottom: 0}}>
                                    <Divider>售后进度</Divider>
                                </Row>
                                <Row type={"flex"} justify={"space-around"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={8}>
                                        <Timeline style={{padding: "2%"}}>
                                            {
                                                afterSaleInfo.message !== undefined ? (
                                                    afterSaleInfo.message.split("#").map((item, index) => (
                                                        <Timeline.Item key={index}>
                                                            {item}
                                                        </Timeline.Item>

                                                    ))
                                                ) : (
                                                    <Row type={"flex"} justify={"space-around"}>
                                                        等待客服同意
                                                    </Row>)
                                            }
                                        </Timeline>
                                        {
                                            afterSaleInfo.resultPic !== undefined && afterSaleInfo.resultPic.length > 0 ? (
                                                <Row style={{paddingLeft: "8%"}}>
                                                    <ShowImages images={afterSaleInfo.resultPic} size={70}/>
                                                </Row>
                                            ) : null
                                        }
                                    </Col>
                                    {
                                        afterSaleInfo.state > 0 ? (
                                            <Col span={8}>
                                                <Row
                                                    style={{padding: "2%"}}>处理管理员:{afterSaleInfo.manager.nickname}</Row>
                                                <Row style={{padding: "2%"}}>管理员编号:{afterSaleInfo.manager.manId}</Row>
                                            </Col>
                                        ) : null
                                    }
                                </Row>

                                {/*商品信息*/}
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingBottom: 0, paddingTop: 0}}>
                                    <Divider>商品信息</Divider>
                                </Row>
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingTop: 0, paddingBottom: 0}}>
                                    <Table
                                        pagination={false}
                                        style={{width: "100%"}}
                                        columns={columns}
                                        dataSource={options}/>
                                </Row>
                                {/*售后原因*/}
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingBottom: 0, paddingTop: 0}}>
                                    <Divider>售后信息</Divider>
                                </Row>
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "13%", paddingTop: 0, paddingBottom: 0}}>
                                    {afterSaleInfo.reason}
                                </Row>
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingBottom: 0, paddingTop: 0}}>
                                    <Divider>售后申请拍照</Divider>
                                </Row>
                                {
                                    afterSaleInfo.pictures !== undefined && afterSaleInfo.pictures.length > 0 ? (
                                        <Row type={"flex"} align={"middle"}
                                             style={{padding: "13%", paddingTop: 0, paddingBottom: "3%"}}>
                                            <ShowImages images={afterSaleInfo.pictures} size={70}/>
                                        </Row>
                                    ) : null
                                }
                                {/*物流信息*/}
                                {
                                    afterSaleInfo.express !== undefined && afterSaleInfo.state > 0 ? (
                                        <div>
                                            <Row type={"flex"} align={"middle"}
                                                 style={{padding: "3%", paddingTop: 0, paddingBottom: 0}}>
                                                <Divider>售后物流</Divider>
                                            </Row>
                                            <Row type={"flex"} justify={"space-around"}
                                                 style={{padding: "3%", paddingTop: 0}}>
                                                <Col span={8}>
                                                    <Row style={{
                                                        padding: "2%",
                                                        paddingLeft: "8%"
                                                    }}>物流公司:{afterSaleInfo.express.name}</Row>
                                                    <Row style={{
                                                        padding: "2%",
                                                        paddingLeft: "8%"
                                                    }}>发货留言:{afterSaleInfo.expMessage}</Row>
                                                </Col>
                                                <Col span={8}>
                                                    <Row style={{padding: "2%"}}>单号:{afterSaleInfo.number}</Row>
                                                    <Row
                                                        style={{padding: "2%"}}>寄出时间:{new Date(afterSaleInfo.sendDate).Format("yyyy-MM-dd hh:mm:ss")}</Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : null
                                }
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
    const afterSale = state.order.afterSale;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        afterSaleInfo: afterSale.afterSaleInfo,
        isLoading: afterSale.isLoading
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
        onDeleteAfterSales: (jwt, aftIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteAfterSales(jwt, aftIdList));
        },
        AgreeAfterSales: (jwt, aftIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.AgreeAfterSales(jwt, aftIdList));
        },
        onDisAgreeAfterSales: (jwt, aftIdList, message, imageList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DisAgreeAfterSales(jwt, aftIdList, message, imageList));
        },
        onCloseAfterSales: (jwt, aftIdList, message, imageList) => {
            dispatch(Actions.Start());
            dispatch(Actions.CloseAfterSales(jwt, aftIdList, message, imageList));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));