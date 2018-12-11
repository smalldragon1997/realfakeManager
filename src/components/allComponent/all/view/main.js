import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as CommActions from '../../../commodityComponent/all/actions';
import * as NavActions from '../../../shareComponents/navLink/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import {Form, Icon, Input, Button, Checkbox, Row, Col, message, Spin, Card, Divider, Radio,DatePicker,Select} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import SaleCard from "./card/saleCard";
import VisitCard from "./card/visitCard";
import PayCard from "./card/payCard";
import AfterSaleCard from "./card/afterSaleCard";
import SearchCard from "./card/searchCard";
import LikeCard from "./card/likeCard";
import Rank from "./rank/rank";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';

class all extends React.Component {

    constructor(props) {
        super(props);
        const currentYear = new Date().getFullYear();
        this.state = ({
            rankStart: new Date(currentYear+"/"+"1/"+"1").getTime(),
            rankEnd: new Date((currentYear+1)+"/"+"1/"+"1").getTime(),
            filter:"year",
            count:12
        });
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        // 根据jwt获取初始化数据
        if (this.props.orderList.length === 0) {
            this.props.onFetchOrders(localStorage.getItem("RealFakeManagerJwt"));
        }
        if (this.props.visitList.length === 0) {
            this.props.onFetchVisit(localStorage.getItem("RealFakeManagerJwt"));
        }
        if (this.props.afterSaleList.length === 0) {
            this.props.onFetchAfterSale(localStorage.getItem("RealFakeManagerJwt"));
        }
        if (this.props.commList.length === 0) {
            this.props.onFetchCommodities(localStorage.getItem("RealFakeManagerJwt"));
        }
        if (this.props.keyList.length === 0) {
            this.props.onFetchKeyWords(localStorage.getItem("RealFakeManagerJwt"));
        }
    }

    refresh() {
        this.props.onFetchOrders(localStorage.getItem("RealFakeManagerJwt"));
        this.props.onFetchVisit(localStorage.getItem("RealFakeManagerJwt"));
        this.props.onFetchAfterSale(localStorage.getItem("RealFakeManagerJwt"));
        this.props.onFetchCommodities(localStorage.getItem("RealFakeManagerJwt"));
        this.props.onFetchKeyWords(localStorage.getItem("RealFakeManagerJwt"));
    }

