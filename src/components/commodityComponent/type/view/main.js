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
        this.props.onFetchTypeList();
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
            typeList,
        } = this.props;

        const {
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '类型编号',
                dataIndex: 'typeId',
                key: 'typeId',
            }, {
                title: '类型封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '类型名',
                dataIndex: 'typeName',
                key: 'typeName',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: typeInfo => (
                    <span>
            <Tag color="blue" key={typeInfo.typeId + "1"} onClick={() => {
                onEdit(typeInfo.typeId);
                this.props.history.push("/commodity/type/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除类型 " + typeInfo.typeName + " 吗？"} onConfirm={() => {
                        onDelete(typeInfo.typeId);
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={typeInfo.typeId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < typeList.length; i++) {
            options.push({
                key: typeList[i].typeId,
                typeId: typeList[i].typeId,
                cover: typeList[i].cover,
                typeName: typeList[i].typeName,
                describe: typeList[i].describe,
                actions: typeList[i],
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
                                    {/*添加类型*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/type/add");
                                        }}> + 添加类型</Button>
                                    </Row>
                                    {/*/!*全选和搜索*!/*/}
                                    {/*<Row type={"flex"} align={"middle"}*/}
                                         {/*style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>*/}
                                        {/*<Col span={10}>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个类型吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDelete(selectedRowKeys);*/}
                                                            {/*let newTypeList = this.state.typeList;*/}
                                                            {/*for (let j = 0; j < selectedRowKeys.length; j++) {*/}
                                                                {/*for (let i = 0; i < newTypeList.length; i++) {*/}
                                                                    {/*if (newTypeList[i].typeId === selectedRowKeys[j]) {*/}
                                                                        {/*newTypeList.remove(i);*/}
                                                                        {/*break;*/}
                                                                    {/*}*/}
                                                                {/*}*/}
                                                            {/*}*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
                                                                {/*typeList: newTypeList,*/}
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
                                                        {/*style={{width: "100%"}} placeholder={"类型编号、名字"}*/}
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
                                                            {/*this.searchType(this.state.key);*/}
                                                        {/*}*/}
                                                    {/*}}>搜索</Button>*/}
                                                {/*</Col>*/}
                                                {/*<Col span={6}>*/}
                                                    {/*<Button*/}
                                                        {/*style={{width: "100%"}} onClick={() => {*/}
                                                        {/*this.setState({key:""});*/}
                                                        {/*this.searchType("")*/}
                                                    {/*}}>重置</Button>*/}
                                                {/*</Col>*/}

                                            {/*</Row>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*表格数据*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            defaultExpandAllRows
                                            expandedRowRender={info =>
                                                <span style={{margin: 0}}>
                                                    <Row>
                                                    类型描述：
                                                        {info.describe}
                                                    </Row>
                                                </span>}
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
    const type = state.commodity.type;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        typeList :type.typeList,
        isLoading: type.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (typeIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(typeIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (typeId) => {
            dispatch(Actions.Edit(typeId));
        },
        onFetchTypeList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));