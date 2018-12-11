import React from 'react';
import SaleRank from './saleRank';
import VisitRank from './visitRank';
import {Menu, Icon, Row, Col, Avatar, Dropdown, Spin, Button, Radio, Input, message,Tabs } from 'antd';

const TabPane = Tabs.TabPane;
export default (props) => {
    return (
        <Tabs defaultActiveKey="sale"  tabBarExtraContent={props.dateFilter}>
            <TabPane tab="销售额" key="sale">
                <SaleRank onEditComm={props.onEditComm} orderList={props.orderList} count={props.count} filter={props.filter} rankStart={props.rankStart} rankEnd={props.rankEnd} />
            </TabPane>
            <TabPane tab="访问量" key="visit">
                <VisitRank onEditComm={props.onEditComm} visitList={props.visitList} count={props.count} filter={props.filter} rankStart={props.rankStart} rankEnd={props.rankEnd} />
            </TabPane>
        </Tabs>
    );
}