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
import ShowImages from '../../../commom/showImages';

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 列表复选
            selectedRowKeys: [],
        });
    }

    componentDidMount() {
        this.props.onFetchSeriesList();
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
            seriesList
        } = this.props;

        const {
            selectedRowKeys,
        } = this.state;

        const columns = [
            {
                title: '系列编号',
                dataIndex: 'seriesId',
                key: 'seriesId',
            }, {
                title: '系列封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '系列名',
                dataIndex: 'seriesName',
                key: 'seriesName',
            }, {
                title: '所属品牌',
                dataIndex: 'brandName',
                key: 'brandName',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: seriesInfo => (
                    <span>
            <Tag color="blue" key={seriesInfo.seriesId + "1"} onClick={() => {
                onEdit(seriesInfo.seriesId);
                this.props.history.push("/commodity/series/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除系列 " + seriesInfo.seriesName + " 吗？"} onConfirm={() => {
                        onDelete(seriesInfo.seriesId);
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={seriesInfo.seriesId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < seriesList.length; i++) {
            options.push({
                key: seriesList[i].seriesId,
                seriesId: seriesList[i].seriesId,
                cover: seriesList[i].cover,
                pictures: seriesList[i].pictures,
                seriesName: seriesList[i].seriesName,
                brandName: seriesList[i].brand.brandName,
                describe: seriesList[i].describe,
                seriesPicList: seriesList[i].seriesPicList,
                actions: seriesList[i],
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
                                    {/*添加系列*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/series/add");
                                        }}> + 添加系列</Button>
                                    </Row>
                                    {/*/!*全选和搜索*!/*/}
                                    {/*<Row type={"flex"} align={"middle"}*/}
                                         {/*style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>*/}
                                        {/*<Col span={10}>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个系列吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDelete(selectedRowKeys);*/}
                                                            {/*let newSeriesList = seriesList;*/}
                                                            {/*for (let j = 0; j < selectedRowKeys.length; j++) {*/}
                                                                {/*for (let i = 0; i < newSeriesList.length; i++) {*/}
                                                                    {/*if (newSeriesList[i].seriesId === selectedRowKeys[j]) {*/}
                                                                        {/*newSeriesList.remove(i);*/}
                                                                        {/*break;*/}
                                                                    {/*}*/}
                                                                {/*}*/}
                                                            {/*}*/}
                                                            {/*this.setState({*/}
                                                                {/*...this.state,*/}
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
                                                        {/*style={{width: "100%"}} placeholder={"系列编号、名字"}*/}
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
                                                            {/*this.searchSeries(this.state.key);*/}
                                                        {/*}*/}
                                                    {/*}}>搜索</Button>*/}
                                                {/*</Col>*/}
                                                {/*<Col span={6}>*/}
                                                    {/*<Button*/}
                                                        {/*style={{width: "100%"}} onClick={() => {*/}
                                                        {/*this.setState({key:""});*/}
                                                        {/*this.searchSeries("")*/}
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
                                                    系列描述：
                                                        {info.describe}
                                                    </Row>
                                                    <Row>
                                                    系列图片：
                                                        {
                                                            info.seriesPicList === undefined || info.seriesPicList.length === 0 ? "无图片" : (
                                                                <ShowImages images={info.seriesPicList.reduce((list,next)=>(list.concat(next.url)),[])} size={50}/>)
                                                        }
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
    const series = state.commodity.series;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        seriesList:series.seriesList,
        isLoading: series.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (seriesIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(seriesIdList, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (seriesId) => {
            dispatch(Actions.Edit(seriesId));
        },
        onFetchSeriesList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));