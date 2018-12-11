import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import * as NavActions from '../../../../shareComponents/navLink/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import {Form, Icon, Input, Button, Checkbox, Row, Col, message, Spin, Card, Divider,Badge} from 'antd';

const FormItem = Form.Item;

class saleRank extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            orderList, // 订单列表

            rankStart,
            rankEnd,
            filter,
            count,
            onEditComm,
        } = this.props;

        // 销售额数据
        let data = [];
        let saleList = [];
        let cols = {};
        // 判断filter是显示什么类型
        if (filter === "year") {
            // 开始年月
            const currentYear = new Date(rankStart).getFullYear();
            // 初始化横坐标 yyyy/MM 纵坐标total为0
            for (let i = 1; i < count + 1; i++) {
                data.push({date: currentYear + "/" + i, total: 0});
            }
            // 过滤掉不在时间范围内的订单
            saleList = orderList.filter(item => (item.payDate >= rankStart && item.payDate < rankEnd));
            // 给坐标赋值
            for (let i = 0; i < saleList.length; i++) {
                // 比较订单所在日期
                for (let j = 0; j < data.length; j++) {
                    const currentMouth = new Date(data[j].date).getMonth() + 1;
                    if (saleList[i].payDate >= new Date(data[j].date).getTime()
                        && saleList[i].payDate < new Date(currentMouth===12?(currentYear+1 + "/" + 1):(currentYear + "/" + (currentMouth + 1))).getTime()) {
                        // console.log(i,new Date(saleList[i].payDate).Format("yyyy/MM/dd"))
                        data[j].total += saleList[i].total;
                        break;
                    }
                }
            }
            // 纵坐标区间大小 设为最大值的1/4
            cols = {
                total: {
                    tickInterval: data.reduce((total, next) => total < next.total ? next.total : total, 0) / 5
                }
            };
        } else if (filter === "day") {
            // 初始化横坐标 yyyy/MM 纵坐标total为0
            for (let i = 0; i < count; i++) {
                data.push({date: new Date(rankStart + 24 * 60 * 60 * 1000 * i).Format("yyyy/MM/dd"), total: 0});
            }
            // 过滤掉不在时间范围内的订单
            saleList = orderList.filter(item => (item.payDate >= rankStart && item.payDate < rankEnd));
            // 给坐标赋值
            for (let i = 0; i < saleList.length; i++) {
                // 比较订单所在日期
                for (let j = 0; j < data.length; j++) {

                    if (saleList[i].payDate >= new Date(data[j].date).getTime()
                        && saleList[i].payDate < new Date(new Date(data[j].date).getTime() + 24 * 60 * 60 * 1000).getTime()) {
                        // console.log(i,new Date(saleList[i].payDate).Format("yyyy/MM/dd"),saleList[i].total)
                        data[j].total += saleList[i].total;
                        break;
                    }
                }

            }
            // 纵坐标区间大小 设为最大值的1/4
            cols = {
                total: {
                    tickInterval: data.reduce((total, next) => total < next.total ? next.total : total, 0) / 5
                }
            };
        }

        // 销售量排行榜数据
        // 商品数据压缩
        let commSaleData = [];

        // 过滤掉不在时间范围内的订单
        saleList = orderList.filter(item => (item.payDate >= rankStart && item.payDate < rankEnd));
        // 获得所有出现过的商品
        const commList = saleList.reduce((commList, nextSaleList) => (commList.concat(nextSaleList.commList)), []);
        // 给商品销量赋值
        for (let i = 0; i < commList.length; i++) {

            // 如果已有数据为空 直接添加数据
            if(commSaleData.length === 0){
                commSaleData.push({
                    commId:commList[i].commId,
                    title:commList[i].title,
                    sales:1
                })
            }else{
                //如果有数据则对比commId ，如果没有对应commId则添加数据
                let flag = true;
                for (let j = 0; j < commSaleData.length; j++) {
                    if (commList[i].commId === commSaleData[j].commId) {
                        commSaleData[j].sales++;
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    commSaleData.push({
                        commId:commList[i].commId,
                        title:commList[i].title,
                        sales:1
                    })
                }
            }
        }
        commSaleData = commSaleData.sort((a,b)=>(b.sales-a.sales));
        let resultData = [];
        for (let i = 0; i < commSaleData.length; i++) {
            if(i<9){
                resultData.push(commSaleData[i]);
            }
        }
        commSaleData = resultData;
        return (
            <Card
                bodyStyle={{padding: 20}}
                hoverable
                style={{width: "100%"}}
            >
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
                        <Row>
                            <Divider style={{marginTop:"1%",marginBottom:"1%"}}>销售额趋势</Divider>
                        </Row>
                        {
                            filter === "year" ? (
                                <Chart height={400} data={data} scale={cols} forceFit padding={[20, 0, 50, 50]}>
                                    <Axis name="date"/>
                                    <Axis name="total"/>
                                    <Geom type="interval" position="date*total"/>
                                    <Tooltip
                                        crosshairs={{
                                            type: "y"
                                        }}
                                    />
                                </Chart>
                            ) : (
                                <Chart height={400} data={data} scale={cols} forceFit padding={[20, 0, 10, 50]}>
                                    <Axis name="date"/>
                                    <Axis name="total"/>
                                    <Geom type="area" position="date*total"/>

                                    <Tooltip
                                        crosshairs={{
                                            type: "line"
                                        }}
                                    />
                                </Chart>
                            )
                        }

                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6} style={{paddingLeft:"3%"}}>
                        <Row>
                            <Divider style={{marginTop:"1%",marginBottom:"1%"}}>商品销量排名</Divider>
                        </Row>
                        {
                            commSaleData.map(function (item ,index) {
                                return(
                                    <Row type={"flex"} align={"middle"} key={index} style={{padding:"4%"}}>
                                        <Col span={4}>
                                            {
                                                index<3?(
                                                    <Badge count={index+1} />
                                                ):(
                                                    <Badge count={index+1} style={{ backgroundColor: '#e3e3e3', color: '#000000'}}/>
                                                )
                                            }
                                        </Col>
                                        <Col span={12} style={{textAlign:"center"}}>
                                            <a onClick={()=>{
                                                onEditComm(item.commId)
                                            }}>{item.title}</a>
                                        </Col>
                                        <Col span={8} style={{textAlign:"right"}}>
                                            {item.sales}
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>

                </Row>


            </Card>
        )
    }
}

export default saleRank;


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