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
    Select,
    Divider,
    Modal,
    Popconfirm, DatePicker
} from 'antd';
import {getAfterSaleListByFilter} from '../selector';
import ShowImages from '../../../commom/showImages';
import ShowImage from '../../../commom/showImage';
import afterSale from "./afterSale";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 时间范围
            start: 0,
            end: 9999999999999,
            // 搜索关键字
            filter: "orderId",
            key: undefined,
            // 列表复选
            selectedRowKeys: [],
            // 弹框
            visibleAgreeSingle:false,
            aftId:undefined,
            visibleAgree:false,
            visibleDisAgreeSingle:false,
            visibleDisAgree:false,
            message:undefined
        });
    }

    componentDidMount() {
        this.props.onFetchAfterSales(localStorage.getItem("RealFakeManagerJwt"));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.info!==this.props.info&&nextProps.info!==undefined){
            this.props.onFetchAfterSales(localStorage.getItem("RealFakeManagerJwt"));
        }
    }

    render() {
        const {
            auth,
            info,
            afterSaleList, //  未付款订单列表
            isLoading, // 是否加载中
            onDeleteAfterSales, // 删除订单
            onEditAfterSale, // 编辑订单
            onFilter, // 过滤
            onReFilter, // 重置
            onAgreeAfterSales,
            onDateFilter,
            onReDateFilter,
            onDisAgreeAfterSales,
            onFetchAfterSaleInfo
        } = this.props;

        const {
            start,
            end,
            filter,
            key,
            selectedRowKeys,
            visibleAgreeSingle,
            visibleAgree,
            visibleDisAgreeSingle,
            visibleDisAgree,
            message,
            aftId
        } = this.state;

        const columns = [
            {
                title: '商品封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => {
                    return <ShowImage image={cover} size={50}/>
                }
            }, {
                title: '售后号',
                dataIndex: 'aftId',
                key: 'aftId',
            }, {
                title: '退款金额',
                dataIndex: 'price',
                key: 'price',
            }, {
                title: '申请时间',
                dataIndex: 'applyDate',
                key: 'applyDate',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (afterSaleInfo) => (
                    <span>
                        <Popconfirm placement="top" title={"确定同意此售后申请吗？"} onConfirm={() => {
                            this.setState({aftId:afterSaleInfo.aftId,visibleAgreeSingle:true})
                        }} okText="确认" cancelText="点错了">
                        <Tag color="blue" key={afterSaleInfo.aftId + "1"}>同意</Tag>
                    </Popconfirm>
                        {/*<Popconfirm placement="top" title={"确定拒绝此售后申请吗？"} onConfirm={() => {*/}
                            {/*this.setState({aftId:afterSaleInfo.aftId,visibleDisAgreeSingle:true})*/}
                        {/*}} okText="确认" cancelText="点错了">*/}
                        {/*<Tag color="red" key={afterSaleInfo.aftId + "1"}>拒绝</Tag>*/}
                    {/*</Popconfirm>*/}
                    <Tag color="blue" key={afterSaleInfo.aftId + "2"} onClick={() => {
                        onFetchAfterSaleInfo(afterSaleInfo.aftId);
                        this.props.history.push("/order/afterSale/info");
                    }}>详情</Tag>
                    <Popconfirm placement="top" title={"确定删除此售后申请吗？"} onConfirm={() => {
                        let afterSaleIdList = [];
                        afterSaleIdList.push(afterSaleInfo.aftId + "");
                        onDeleteAfterSales(localStorage.getItem("RealFakeManagerJwt"), afterSaleIdList);
                    }} okText="确认" cancelText="点错了">
                        <Tag color="red" key={afterSaleInfo.aftId + "3"}>删除</Tag>
                    </Popconfirm>

                </span>
                ),
            }];

        // 表格数据
        let options = [];
        for (let i = 0; i < afterSaleList.length; i++) {
            options.push({
                key: afterSaleList[i].aftId,
                orderId: afterSaleList[i].orderId,
                aftId: afterSaleList[i].aftId,
                reason: afterSaleList[i].reason,
                cover: afterSaleList[i].cover,
                applyDate: new Date(afterSaleList[i].applyDate).Format("yyyy-MM-dd hh:mm:ss"),
                price: "￥" + afterSaleList[i].price,
                actions: afterSaleList[i],
            })
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_AfterSale || info.isSuper) ? (
                            <Row>
                                <Modal
                                    title="售后寄回说明"
                                    visible={visibleAgreeSingle}
                                    onOk={() => {
                                        if ( message === undefined) {
                                            message.error("请输入完整")
                                        } else {
                                            onAgreeAfterSales(localStorage.getItem("RealFakeManagerJwt"), aftId,message);
                                            this.setState({
                                                visibleAgreeSingle: false,
                                                message: undefined,
                                                aftId:undefined
                                            })
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
                                    title="售后寄回说明"
                                    visible={visibleAgree}
                                    onOk={() => {
                                        if ( message === undefined) {
                                            message.error("请输入完整")
                                        } else {
                                            onAgreeAfterSales(localStorage.getItem("RealFakeManagerJwt"), selectedRowKeys,message);

                                            this.setState({
                                                visibleAgree: false,
                                                message: undefined,
                                                selectedRowKeys:[]
                                            })
                                        }
                                    }}
                                    onCancel={() => {
                                        this.setState({
                                            visibleAgree: false,
                                            message: undefined
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
                                        if ( message === undefined) {
                                            message.error("请输入完整")
                                        } else {
                                            let afterSaleIdList = [];
                                            afterSaleIdList.push(aftId + "");
                                            onDisAgreeAfterSales(localStorage.getItem("RealFakeManagerJwt"), afterSaleIdList,message);
                                            this.setState({
                                                visibleDisAgreeSingle: false,
                                                message: undefined,
                                                aftId:undefined
                                            })
                                        }
                                    }}
                                    onCancel={() => {
                                        this.setState({
                                            visibleDisAgreeSingle: false,
                                            message: undefined, aftId: undefined
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
                                    </Row>
                                </Modal>
                                <Modal
                                    title="拒绝售后说明"
                                    visible={visibleDisAgree}
                                    onOk={() => {
                                        if ( message === undefined) {
                                            message.error("请输入完整")
                                        } else {
                                            onDisAgreeAfterSales(localStorage.getItem("RealFakeManagerJwt"), selectedRowKeys,message);

                                            this.setState({
                                                visibleDisAgree: false,
                                                message: undefined,
                                                selectedRowKeys:[]
                                            })
                                        }
                                    }}
                                    onCancel={() => {
                                        this.setState({
                                            visibleDisAgree: false,
                                            message: undefined
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
                                    </Row>
                                </Modal>
                                <Col>
                                    <Row style={{textAlign: "right", padding: "3%", paddingBottom: 0}}>
                                        选择时间： <RangePicker
                                        style={{paddingRight: 5}}
                                        placeholder={["开始日期", "结束日期"]}
                                        format={dateFormat}
                                        onChange={(e, date) => {
                                            this.setState({
                                                start: date[0] === "" ? 0 : new Date(date[0]).getTime(),
                                                end: date[1] === "" ? 9999999999999 : new Date(date[1]).getTime() + 24 * 60 * 60 * 1000,
                                            });
                                            onDateFilter(date[0] === "" ? 0 : new Date(date[0]).getTime(),
                                                date[1] === "" ? 9999999999999 : new Date(date[1]).getTime() + 24 * 60 * 60 * 1000);
                                        }}
                                    />
                                        <Button
                                            style={{width: "25%"}} onClick={() => {
                                            this.setState({
                                                start: 0,
                                                end: 9999999999999
                                            });
                                            onReDateFilter()
                                        }}>重置</Button>
                                    </Row>
                                    <Row type={"flex"} align={"middle"}
                                         style={{padding: "3%", paddingBottom: 10, paddingTop: 10}}>
                                        <Col span={6}>
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定同意这" + selectedRowKeys.length + "个售后申请吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*this.setState({visibleAgree:true})*/}
                                                        {/*}} okText="确认" cancelText="点错了">*/}
                                                {/*<Button type={"primary"}*/}
                                                        {/*loading={isLoading}*/}
                                                        {/*disabled={!selectedRowKeys.length > 0}*/}
                                                {/*>同意</Button>*/}
                                            {/*</Popconfirm>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定拒绝这" + selectedRowKeys.length + "个售后申请吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*this.setState({visibleDisAgree:true})*/}
                                                        {/*}} okText="确认" cancelText="点错了">*/}
                                                {/*<Button type={"dashed"}*/}
                                                        {/*loading={isLoading}*/}
                                                        {/*disabled={!selectedRowKeys.length > 0}*/}
                                                {/*>拒绝</Button>*/}
                                            {/*</Popconfirm>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个售后申请吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDeleteAfterSales(localStorage.getItem("RealFakeManagerJwt"), selectedRowKeys);*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
                                                                {/*selectedRowKeys: []*/}
                                                            {/*});*/}
                                                        {/*}} okText="确认" cancelText="点错了">*/}
                                                {/*<Button type={"danger"}*/}
                                                        {/*loading={isLoading}*/}
                                                        {/*disabled={!selectedRowKeys.length > 0}*/}
                                                {/*>删除</Button>*/}
                                            {/*</Popconfirm>*/}


                                        </Col>
                                        <Col span={10} style={{textAlign: "right"}}>
                                            <RadioGroup
                                                style={{width: "100%"}}
                                                onChange={(e) => {
                                                    this.setState({
                                                        ...this.state,
                                                        filter: e.target.value
                                                    })
                                                }} defaultValue="orderId">
                                                <RadioButton value="orderId">订单号</RadioButton>
                                                <RadioButton value="aftId">售后号</RadioButton>
                                                <RadioButton value="nickname">用户名</RadioButton>
                                                <RadioButton value="userId">用户编号</RadioButton>
                                            </RadioGroup>
                                        </Col>
                                        <Col span={8}>
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
                                            // expandedRowRender={afterSaleInfo =>
                                            //     <span>
                                            //         <Row style={{marginLeft:"5%"}}>
                                            //             申请原因：{afterSaleInfo.reason}
                                            //         </Row>
                                            //         <Row style={{marginLeft:"5%"}}>
                                            //             售后拍照：
                                            //             {
                                            //                 afterSaleInfo.pictures===undefined||afterSaleInfo.pictures.length===0?("无"):(
                                            //                     <ShowImages images={afterSaleInfo.pictures} size={50}/>
                                            //                 )
                                            //             }
                                            //         </Row>
                                            //     </span>}
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
    const afterSale = state.order.afterSale;
    const navLink = state.navLink;

    return {
        auth: navLink.auth,
        info: navLink.info,
        afterSaleList: afterSale.afterSaleList.filter(item=>item.state===1),
        isLoading: afterSale.isLoading
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
        onDateFilter: (start, end) => {
            dispatch(Actions.Start());
            dispatch(Actions.DateFilter(start, end));
        },
        onReDateFilter: () => {
            dispatch(Actions.Start());
            dispatch(Actions.ReDateFilter());
        },
        onFetchAfterSales: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(jwt));
        },
        onFetchAfterSaleInfo: (aftId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchAfterSaleInfo(aftId,localStorage.getItem("RealFakeManagerJwt")));
        },
        onEditAfterSale: (AfterSaleInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Edit(AfterSaleInfo));
        },
        onDeleteAfterSales: (jwt, aftIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteAfterSales(jwt, aftIdList));
        },
        onAgreeAfterSales: (jwt, aftId,message) => {
            dispatch(Actions.Start());
            dispatch(Actions.AgreeAfterSales(jwt, aftId,message));
        },
        onDisAgreeAfterSales: (jwt, aftIdList,message) => {
            dispatch(Actions.Start());
            dispatch(Actions.DisAgreeAfterSales(jwt, aftIdList,message));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));