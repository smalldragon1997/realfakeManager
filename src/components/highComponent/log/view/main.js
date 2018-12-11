import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {getLogByFilter} from '../selector';
import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message, Table, Tag,Select,DatePicker,Divider } from 'antd';

import moment from 'moment';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Option = Select.Option;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
class log extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 搜索关键字
            filter: "manId",
            key: undefined,
            isSuccess:undefined,
            start:0,
            end:9999999999999,
        });
    }

    componentDidMount() {
        // 通过令牌去获取日志列表
        this.props.onFetchLogList(localStorage.getItem("RealFakeManagerJwt"));
        // 通过令牌去获取操作列表
        this.props.onFetchOperationList(localStorage.getItem("RealFakeManagerJwt"));
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            logList, // 日志列表
            isLoading, // 是否加载中
            onFilter, // 筛选
            onReFilter,// 重置筛选条件
        } = this.props;

        const {
            filter,
            key,
            isSuccess,
            start,
            end,
        } = this.state;


        const columns = [{
            title: '管理员编号',
            dataIndex: 'manId',
            key: 'manId',
        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
        },{
            title: '操作时间',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '操作结果',
            dataIndex: 'isSuccess',
            key: 'isSuccess',
            render: log => (
                <span>
                    {
                        log.isSuccess ? (
                            <Tag color="blue" >操作成功</Tag>
                        ) : (
                            <Tag color="red" >操作失败</Tag>
                        )
                    }
                </span>
            ),
        },{
            title: '操作建议',
            dataIndex: 'reason',
            key: 'reason',
        }, ];
        // 多选列表
        let options = [];
        for (let i = 0; i < logList.length; i++) {
            options.push({
                key: logList[i].manager.manId+i,
                manId: logList[i].manager.manId,
                operation: logList[i].operation,
                nickname: logList[i].manager.nickname,
                date: new Date(logList[i].date).Format("yyyy-MM-dd hh:mm:ss"),
                isSuccess:logList[i],
                reason:logList[i].reason
            })
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined?(
                        <Divider>请登录</Divider>
                    ):(
                        !info.isSuper?(
                            <Divider>权限不足</Divider>
                        ):(
                            <Row>
                                <Col>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingBottom:"1%"}}>
                                        <Col span={6} style={{padding: "0.5%"}}>
                                            <RangePicker
                                                placeholder={["开始日期","结束日期"]}
                                                format={dateFormat}
                                                onChange={(e,date)=>{
                                                    this.setState({
                                                        start:date[0]===""?0:new Date(date[0]).getTime(),
                                                        end:date[1]===""?9999999999999:new Date(date[1]).getTime()
                                                    });
                                                    onFilter(filter,key,date[0]===""?0:new Date(date[0]).getTime(),date[1]===""?9999999999999:new Date(date[1]).getTime(),isSuccess);
                                                }}
                                            />
                                        </Col>

                                        <Col xs={10} sm={10} md={10} lg={10} xl={4} xxl={4}
                                             style={{textAlign: "right",padding: "0.5%"}}>
                                            <Select
                                                defaultValue={undefined}
                                                placeholder={"结果"}   style={{width: "100%"}} onChange={(e)=>{
                                                this.setState({
                                                    isSuccess:e
                                                });
                                                onFilter(filter,key,start,end,e)
                                            }}>
                                                <Option value={undefined} key={1}>全部</Option>
                                                <Option value={true} key={2}>操作成功</Option>
                                                <Option value={false} key={3}>操作失败</Option>
                                            </Select>
                                        </Col>
                                        <Col span={6}
                                             style={{textAlign: "right"}}>

                                            <RadioGroup
                                                onChange={(e) => {
                                                    this.setState({
                                                        ...this.state,
                                                        filter: e.target.value
                                                    })
                                                }} defaultValue="manId">
                                                <RadioButton value="manId">编号</RadioButton>
                                                <RadioButton value="nickname">昵称</RadioButton>
                                                <RadioButton value="operation">操作</RadioButton>
                                            </RadioGroup>
                                        </Col>
                                        <Col span={4} style={{padding: "0.5%"}}>
                                            <Input
                                                value={key}
                                                style={{width: "100%"}} placeholder={"搜索日志"} onChange={(e) => {
                                                this.setState({
                                                    ...this.state,
                                                    key: e.target.value
                                                })
                                            }}/>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={2} xxl={2} style={{padding: "0.5%"}}>
                                            <Button
                                                style={{width: "100%"}} type={"primary"} onClick={() => {
                                                if (key === undefined) {
                                                    message.error("请输入关键字");
                                                }else{
                                                    onFilter(filter,key,start,end,isSuccess)
                                                }
                                            }}>搜索</Button>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={2} xxl={2} style={{padding: "0.5%"}}>
                                            <Button
                                                style={{width: "100%"}}  onClick={() => {
                                                this.setState({
                                                    ...this.state,
                                                    key: undefined,
                                                    isSuccess:undefined,
                                                    start:0,
                                                    end:9999999999999,
                                                    operation:undefined
                                                });
                                                onReFilter()
                                            }}>重置</Button>
                                        </Col>
                                    </Row>

                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            style={{width: "100%"}}
                                            columns={columns} dataSource={options}/>
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
    const log = state.high.log;
    const navLink = state.navLink;
    return {
        auth:navLink.auth,
        info:navLink.info,
        logList: getLogByFilter(log.logList,log.filter,log.key,log.start,log.end,log.isSuccess),
        operationList:log.operationList,
        isLoading: log.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchLogList: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching(jwt));
        },
        onFetchOperationList: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchOperation(jwt));
        },
        onFilter: (filter,key,start,end,isSuccess,operation) => {
            dispatch(Actions.Start());
            dispatch(Actions.Filter(filter,key,start,end,isSuccess,operation));
        },
        onReFilter: () => {
            dispatch(Actions.Start());
            dispatch(Actions.ReFilter());
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(log));

// 日期转换
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};