    render() {
        const {
            auth,
            info,
            orderList, // 订单列表
            visitList, // 访问列表
            afterSaleList, // 售后列表
            commList, // 商品列表
            keyList, // 搜索列表
            isLoading, // 是否是载入状态
            onEditComm,
        } = this.props;

        const {
            rankStart,
            rankEnd,
            filter,
            count
        } = this.state;

        //  订单中出现的年份
        let yearRange = [];
        for(let i=0;i<orderList.length;i++){
            const year = new Date(orderList[i].payDate).getFullYear();
            if(yearRange.length===0){
                yearRange.push(year);
            }else if( yearRange.indexOf(year)===-1){
                yearRange.push(year);
            }
        }
        // 排序年份
        yearRange = yearRange.sort((a,b)=>b-a);
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined?(
                        <Divider>请登录</Divider>
                    ):(
                        !(auth.see_all||info.isSuper)?(
                            <Divider>权限不足</Divider>
                        ):(
                            <div>
                                <Row style={{marginTop: "1%"}}>
                                    <Button size={"large"} style={{width: "100%"}} onClick={() => {
                                        this.refresh();
                                    }}>刷新</Button>
                                </Row>
                                <Row style={{marginTop: "1%", marginBottom: "2%", backgroundColor: "#fff"}}>
                                    <Col span={24}>
                                        <Row type={"flex"} align={"middle"} style={{padding: 20,paddingBottom:10}}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6} style={{padding: "0.5%"}}>
                                                <SaleCard orderList={orderList} mouthCount={12}/>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6} style={{padding: "0.5%"}}>
                                                <VisitCard visitList={visitList} dayCount={30}/>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6} style={{padding: "0.5%"}}>
                                                <PayCard orderList={orderList} dayCount={30}/>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6} style={{padding: "0.5%"}}>
                                                <AfterSaleCard afterSaleList={afterSaleList} orderList={orderList} dayCount={30}/>
                                            </Col>
                                        </Row>

                                        <Row type={"flex"} align={"middle"} style={{padding: 20, paddingTop: 0,paddingBottom:10}}>
                                            <Col span={24} style={{padding: "0.5%"}}>
                                                <Rank onEditComm={(commId)=>{
                                                    onEditComm(commId);
                                                    this.props.history.push("/commodity/all/info");
                                                }}
                                                    orderList={orderList} visitList={visitList} count={count} filter={filter} rankStart={rankStart} rankEnd={rankEnd} dateFilter={
                                                    <Row type={"flex"} align={"middle"} justify={"space-around"}
                                                         style={{width: "100%"}}>
                                                        <Select
                                                            defaultValue={yearRange[0]}
                                                            placeholder={"选择年份"}   style={{width: 100,paddingRight:5}} onChange={(e)=>{
                                                            this.setState({
                                                                rankStart:new Date(e+"/"+"1/"+"1").getTime(),
                                                                rankEnd:new Date((e+1)+"/"+"1/"+"1").getTime(),
                                                                filter:"year",
                                                                count:12
                                                            });
                                                        }}>
                                                            {
                                                                yearRange.map(function (item,index) {
                                                                    return (
                                                                        <Option value={item} key={index}>{item}</Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>

                                                        <Button style={{marginRight:5}} onClick={()=>{
                                                            this.setState({
                                                                rankStart: new Date(getRecentDaysByCount(365).before).getTime(),
                                                                rankEnd: new Date(getRecentDaysByCount(365).now).getTime(),
                                                                filter:"day",
                                                                count:365
                                                            });
                                                        }}>
                                                            最近一年
                                                        </Button>
                                                        <Button style={{marginRight:5}} onClick={()=>{
                                                            this.setState({
                                                                rankStart: new Date(getRecentDaysByCount(30).before).getTime(),
                                                                rankEnd: new Date(getRecentDaysByCount(30).now).getTime(),
                                                                filter:"day",
                                                                count:30
                                                            });
                                                        }}>
                                                            最近一月
                                                        </Button>
                                                        <RangePicker
                                                            locale={locale}
                                                            style={{paddingRight:5}}
                                                            placeholder={["开始日期","结束日期"]}
                                                            format={dateFormat}
                                                            onChange={(e,date)=>{
                                                                const startDay = new Date(date[0]).getTime();
                                                                const endDay = new Date(date[1]).getTime()+24 * 60 * 60 * 1000;
                                                                this.setState({
                                                                    rankStart:date[0]===""?0:new Date(date[0]).getTime(),
                                                                    rankEnd:date[1]===""?9999999999999:new Date(date[1]).getTime()+24 * 60 * 60 * 1000,
                                                                    filter:"day",
                                                                    count:(endDay-startDay)/(24 * 60 * 60 * 1000)
                                                                });
                                                            }}
                                                        />
                                                    </Row>
                                                }/>
                                            </Col>
                                        </Row>
                                        <Row style={{padding: 20,paddingTop:0}}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{padding: "0.5%"}}>
                                                <SearchCard keyList={keyList} count={count} filter={filter} rankStart={rankStart} rankEnd={rankEnd} />
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} style={{padding: "0.5%"}}>
                                                <LikeCard onEditComm={(commId)=>{
                                                    onEditComm(commId);
                                                    this.props.history.push("/commodity/all/info");
                                                }} commList={commList} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        )
                    )
                }
            </Spin>
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const all = state.all.all;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        orderList: all.orderList,
        visitList: all.visitList,
        afterSaleList: all.afterSaleList,
        commList: all.commList,
        keyList: all.keyList,
        isLoading: all.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onEditComm:(commId)=>{
            dispatch(CommActions.Edit(commId));
        },
        onFetchOrders: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchOrders(jwt));
        },
        onFetchVisit: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchVisit(jwt));
        },
        onFetchAfterSale: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchAfterSale(jwt));
        },
        onFetchCommodities: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchCommodities(jwt));
        },
        onFetchKeyWords: (jwt) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchKeyWords(jwt));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(all));

let compareDesc = function (prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
};

function getRecentDaysByCount(count) {
// 拼接时间
    let time1 = new Date();
    let Y1 = time1.getFullYear();
    let M1 = ((time1.getMonth() + 1) > 9 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1));
    let D1 = (time1.getDate() > 9 ? time1.getDate() : '0' + time1.getDate());
    let timer1 = Y1 + '/' + M1 + '/' + D1; // 当前时间
    let time2 = new Date();
    time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count));
    let Y2 = time2.getFullYear();
    let M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1));
    let D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate());
    let timer2 = Y2 + '/' + M2 + '/' + D2; // 之前的7天或者30天
    return {
        now: timer1,
        before: timer2
    }
}