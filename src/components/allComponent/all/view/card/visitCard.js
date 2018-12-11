import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import * as NavActions from '../../../../shareComponents/navLink/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import {Form, Icon, Input, Button, Checkbox, Row, Col, message, Spin, Card, Divider} from 'antd';

const FormItem = Form.Item;

class saleCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({imageHeight:parseInt(100000/window.screen.width)});
        this.screenChange = this.screenChange.bind(this);
        this.resize = this.resize.bind(this);
    }

    screenChange() {
        window.addEventListener('resize', this.resize);
    }

    resize(){
        this.setState({imageHeight:parseInt(100000/window.screen.width)})
    }
    componentDidMount() {
        this.screenChange();
    }
    componentWillUnmount() {
        window.removeEventListener('resize',this.resize);
    }

    render() {
        const {
            visitList, // 访问列表
            dayCount, // 天数
        } = this.props;
        const {
            imageHeight, // 高度
        } = this.state;
        // 销售额数据
        const data = [];
        // 开始年月
        // 初始化横坐标 yyyy/MM/dd 纵坐标total为0
        for (let i = 1; i < dayCount+1; i++) {
            data.push({date: getRecentDaysByCount(i).before, total: 0});
        }
        // 过滤掉不在时间范围内的访问数据
        let saleList = visitList.filter(item => (item.date >= (new Date(getRecentDaysByCount(30).before)).getTime()));
        // 给坐标赋值
        for (let i = 0; i < saleList.length; i++) {
            // 比较访问所在日期
            for (let j = 0; j < dayCount; j++) {
                if (saleList[i].date >= new Date(getRecentDaysByCount(j+1).before).getTime()
                    && saleList[i].date < new Date(getRecentDaysByCount(j).before).getTime()) {
                    data[j].total += saleList[i].count;
                    break;
                }
            }
        }
        // 纵坐标区间大小 设为最大值的1/4
        const cols = {
            total: {
                tickInterval: data.reduce((total, next) => total < next.total ? next.total : total, 0) / 4
            }
        };
        // 获取前两月的访问
        saleList = visitList.filter(item => (item.date >= (new Date(getRecentDaysByCount(60).before)).getTime()));
        // 前1周访问量
        let oneWeekBefore = 0;
        let tweWeekBefore = 0;
        // 前1月访问量
        let oneMouthBefore = 0;
        let tweMouthBefore = 0;
        for (let i = 0; i < saleList.length; i++) {
            // 比较访问所在日期
            if (saleList[i].date >= new Date(getRecentDaysByCount(7).before).getTime()) {
                oneWeekBefore += saleList[i].count;
            }
            if (saleList[i].date >= new Date(getRecentDaysByCount(14).before).getTime()) {
                tweWeekBefore += saleList[i].count;
            }
            if (saleList[i].date >= new Date(getRecentDaysByCount(30).before).getTime()) {
                oneMouthBefore += saleList[i].count;
            }
            if (saleList[i].date >= new Date(getRecentDaysByCount(60).before).getTime()) {
                tweMouthBefore += saleList[i].count;
            }
        }
        tweMouthBefore -= oneMouthBefore;
        tweWeekBefore -= oneWeekBefore;
        // 本月访问量
        let currentMouthVisit = visitList
            .filter(item => (item.date >= new Date(new Date().Format("yyyy/MM")).getTime()))
            .reduce((total,next)=>(total+next.count),0);

        // 今日访问量

        let currentDayVisit = visitList
            .filter(item => (item.date >= new Date(new Date().Format("yyyy/MM/dd")).getTime()))
            .reduce((total,next)=>(total+next.count),0);

        return (
            <Card
                bodyStyle={{padding: 20}}
                hoverable
                style={{width: "100%"}}
            >
                <Row>
                    <Col span={12}>
                        <Row style={{color: "#b7b7b7"}}>
                            今日访问量
                        </Row>
                        <Row style={{color: "#000", fontSize: 30}}>
                            {currentDayVisit}次
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row style={{color: "#b7b7b7"}}>
                            本月访问量
                        </Row>
                        <Row style={{color: "#000", fontSize: 30}}>
                            {currentMouthVisit}次
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Chart height={imageHeight} data={data} scale={cols} forceFit padding={[0, 0, 0, 0]}>
                        <Geom type="area" position="date*total" color={'#88029b'}/>
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                    </Chart>
                </Row>

                <Row>
                    <Col span={24}>
                        <Row>
                            <Divider style={{marginTop:"1%",marginBottom:"1%"}}/>
                        </Row>
                        <Row>
                            <Col span={10}>
                                7天访问量
                            </Col>
                            <Col span={7}>
                                {oneWeekBefore}次
                            </Col>
                            <Col span={7}>
                                {
                                    (  (oneWeekBefore-tweWeekBefore)/(tweWeekBefore===0?(1):(tweWeekBefore)) ) > 0 ? (
                                        <span style={{color: "green", fontSize: 10}}>
                                                            <Icon type="arrow-up" theme="outlined"/>
                                            {"+"+parseInt(((oneWeekBefore-tweWeekBefore)/(tweWeekBefore===0?(1):(tweWeekBefore)) )    * 100) + "%"}
                                                        </span>
                                    ) : (
                                        <span style={{color: "red", fontSize: 10}}>
                                                            <Icon type="arrow-down" theme="outlined"/>
                                            {-parseInt(((oneWeekBefore-tweWeekBefore)/(tweWeekBefore===0?(1):(tweWeekBefore)) )    * 100) + "%"}
                                                        </span>

                                    )
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Divider style={{marginTop:"1%",marginBottom:"1%"}}/>
                        </Row>
                        <Row>
                            <Col span={10}>
                                30天访问量
                            </Col>
                            <Col span={7}>
                                {oneMouthBefore}次
                            </Col>
                            <Col span={7}>

                                {
                                    (  (oneMouthBefore-tweMouthBefore)/(tweMouthBefore===0?(1):(tweMouthBefore)) ) > 0 ? (
                                        <span style={{color: "green", fontSize: 10}}>
                                                            <Icon type="arrow-up" theme="outlined"/>
                                            {"+"+parseInt(((oneMouthBefore-tweMouthBefore)/(tweMouthBefore===0?(1):(tweMouthBefore) ))    * 100) + "%"}
                                                        </span>
                                    ) : (
                                        <span style={{color: "red", fontSize: 10}}>
                                                            <Icon type="arrow-down" theme="outlined"/>
                                            {(-parseInt((oneMouthBefore-tweMouthBefore)/(tweMouthBefore===0?(1):(tweMouthBefore) ))    * 100) + "%"}
                                                        </span>

                                    )
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Divider style={{marginTop:"1%",marginBottom:"1%"}}/>
                        </Row>
                        <Row>
                            <Col span={10}>
                                总访问量
                            </Col>
                            <Col span={14}>
                                {visitList.reduce((total, next) => total + next.count, 0)}次
                            </Col>
                        </Row>
                        <Row>
                            <Divider style={{marginTop:"1%",marginBottom:"1%"}}/>
                        </Row>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default saleCard;


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