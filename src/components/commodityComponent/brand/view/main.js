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
            // 搜索条件
            keyWord: "",
            // 列表复选
            selectedRowKeys: [],
        });
    }

    componentDidMount() {
        this.props.onFetchBrandList();
    }


    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            onEdit,
            onDelete,
            isLoading,
            brandList,
        } = this.props;

        const {
            selectedRowKeys,
            keyWord
        } = this.state;

        const columns = [
            {
                title: '品牌编号',
                dataIndex: 'brandId',
                key: 'brandId',
            }, {
                title: '品牌封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '品牌名',
                dataIndex: 'brandName',
                key: 'brandName',
            }, {
                title: '尺码表',
                dataIndex: 'sizeTable',
                key: 'sizeTable',
                render: sizeTable => <ShowImage image={sizeTable} size={50}/>
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: brandInfo => (
                    <span>
            <Tag color="blue" key={brandInfo.brandId + "1"} onClick={() => {
                onEdit(brandInfo.brandId);
                this.props.history.push("/commodity/brand/info");
            }}>编辑</Tag>
                    <Popconfirm placement="top" title={"确定删除品牌 " + brandInfo.brandName + " 吗？"} onConfirm={() => {
                        onDelete(brandInfo.brandId);
                    }} okText="确认" cancelText="点错了">
                    <Tag color="red" key={brandInfo.brandId + "2"}>删除</Tag>
                    </Popconfirm>
        </span>
                ),
            }];

        // 多选列表
        let options = [];
        for (let i = 0; i < brandList.length; i++) {
            options.push({
                key: brandList[i].brandId,
                brandId: brandList[i].brandId,
                sizeTable: brandList[i].sizeTable,
                cover: brandList[i].cover,
                brandPicList: brandList[i].brandPicList,
                brandName: brandList[i].brandName,
                describe: brandList[i].describe,
                actions: brandList[i],
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
                                    {/*添加品牌*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: "1%"}}>
                                        <Button
                                            style={{width: "100%"}} type={"dashed"} onClick={() => {
                                            this.props.history.push("/commodity/brand/add");
                                        }}> + 添加品牌</Button>
                                    </Row>
                                    {/*/!*全选和搜索*!/*/}
                                    {/*<Row type={"flex"} align={"middle"}*/}
                                         {/*style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>*/}
                                        {/*<Col span={10}>*/}
                                            {/*<Popconfirm placement="top"*/}
                                                        {/*title={"确定删除这" + selectedRowKeys.length + "个品牌吗？"}*/}
                                                        {/*onConfirm={() => {*/}
                                                            {/*onDelete(selectedRowKeys);*/}
                                                            {/*let newBrandList = brandList;*/}
                                                            {/*for (let j = 0; j < selectedRowKeys.length; j++) {*/}
                                                                {/*for (let i = 0; i < newBrandList.length; i++) {*/}
                                                                    {/*if (newBrandList[i].brandId === selectedRowKeys[j]) {*/}
                                                                        {/*newBrandList.remove(i);*/}
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
                                        {/*/!*<Col span={14} style={{textAlign: "right"}}>*!/*/}
                                            {/*/!*<Row type={"flex"} align={"middle"}>*!/*/}
                                                {/*/!*<Col span={12} style={{paddingRight:5}}>*!/*/}
                                                    {/*/!*<Input*!/*/}
                                                        {/*/!*value={keyWord}*!/*/}
                                                        {/*/!*style={{width: "100%"}} placeholder={"品牌编号、名字"}*!/*/}
                                                        {/*/!*onChange={(e) => {*!/*/}
                                                            {/*/!*this.setState({*!/*/}
                                                                {/*/!*...this.state,*!/*/}
                                                                {/*/!*keyWord: e.target.value*!/*/}
                                                            {/*/!*})*!/*/}
                                                        {/*/!*}}/>*!/*/}
                                                {/*/!*</Col>*!/*/}
                                                {/*/!*<Col span={6} style={{paddingRight:5}}>*!/*/}
                                                    {/*/!*<Button*!/*/}
                                                        {/*/!*style={{width: "100%"}} type={"primary"} onClick={() => {*!/*/}
                                                        {/*/!*if (keyWord === "") {*!/*/}
                                                            {/*/!*message.error("请输入关键字");*!/*/}
                                                        {/*/!*} else {*!/*/}

                                                        {/*/!*}*!/*/}
                                                    {/*/!*}}>搜索</Button>*!/*/}
                                                {/*/!*</Col>*!/*/}
                                                {/*/!*<Col span={6}>*!/*/}
                                                    {/*/!*<Button*!/*/}
                                                        {/*/!*style={{width: "100%"}} onClick={() => {*!/*/}
                                                        {/*/!*this.setState({keyWord:""});*!/*/}
                                                    {/*/!*}}>重置</Button>*!/*/}
                                                {/*/!*</Col>*!/*/}

                                            {/*/!*</Row>*!/*/}
                                        {/*/!*</Col>*!/*/}
                                    {/*</Row>*/}
                                    {/*表格数据*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            defaultExpandAllRows
                                            expandedRowRender={info =>
                                                <span style={{margin: 0}}>
                                                    <Row>
                                                    品牌描述：
                                                        {info.describe}
                                                    </Row>
                                                    <Row>
                                                    品牌图片：
                                                        {
                                                            info.brandPicList === undefined || info.brandPicList.length === 0 ? "无图片" : (
                                                                <ShowImages images={info.brandPicList.reduce((list,next)=>(list.concat(next.url)),[])} size={50}/>)
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
    const brand = state.commodity.brand;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        brandList:brand.brandList,
        isLoading: brand.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (brandId) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteBrand(brandId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onEdit: (brandId) => {
            dispatch(Actions.Edit(brandId));
        },
        onFetchBrandList: () => {
            dispatch(Actions.Start());
            dispatch(Actions.Fetching());
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));