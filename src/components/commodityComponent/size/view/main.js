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

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 列表复选
            selectedRowKeys: [],
        });
    }

    componentDidMount() {

        this.props.onFetchSizeList();
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
            sizeList,
        } = this.props;

        const {
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '尺码编号',
                dataIndex: 'sizeId',
                key: 'sizeId',
            }, {
                title: '尺码值',
                dataIndex: 'value',
                key: 'value',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: sizeInfo => (
                    <span>
            <Tag color="blue" key={sizeInfo.sizeId + "1"} onClick={() => {
                onEdit(sizeInfo.sizeId);
                this.props.history.push("/commodity/size/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除尺码 " + sizeInfo.value + " 吗？"} onConfirm={() => {
                        onDelete(sizeInfo.sizeId);
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={sizeInfo.sizeId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < sizeList.length; i++) {
            options.push({
                key: sizeList[i].sizeId,
                sizeId: sizeList[i].sizeId,
                value: sizeList[i].value,
                actions: sizeList[i],
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
                                    {/*添加尺码*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/size/add");
                                        }}> + 添加尺码</Button>
                                    </Row>
                                    {/*/!*全选和搜索*!/*/}
                                    {/*<Row type={"flex"} align={"middle"}*/}
                                         {/*style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>*/}
                                        {/*<Col span={10}>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个尺码吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDelete(selectedRowKeys);*/}
                                                            {/*let newSizeIdList = this.state.sizeList;*/}
                                                            {/*for (let j = 0; j < selectedRowKeys.length; j++) {*/}
                                                                {/*for (let i = 0; i < newSizeIdList.length; i++) {*/}
                                                                    {/*if (newSizeIdList[i].sizeId === selectedRowKeys[j]) {*/}
                                                                        {/*newSizeIdList.remove(i);*/}
                                                                        {/*break;*/}
                                                                    {/*}*/}
                                                                {/*}*/}
                                                            {/*}*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
                                                                {/*sizeList: newSizeIdList,*/}
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
                                                {/*<Input*/}
                                                    {/*value={key}*/}
                                                    {/*style={{width: "50%"}} placeholder={"尺码编号、名字"}*/}
                                                    {/*onChange={(e) => {*/}
                                                        {/*this.setState({*/}
                                                            {/*...this.state,*/}
                                                            {/*key: e.target.value*/}
                                                        {/*})*/}
                                                    {/*}}/>*/}
                                                {/*<Button*/}
                                                    {/*style={{width: "25%"}} type={"primary"} onClick={() => {*/}
                                                    {/*if (key === "") {*/}
                                                        {/*message.error("请输入关键字");*/}
                                                    {/*} else {*/}
                                                        {/*this.searchSize(this.state.key);*/}
                                                    {/*}*/}
                                                {/*}}>搜索</Button>*/}

                                                {/*<Button*/}
                                                    {/*style={{width: "25%"}} onClick={() => {*/}
                                                    {/*this.setState({key:""});*/}
                                                    {/*this.searchSize("")*/}
                                                {/*}}>重置</Button>*/}
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
    const size = state.commodity.size;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        sizeList:size.sizeList,
        isLoading: size.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (sizeId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(sizeId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (sizeId) => {
            dispatch(Actions.Edit(sizeId));
        },
        onFetchSizeList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));