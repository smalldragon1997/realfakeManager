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
        this.props.onFetchQualityList();
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
            qualityList,
        } = this.props;

        const {
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '品质编号',
                dataIndex: 'qualId',
                key: 'qualId',
            }, {
                title: '品质名',
                dataIndex: 'qualName',
                key: 'qualName',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: qualityInfo => (
                    <span>
            <Tag color="blue" key={qualityInfo.qualId + "1"} onClick={() => {
                onEdit(qualityInfo.qualId);
                this.props.history.push("/commodity/quality/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除品质 " + qualityInfo.qualName + " 吗？"} onConfirm={() => {
                        onDelete(qualityInfo.qualId);
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={qualityInfo.qualId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < qualityList.length; i++) {
            options.push({
                key: qualityList[i].qualId,
                qualId: qualityList[i].qualId,
                qualName: qualityList[i].qualName,
                actions: qualityList[i],
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
                                    {/*添加品质*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} quality={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/quality/add");
                                        }}> + 添加品质</Button>
                                    </Row>
                                    {/*/!*全选和搜索*!/*/}
                                    {/*<Row type={"flex"} align={"middle"}*/}
                                         {/*style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>*/}
                                        {/*<Col span={10}>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个品质吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDelete(selectedRowKeys);*/}
                                                            {/*let newQualityList = this.state.qualityList;*/}
                                                            {/*for (let j = 0; j < selectedRowKeys.length; j++) {*/}
                                                                {/*for (let i = 0; i < newQualityList.length; i++) {*/}
                                                                    {/*if (newQualityList[i].qualId === selectedRowKeys[j]) {*/}
                                                                        {/*newQualityList.remove(i);*/}
                                                                        {/*break;*/}
                                                                    {/*}*/}
                                                                {/*}*/}
                                                            {/*}*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
                                                                {/*qualityList: newQualityList,*/}
                                                                {/*selectedRowKeys: []*/}
                                                            {/*});*/}
                                                        {/*}} okText="确认" cancelText="点错了">*/}
                                                {/*<Button quality={"danger"}*/}
                                                        {/*loading={isLoading}*/}
                                                        {/*disabled={!selectedRowKeys.length > 0}*/}
                                                {/*>删除</Button>*/}
                                            {/*</Popconfirm>*/}

                                        {/*</Col>*/}
                                        {/*<Col span={14} style={{textAlign: "right"}}>*/}
                                            {/*<Row type={"flex"} align={"middle"}>*/}
                                                {/*<Input*/}
                                                    {/*value={key}*/}
                                                    {/*style={{width: "50%"}} placeholder={"品质编号、名字"}*/}
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
                                                        {/*this.searchQuality(this.state.key);*/}
                                                    {/*}*/}
                                                {/*}}>搜索</Button>*/}

                                                {/*<Button*/}
                                                    {/*style={{width: "25%"}} onClick={() => {*/}
                                                    {/*this.setState({key:""});*/}
                                                    {/*this.searchQuality("")*/}
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
    const quality = state.commodity.quality;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        qualityList: quality.qualityList,
        isLoading: quality.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (qualId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(qualId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (qualId) => {
            dispatch(Actions.Edit(qualId));
        },
        onFetchQualityList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));