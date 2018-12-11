import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import * as NavActions from '../../../../shareComponents/navLink/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import {Form, Icon, Input, Button, Checkbox, Row, Col, message, Spin, Card, Divider, Badge,Table} from 'antd';

const FormItem = Form.Item;

class visitRank extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            keyList, // 访问列表

            rankStart,
            rankEnd,
            filter,
            count
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
            saleList = keyList.filter(item => (item.date >= rankStart && item.date < rankEnd));
            // 给坐标赋值
            for (let i = 0; i < saleList.length; i++) {
                // 比较订单所在日期
                for (let j = 0; j < data.length; j++) {
                    const currentMouth = new Date(data[j].date).getMonth() + 1;
                    if (saleList[i].date >= new Date(data[j].date).getTime()
                        && saleList[i].date < new Date(currentMouth === 12 ? (currentYear + 1 + "/" + 1) : (currentYear + "/" + (currentMouth + 1))).getTime()) {
                        // console.log(i,new Date(saleList[i].date).Format("yyyy/MM/dd"))
                        data[j].total += saleList[i].count;
                        break;
                    }
                }
            }
        } else if (filter === "day") {
            // 初始化横坐标 yyyy/MM 纵坐标total为0
            for (let i = 0; i < count; i++) {
                data.push({date: new Date(rankStart + 24 * 60 * 60 * 1000 * i).Format("yyyy/MM/dd"), total: 0});
            }
            // 过滤掉不在时间范围内的订单
            saleList = keyList.filter(item => (item.date >= rankStart && item.date < rankEnd));
            // 给坐标赋值
            for (let i = 0; i < saleList.length; i++) {
                // 比较订单所在日期
                for (let j = 0; j < data.length; j++) {

                    if (saleList[i].date >= new Date(data[j].date).getTime()
                        && saleList[i].date < new Date(new Date(data[j].date).getTime() + 24 * 60 * 60 * 1000).getTime()) {
                        // console.log(i,new Date(saleList[i].date).Format("yyyy/MM/dd"),saleList[i].total)
                        data[j].total += saleList[i].count;
                        break;
                    }
                }

            }

        }

        // 销售量排行榜数据
        // 商品数据压缩
        let commSaleData = [];

        // 过滤掉不在时间范围内的订单
        saleList = keyList.filter(item => (item.date >= rankStart && item.date < rankEnd));
        // 获得所有出现过的商品
        const searchList = saleList.reduce((searchList, nextSaleList) => (searchList.concat(nextSaleList)), []);
        // 给商品销量赋值
        for (let i = 0; i < searchList.length; i++) {

            // 如果已有数据为空 直接添加数据
            if (commSaleData.length === 0) {
                commSaleData.push({
                    key:searchList[i].keyId,
                    keyId: searchList[i].keyId,
                    keyWord: searchList[i].keyWord,
                    count: searchList[i].count,
                    rank:0
                })
            } else {
                //如果有数据则对比keyId ，如果没有对应keyId则添加数据
                let flag = true;
                for (let j = 0; j < commSaleData.length; j++) {
                    if (searchList[i].keyId === commSaleData[j].keyId) {
                        commSaleData[j].count += searchList[i].count;
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    commSaleData.push({
                        key:searchList[i].keyId,
                        keyId: searchList[i].keyId,
                        keyWord: searchList[i].keyWord,
                        count: searchList[i].count,
                        rank:0
                    })
                }
            }
        }
        commSaleData = commSaleData.sort((a, b) => (b.count - a.count));
        let resultData = [];
        for (let i = 0; i < commSaleData.length; i++) {
            if (i < 9) {
                commSaleData[i].rank = i+1;
                resultData.push(commSaleData[i]);
            }
        }
        commSaleData = resultData;

        const columns = [{
            title: '搜索排名',
            dataIndex: 'rank',
            key: 'rank',
        }, {
            title: '关键词',
            dataIndex: 'keyWord',
            key: 'keyWord',
            render:keyWord=>(<a>{keyWord}</a>)
        }, {
            title: '搜索次数',
            dataIndex: 'count',
            key: 'count',
        }];
        return (
            <Card
                bodyStyle={{padding: 20}}
                hoverable
                style={{width: "100%"}}
            >
                <Row>
                    <Col span={24}>
                        <Row>
                            <Divider style={{marginTop: "1%", marginBottom: "1%"}}>热门搜索</Divider>
                        </Row>
                        <Row>
                            <Col span={4}>
                                <Row>搜索次数</Row>
                                <Row style={{
                                    color: "#000",
                                    fontSize: 30
                                }}>{data.reduce((total, next) => (total + next.total), 0)}次</Row>
                            </Col>
                            <Col span={20}>
                                <Chart height={100} data={data} forceFit padding={[0, 0, 0, 0]}>
                                    <Geom type="area" position="date*total"/>

                                    <Tooltip
                                        crosshairs={{
                                            type: "line"
                                        }}
                                    />
                                </Chart>
                            </Col>
                        </Row>
                        <Row>
                            <Table columns={columns} dataSource={commSaleData} />
                        </Row>
                    </Col>

                </Row>


            </Card>
        )
    }
}

export default visitRank;


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