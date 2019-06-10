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
    Divider,
    Popconfirm
} from 'antd';
import ShowImage from '../../../commom/showImage';
class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 列表复选
            selectedRowKeys: [],
        });
    }

    componentDidMount() {
        this.props.onFetchExpressList();
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
            expressList,
        } = this.props;

        const {
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '快递编号',
                dataIndex: 'expId',
                key: 'expId',
            }, {
                title: '快递封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '快递名',
                dataIndex: 'expName',
                key: 'expName',
            }, {
                title: '快递价格',
                dataIndex: 'price',
                key: 'price',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: expInfo => (
                    <span>
            <Tag color="blue" key={expInfo.expId + "1"} onClick={() => {
                onEdit(expInfo.expId);
                this.props.history.push("/commodity/express/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除快递 " + expInfo.expName + " 吗？"} onConfirm={() => {

                        onDelete(expInfo.expId);
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={expInfo.expId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < expressList.length; i++) {
            options.push({
                key: expressList[i].expId,
                expId: expressList[i].expId,
                cover: expressList[i].cover,
                price: expressList[i].price,
                expName: expressList[i].expName,
                actions: expressList[i],
            })
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_category || info.isSuper) ? (
                            <Row>
                                <Col>
                                    {/*添加快递*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/express/add");
                                        }}> + 添加快递</Button>
                                    </Row>
                                    {/*/!*全选和搜索*!/*/}
                                    {/*<Row type={"flex"} align={"middle"}*/}
                                         {/*style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>*/}
                                        {/*<Col span={10}>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个快递吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDelete(selectedRowKeys);*/}
                                                            {/*let newExpList = this.state.expList;*/}
                                                            {/*for (let j = 0; j < selectedRowKeys.length; j++) {*/}
                                                                {/*for (let i = 0; i < newExpList.length; i++) {*/}
                                                                    {/*if (newExpList[i].expId === selectedRowKeys[j]) {*/}
                                                                        {/*newExpList.remove(i);*/}
                                                                        {/*break;*/}
                                                                    {/*}*/}
                                                                {/*}*/}
                                                            {/*}*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
                                                                {/*expList: newExpList,*/}
                                                                {/*selectedRowKeys: []*/}
                                                            {/*});*/}
                                                        {/*}} okText="确认" cancelText="点错了">*/}
                                                {/*<Button type={"danger"}*/}
                                                        {/*loading={isLoading}*/}
                                                        {/*disabled={!selectedRowKeys.length > 0}*/}
                                                {/*>删除</Button>*/}
                                            {/*</Popconfirm>*/}

                                        {/*</Col>*/}
                                        {/*<Col span={14} style={{textAlign: "right"}}>*/}
                                            {/*<Row type={"flex"} align={"middle"}>*/}
                                                {/*<Col span={12} style={{paddingRight:5}}>*/}
                                                    {/*<Input*/}
                                                        {/*value={key}*/}
                                                        {/*style={{width: "100%"}} placeholder={"快递编号、名字"}*/}
                                                        {/*onChange={(e) => {*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
                                                                {/*key: e.target.value*/}
                                                            {/*})*/}
                                                        {/*}}/>*/}
                                                {/*</Col>*/}
                                                {/*<Col span={6} style={{paddingRight:5}}>*/}
                                                    {/*<Button*/}
                                                        {/*style={{width: "100%"}} type={"primary"} onClick={() => {*/}
                                                        {/*if (key === "") {*/}
                                                            {/*message.error("请输入关键字");*/}
                                                        {/*} else {*/}
                                                            {/*this.searchExp(this.state.key);*/}
                                                        {/*}*/}
                                                    {/*}}>搜索</Button>*/}
                                                {/*</Col>*/}
                                                {/*<Col span={6}>*/}
                                                    {/*<Button*/}
                                                        {/*style={{width: "100%"}} onClick={() => {*/}
                                                        {/*this.setState({key:""});*/}
                                                        {/*this.searchExp("")*/}
                                                    {/*}}>重置</Button>*/}
                                                {/*</Col>*/}

                                            {/*</Row>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*表格数据*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            style={{width: "100%"}}
                                            rowSelection={{
                                                selectedRowKeys,
                                                onChange: (selectedRowKeys) => {
                                                    this.setState({...this.state, selectedRowKeys});
                                                    console.log(this.state.selectedRowKeys)
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
    const express = state.commodity.express;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        expressList:express.expressList,
        isLoading: express.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (expIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(expIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (expId) => {
            dispatch(Actions.Edit(expId));
        },
        onFetchExpressList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));