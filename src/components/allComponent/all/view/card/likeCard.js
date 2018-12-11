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
            commList, // 商品列表
            onEditComm,
        } = this.props;

        let commSaleData = [];
        // 给商品销量赋值
        for (let i = 0; i < commList.length; i++) {

            // 如果已有数据为空 直接添加数据
            if (commSaleData.length === 0) {
                commSaleData.push({
                    key:commList[i].commId,
                    keyId: commList[i].commId,
                    title: commList[i],
                    count: commList[i].like,
                    rank:0
                })
            } else {
                //如果有数据则对比keyId ，如果没有对应keyId则添加数据
                let flag = true;
                for (let j = 0; j < commSaleData.length; j++) {
                    if (commList[i].keyId === commSaleData[j].keyId) {
                        commSaleData[j].count += commList[i].like;
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    commSaleData.push({
                        key:commList[i].commId,
                        keyId: commList[i].commId,
                        title: commList[i],
                        count: commList[i].like,
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
console.log(commSaleData)
        const columns = [{
            title: '收藏排名',
            dataIndex: 'rank',
            key: 'rank',
        }, {
            title: '商品名称',
            dataIndex: 'title',
            key: 'title',
            render:commodity=>(<a onClick={()=>{
                onEditComm(commodity.commId)
            }}>{commodity.title}</a>)
        }, {
            title: '收藏次数',
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
                            <Divider style={{marginTop: "1%", marginBottom: "1%"}}>热门收藏</Divider>
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