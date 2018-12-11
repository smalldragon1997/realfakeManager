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
        });
    }

    componentDidMount() {
        this.props.onReDateFilter();
        // 通过令牌去获取管理员列表
        const jwt = localStorage.getItem("RealFakeManagerJwt");
        if (jwt !== undefined || jwt !== null) {
            this.props.onFetchAfterSales(jwt);
        }
    }

    render() {
        const {
            auth,
            info,
            afterSaleList, //
            isLoading, // 是否加载中
            onDeleteAfterSales, // 删除订单
            onEditAfterSale, // 编辑订单
            onFilter, // 过滤
            onReFilter, // 重置
            onDateFilter,
            onReDateFilter
        } = this.props;

        const {
            start,
            end,
            filter,
            key,
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '售后号',
                dataIndex: 'aftId',
                key: 'aftId',
            }, {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
            }, {
                title: '商品封面',
                dataIndex: 'commodity',
                key: 'commodity',
                render: commodity => {
                    return <ShowImage images={commodity.cover} size={50}/>
                }
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
                    <Tag color="blue" key={afterSaleInfo.aftId + "2"} onClick={() => {
                        onEditAfterSale(afterSaleInfo);
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
                pictures: afterSaleList[i].pictures,
                commodity: afterSaleList[i].commodity,
                applyDate: new Date(afterSaleList[i].applyDate).Format("yyyy-MM-dd hh:mm:ss"),
                sendDate: afterSaleList[i].sendDate===undefined?"未寄出":new Date(afterSaleList[i].sendDate).Format("yyyy-MM-dd hh:mm:ss"),
                price: "￥" + afterSaleList[i].commodity.price,
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
                                        <Col span={4}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个售后申请吗？"}
                                                        onConfirm={() => {
                                                            onDeleteAfterSales(localStorage.getItem("RealFakeManagerJwt"), selectedRowKeys);
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
                                        <Col span={11} style={{textAlign: "right"}}>
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
                                        <Col span={9}>
                                            <Input
                                                value={key}
                                                style={{width: "50%"}} placeholder={"搜索处理中的售后"}
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
                                            expandedRowRender={afterSaleInfo =>
                                                <span>
                                                    <Row style={{marginLeft:"5%"}}>
                                                        申请原因：{afterSaleInfo.reason} 寄回时间：{afterSaleInfo.sendDate}
                                                    </Row>
                                                    <Row style={{marginLeft:"5%"}}>
                                                        售后拍照：
                                                        {
                                                            afterSaleInfo.pictures===undefined||afterSaleInfo.pictures.length===0?("无"):(
                                                                <ShowImages images={afterSaleInfo.pictures} size={50}/>
                                                            )
                                                        }
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
    const afterSale = state.order.afterSale;
    const navLink = state.navLink;

    return {
        auth: navLink.auth,
        info: navLink.info,
        afterSaleList: getAfterSaleListByFilter(afterSale.afterSaleList, afterSale.filter, afterSale.key, afterSale.start, afterSale.end, 1, new Date()),
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
        onEditAfterSale: (AfterSaleInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Edit(AfterSaleInfo));
        },
        onDeleteAfterSales: (jwt, aftIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteAfterSales(jwt, aftIdList));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));