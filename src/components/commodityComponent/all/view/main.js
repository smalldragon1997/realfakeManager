import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as BrandActions from '../../brand/actions';
import * as SeriesActions from '../../series/actions';
import * as TypeActions from '../../type/actions';
import * as UniteActions from '../../unite/actions';
import * as QualityActions from '../../quality/actions';
import * as SizeActions from '../../size/actions';
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
    Checkbox,
    Input, message, Table, Tag, Select, Divider, Popconfirm, Modal, Upload, Timeline, Card, List, DatePicker, Radio
} from 'antd';
import {getCommListByFilter} from '../selector';

const {Meta} = Card;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';


class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({

            brandId: undefined,
            seriesId: undefined,
            typeId: undefined,
            uniteId: undefined,
            price: 1000000,
            sort: "date",
            desc: true,

            dateStart: 0, // 默认开始时间
            dateEnd: 9999999999999, // 默认结束时间

            pageNum: 1, //默认当前页
            pageSize: 15, //默认当前页数据量
            keyWord: undefined, // 默认搜索条件

        });
        // 回到页面顶部
        window.scrollTo(0, 0);
    }

    // 初始化获取数据
    componentDidMount() {
        this.props.onFilter(this.state);
        this.props.onFetchBrandList();
        this.props.onFetchSeriesList();
        this.props.onFetchTypeList();
        this.props.onFetchUniteList();
    }


    render() {
        const {
            auth, // 权限信息
            info, // 管理员信息
            isLoading, // 是否加载中

            onFilter, //搜索
            onEditCommodity, // 查看详情
            onDeleteCommodity, // 删除商品


            commList, // 商品列表
            seriesList, // 系列列表
            brandList, // 品牌列表
            typeList, // 类型列表
            uniteList, // 联名列表
        } = this.props;

        const {
            pageSize, // 当前页
            pageNum,
            brandId,
            seriesId,
            typeId,
            uniteId,

            keyWord, // 搜索关键字
            dateStart, // 开始时间
            dateEnd, // 结束时间
            sort,
            desc,
            price,

        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_comm || info.isSuper) ? (
                            <Row>
                                {/*添加商品*/}
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingBottom: "1%"}}>
                                    <Button style={{width: "100%"}} onClick={() => {
                                        this.props.history.push("/commodity/all/add");
                                    }}>添加商品</Button>
                                </Row>
                                {/*排序方式和搜索关键字*/}
                                <Row type={"flex"} align={"middle"}
                                     style={{padding: "3%", paddingTop: 0, paddingBottom: "1%"}}>
                                    <Col span={15} style={{textAlign: "right", paddingRight: 5}}>

                                        <RadioGroup
                                            buttonStyle="solid"
                                            style={{width: "100%"}}
                                            onChange={(e) => {
                                                onFilter({
                                                    brandId: brandId,
                                                    seriesId: seriesId,
                                                    typeId: typeId,
                                                    uniteId: uniteId,
                                                    price: price,
                                                    sort: e.target.value,
                                                    desc: desc,
                                                    dateStart: dateStart,
                                                    dateEnd: dateEnd,
                                                    keyWord: keyWord,
                                                    pageNum: 1,
                                                    pageSize: pageSize
                                                });
                                                this.setState({
                                                    sort: e.target.value,
                                                    pageNum: 1
                                                });
                                            }} defaultValue="date">
                                            <RadioButton value="like" onClick={(e) => {
                                                if (sort === "like") {
                                                    onFilter({
                                                        brandId: brandId,
                                                        seriesId: seriesId,
                                                        typeId: typeId,
                                                        uniteId: uniteId,
                                                        price: price,
                                                        sort: sort,
                                                        desc: !desc,
                                                        dateStart: dateStart,
                                                        dateEnd: dateEnd,
                                                        keyWord: keyWord,
                                                        pageNum: 1,
                                                        pageSize: pageSize
                                                    });
                                                    this.setState({
                                                        pageNum: 1,
                                                        desc: !desc
                                                    });

                                                }
                                            }}>
                                                收藏量{   // 如果当前没有选中 则不显示箭头
                                                sort === "like" ? (
                                                    // 根据desc判断箭头指示方向
                                                    desc ? (
                                                        <Icon type="arrow-down" theme="outlined"/>
                                                    ) : (
                                                        <Icon type="arrow-up" theme="outlined"/>
                                                    )
                                                ) : null
                                            }
                                            </RadioButton>
                                            <RadioButton value="glance" onClick={(e) => {
                                                if (sort === "glance") {
                                                    onFilter({
                                                        brandId: brandId,
                                                        seriesId: seriesId,
                                                        typeId: typeId,
                                                        uniteId: uniteId,
                                                        price: price,
                                                        sort: sort,
                                                        desc: !desc,
                                                        dateStart: dateStart,
                                                        dateEnd: dateEnd,
                                                        keyWord: keyWord,
                                                        pageNum: 1,
                                                        pageSize: pageSize
                                                    });
                                                    this.setState({
                                                        pageNum: 1,
                                                        desc: !desc
                                                    })
                                                }
                                            }}>
                                                浏览量{   // 如果当前没有选中 则不显示箭头
                                                sort === "glance" ? (
                                                    // 根据desc判断箭头指示方向
                                                    desc ? (
                                                        <Icon type="arrow-down" theme="outlined"/>
                                                    ) : (
                                                        <Icon type="arrow-up" theme="outlined"/>
                                                    )
                                                ) : null
                                            }
                                            </RadioButton>
                                            <RadioButton value="sales" onClick={(e) => {
                                                if (sort === "sales") {
                                                    onFilter({
                                                        brandId: brandId,
                                                        seriesId: seriesId,
                                                        typeId: typeId,
                                                        uniteId: uniteId,
                                                        price: price,
                                                        sort: sort,
                                                        desc: !desc,
                                                        dateStart: dateStart,
                                                        dateEnd: dateEnd,
                                                        keyWord: keyWord,
                                                        pageNum: 1,
                                                        pageSize: pageSize
                                                    });
                                                    this.setState({
                                                        pageNum: 1,
                                                        desc: !desc
                                                    })
                                                }
                                            }}>
                                                销量{   // 如果当前没有选中 则不显示箭头
                                                sort === "sales" ? (
                                                    // 根据desc判断箭头指示方向
                                                    desc ? (
                                                        <Icon type="arrow-down" theme="outlined"/>
                                                    ) : (
                                                        <Icon type="arrow-up" theme="outlined"/>
                                                    )
                                                ) : null
                                            }</RadioButton>
                                            <RadioButton value="price" onClick={(e) => {
                                                if (sort === "price") {
                                                    onFilter({
                                                        brandId: brandId,
                                                        seriesId: seriesId,
                                                        typeId: typeId,
                                                        uniteId: uniteId,
                                                        price: price,
                                                        sort: sort,
                                                        desc: !desc,
                                                        dateStart: dateStart,
                                                        dateEnd: dateEnd,
                                                        keyWord: keyWord,
                                                        pageNum: 1,
                                                        pageSize: pageSize
                                                    });
                                                    this.setState({
                                                        pageNum: 1,
                                                        desc: !desc
                                                    })
                                                }
                                            }}>
                                                价格{   // 如果当前没有选中 则不显示箭头
                                                sort === "price" ? (
                                                    // 根据desc判断箭头指示方向
                                                    desc ? (
                                                        <Icon type="arrow-down" theme="outlined"/>
                                                    ) : (
                                                        <Icon type="arrow-up" theme="outlined"/>
                                                    )
                                                ) : null
                                            }</RadioButton>
                                            <RadioButton value="date" onClick={(e) => {
                                                if (sort === "date") {
                                                    onFilter({
                                                        brandId: brandId,
                                                        seriesId: seriesId,
                                                        typeId: typeId,
                                                        uniteId: uniteId,
                                                        price: price,
                                                        sort: sort,
                                                        desc: !desc,
                                                        dateStart: dateStart,
                                                        dateEnd: dateEnd,
                                                        keyWord: keyWord,
                                                        pageNum: 1,
                                                        pageSize: pageSize
                                                    });
                                                    this.setState({
                                                        pageNum: 1,
                                                        desc: !desc
                                                    })
                                                }
                                            }}>
                                                日期{   // 如果当前没有选中 则不显示箭头
                                                sort === "date" ? (
                                                    // 根据desc判断箭头指示方向
                                                    desc ? (
                                                        <Icon type="arrow-down" theme="outlined"/>
                                                    ) : (
                                                        <Icon type="arrow-up" theme="outlined"/>
                                                    )
                                                ) : null
                                            }</RadioButton>
                                        </RadioGroup>
                                    </Col>
                                    <Col span={9}>
                                        <Row type={"flex"} align={"middle"}>
                                            <Col span={12} style={{paddingRight: 5}}>
                                                <Input
                                                    value={keyWord}
                                                    style={{width: "100%"}} placeholder={"商品编号、标题、描述"}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            keyWord: e.target.value
                                                        })
                                                    }}/>
                                            </Col>
                                            <Col span={6} style={{paddingRight: 5}}>
                                                <Button
                                                    style={{width: "100%"}} type={"primary"} onClick={() => {
                                                    if (keyWord === "" || keyWord === undefined) {
                                                        message.error("请输入关键字");
                                                    } else {
                                                        onFilter({
                                                            brandId: brandId,
                                                            seriesId: seriesId,
                                                            typeId: typeId,
                                                            uniteId: uniteId,
                                                            price: price,
                                                            sort: sort,
                                                            desc: desc,
                                                            dateStart: dateStart,
                                                            dateEnd: dateEnd,
                                                            keyWord: keyWord,
                                                            pageNum: 1,
                                                            pageSize: pageSize
                                                        });
                                                        this.setState({pageNum: 1})
                                                    }
                                                }}>搜索</Button>
                                            </Col>
                                            <Col span={6}>
                                                <Button
                                                    style={{width: "100%"}} onClick={() => {
                                                    onFilter({
                                                        brandId: undefined,
                                                        seriesId: undefined,
                                                        typeId: undefined,
                                                        uniteId: undefined,
                                                        price: 1000000,
                                                        sort: "date",
                                                        desc: true,
                                                        dateStart: 0,
                                                        dateEnd: 9999999999999,
                                                        keyWord: undefined,
                                                        pageNum: 1,
                                                        pageSize: 15
                                                    });
                                                    this.setState({
                                                        brandId: undefined,
                                                        seriesId: undefined,
                                                        typeId: undefined,
                                                        uniteId: undefined,
                                                        price: 1000000,
                                                        sort: "date",
                                                        desc: true,

                                                        dateStart: 0, // 默认开始时间
                                                        dateEnd: 9999999999999, // 默认结束时间

                                                        pageNum: 1, //默认当前页
                                                        pageSize: 15, //默认当前页数据量
                                                        keyWord: undefined, // 默认搜索条件
                                                    });
                                                }}>重置</Button>
                                            </Col>

                                        </Row>

                                    </Col>

                                </Row>
                                {/*筛选条件和时间*/}
                                <Row style={{textAlign: "right", padding: "3%", paddingBottom: "1%", paddingTop: 0}}>
                                    <Col span={11}>
                                        <Row type={"flex"} align={"middle"}>
                                            <Col span={5}>
                                                <Select notFoundContent={"没有匹配内容"} allowClear
                                                        dropdownMatchSelectWidth={false}
                                                        disabled={isLoading}
                                                        showSearch
                                                        style={{width: "100%", paddingRight: 5}}
                                                        placeholder="品牌"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            onFilter({
                                                                brandId: e,
                                                                seriesId: seriesId,
                                                                typeId: typeId,
                                                                uniteId: uniteId,
                                                                price: price,
                                                                sort: sort,
                                                                desc: desc,
                                                                dateStart: dateStart,
                                                                dateEnd: dateEnd,
                                                                keyWord: keyWord,
                                                                pageNum: 1,
                                                                pageSize: pageSize
                                                            });
                                                            this.setState({
                                                                brandId: e,
                                                                pageNum: 1
                                                            });
                                                        }}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {   //遍历选定品牌后该品牌下的系列
                                                        brandList.map((item, index) => (
                                                            <Option value={item.brandId}
                                                                    key={index}>{item.brandName}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={5}>
                                                <Select notFoundContent={"没有匹配内容"} allowClear
                                                        dropdownMatchSelectWidth={false}
                                                        disabled={isLoading}
                                                        showSearch
                                                        style={{width: "100%", paddingRight: 5}}
                                                        placeholder="系列"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            onFilter({
                                                                brandId: brandId,
                                                                seriesId: e,
                                                                typeId: typeId,
                                                                uniteId: uniteId,
                                                                price: price,
                                                                sort: sort,
                                                                desc: desc,
                                                                dateStart: dateStart,
                                                                dateEnd: dateEnd,
                                                                keyWord: keyWord,
                                                                pageNum: 1,
                                                                pageSize: pageSize
                                                            });
                                                            this.setState({
                                                                seriesId: e,
                                                                pageNum: 1
                                                            });
                                                        }}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {   //遍历选定品牌后该品牌下的系列
                                                        brandId === undefined ? (
                                                            seriesList.map((item, index) => (
                                                                <Option value={item.seriesId}
                                                                        key={index}>{item.seriesName}</Option>
                                                            ))
                                                        ) : (
                                                            seriesList
                                                                .filter(item => (item.brand !== null && item.brand.brandId === brandId))
                                                                .map((item, index) => (
                                                                    <Option value={item.seriesId}
                                                                            key={index}>{item.seriesName}</Option>
                                                                ))
                                                        )

                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={5}>
                                                <Select notFoundContent={"没有匹配内容"} allowClear
                                                        dropdownMatchSelectWidth={false}
                                                        disabled={isLoading}
                                                        showSearch
                                                        style={{width: "100%", paddingRight: 5}}
                                                        placeholder="类型"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            onFilter({
                                                                brandId: brandId,
                                                                seriesId: seriesId,
                                                                typeId: e,
                                                                uniteId: uniteId,
                                                                price: price,
                                                                sort: sort,
                                                                desc: desc,
                                                                dateStart: dateStart,
                                                                dateEnd: dateEnd,
                                                                keyWord: keyWord,
                                                                pageNum: 1,
                                                                pageSize: pageSize
                                                            });
                                                            this.setState({
                                                                typeId: e,
                                                                pageNum: 1
                                                            });
                                                        }}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {   //遍历选定品牌后该品牌下的系列
                                                        typeList.map((item, index) => (
                                                            <Option value={item.typeId}
                                                                    key={index}>{item.typeName}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={5}>
                                                <Select notFoundContent={"没有匹配内容"} allowClear
                                                        dropdownMatchSelectWidth={false}
                                                        disabled={isLoading}
                                                        showSearch
                                                        style={{width: "100%", paddingRight: 5}}
                                                        placeholder="联名"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            onFilter({
                                                                brandId: brandId,
                                                                seriesId: seriesId,
                                                                typeId: typeId,
                                                                uniteId: e,
                                                                price: price,
                                                                sort: sort,
                                                                desc: desc,
                                                                dateStart: dateStart,
                                                                dateEnd: dateEnd,
                                                                keyWord: keyWord,
                                                                pageNum: 1,
                                                                pageSize: pageSize
                                                            });
                                                            this.setState({
                                                                uniteId: e,
                                                                pageNum: 1
                                                            });
                                                        }}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {   //遍历选定品牌后该品牌下的系列
                                                        uniteList.map((item, index) => (
                                                            <Option value={item.uniteId}
                                                                    key={index}>{item.uniteName}</Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={4}>
                                                <Select notFoundContent={"没有匹配内容"} allowClear
                                                        dropdownMatchSelectWidth={false}
                                                        disabled={isLoading}
                                                        showSearch
                                                        style={{width: "100%", paddingRight: 5}}
                                                        placeholder="价格"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            onFilter({
                                                                brandId: brandId,
                                                                seriesId: seriesId,
                                                                typeId: typeId,
                                                                uniteId: uniteId,
                                                                price: e,
                                                                sort: sort,
                                                                desc: desc,
                                                                dateStart: dateStart,
                                                                dateEnd: dateEnd,
                                                                keyWord: keyWord,
                                                                pageNum: 1,
                                                                pageSize: pageSize
                                                            });
                                                            this.setState({
                                                                price: e,
                                                                pageNum: 1
                                                            });
                                                        }}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value={200} key={200}>200以内</Option>
                                                    <Option value={300} key={300}>300以内</Option>
                                                    <Option value={400} key={400}>400以内</Option>
                                                    <Option value={500} key={500}>500以内</Option>
                                                    <Option value={600} key={600}>600以内</Option>
                                                    <Option value={100000} key={100000}>我有钱</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={13} style={{textAlign: "right"}}>
                                        <RangePicker
                                            style={{paddingRight: 5}}
                                            placeholder={["开始日期", "结束日期"]}
                                            format={dateFormat}
                                            onChange={(e, date) => {
                                                const start = date[0] === "" ? 0 : new Date(date[0]).getTime();
                                                const end = date[1] === "" ? 9999999999999 : new Date(date[1]).getTime() + 24 * 60 * 60 * 1000;

                                                onFilter({
                                                    brandId: brandId,
                                                    seriesId: seriesId,
                                                    typeId: typeId,
                                                    uniteId: uniteId,
                                                    price: price,
                                                    sort: sort,
                                                    desc: desc,
                                                    dateStart: start,
                                                    dateEnd: end,
                                                    keyWord: keyWord,
                                                    pageNum: 1,
                                                    pageSize: pageSize
                                                });
                                                this.setState({
                                                    dateStart: start,
                                                    dateEnd: end
                                                });
                                            }}
                                        />
                                        <Button onClick={() => {
                                            this.setState({
                                                dateStart: 0,
                                                dateEnd: 9999999999999,
                                                pageNum: 1
                                            });
                                            onFilter({
                                                brandId: brandId,
                                                seriesId: seriesId,
                                                typeId: typeId,
                                                uniteId: uniteId,
                                                price: price,
                                                sort: sort,
                                                desc: desc,
                                                dateStart: 0,
                                                dateEnd: 9999999999999,
                                                keyWord: keyWord,
                                                pageNum: 1,
                                                pageSize: pageSize
                                            });
                                        }}>重置时间范围</Button>
                                    </Col>

                                </Row>
                                {/*商品列表*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <List
                                        pagination={{
                                            current: pageNum,
                                            onChange: (page) => {
                                                this.setState({pageNum: page});
                                                onFilter({
                                                    brandId: brandId,
                                                    seriesId: seriesId,
                                                    typeId: typeId,
                                                    uniteId: uniteId,
                                                    price: price,
                                                    sort: sort,
                                                    desc: desc,
                                                    dateStart: dateStart,
                                                    dateEnd: dateEnd,
                                                    keyWord: keyWord,
                                                    pageNum: page,
                                                    pageSize: pageSize
                                                });

                                                // 回到页面顶部
                                                window.scrollTo(0, 0);
                                            },
                                            showQuickJumper: true,
                                            showTotal: (total, range) => `第${range[0]}-${range[1]}个商品 总个数 ${total} 个`,
                                            pageSize: pageSize,
                                        }}
                                        grid={{gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3}}
                                        dataSource={commList}
                                        renderItem={item => (
                                            <List.Item>
                                                <Card
                                                    actions={[
                                                        <Icon type="edit"
                                                              onClick={() => {
                                                                  onEditCommodity(item.commId);
                                                                  this.props.history.push("/commodity/all/info")
                                                              }}/>,
                                                        <Popconfirm placement="top" title={"确定删除此商品吗？"}
                                                                    onConfirm={() => {
                                                                        onDeleteCommodity(item.commId);
                                                                        // 不知道为什么改这里就可以更新商品store状态
                                                                        let newCommList = commList;
                                                                        for (let i = 0; i < newCommList.length; i++) {
                                                                            if (newCommList[i].commId === item.commId) {
                                                                                newCommList.remove(i);
                                                                                break;
                                                                            }
                                                                        }
                                                                    }} okText="确认" cancelText="点错了">
                                                            <Icon type="delete"/>
                                                        </Popconfirm>
                                                    ]}
                                                    cover={
                                                        <img src={item.cover}
                                                             style={{width: "100%"}}
                                                        />
                                                    }
                                                >
                                                    {/*{*/}
                                                        {/*typeList.length !== 0 ? (*/}
                                                            {/*<Row style={{marginBottom: "4%"}}>*/}
                                                                {/*{*/}
                                                                    {/*typeList*/}
                                                                        {/*.filter((item1,index)=>{*/}
                                                                            {/*for (let i = 0;i<item.typeId.length;i++){*/}
                                                                                {/*if(item.typeId[i]==item1.typeId)*/}
                                                                                    {/*return true;*/}
                                                                            {/*}*/}
                                                                            {/*return false;*/}
                                                                        {/*})*/}
                                                                        {/*.map((item, index) => {*/}
                                                                        {/*return (*/}
                                                                            {/*<Tag color="blue"*/}
                                                                                 {/*key={index}>{item.typeName}</Tag>*/}
                                                                        {/*)*/}
                                                                    {/*})*/}
                                                                {/*}*/}
                                                            {/*</Row>*/}
                                                        {/*) : null*/}
                                                    {/*}*/}
                                                    <Meta //商品信息
                                                        style={{paddingBottom: 10}}
                                                        title={// 如果售空显示为红色
                                                            item.isOut ? (
                                                                <span style={{
                                                                    fontWeight: "bold",
                                                                    color: "#ff0006"
                                                                }}>{item.title}：已售空</span>
                                                            ) : (
                                                                <span style={{fontWeight: "bold"}}>{item.title}</span>
                                                            )
                                                        }
                                                        description={
                                                            <span>
                                                                <img
                                                                    src={"https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/left.png"}/>

                                                                {"" + item.describe.slice(0, 10) + "..."}
                                                                <img
                                                                    src={"https://shose-file.oss-cn-shenzhen.aliyuncs.com/shoseImg/common/right.png"}/>
                                                            </span>
                                                        }
                                                    />
                                                    <Row type="flex" justify="space-between">
                                                        <Col span={4}>
                                                    <span style={{
                                                        fontWeight: "bold",
                                                        color: "#098aff"
                                                    }}>{"￥" + Math.min.apply(null, item.price)}</span>
                                                        </Col>
                                                        <Col span={10} style={{textAlign: "right"}}>

                                                            <Icon type="eye"
                                                                  style={{fontSize: 15, color: "#0082ff"}}/><span
                                                            style={{marginRight: "10%"}}> {item.glance}</span>
                                                            <Icon type="heart" theme="filled" style={{
                                                                fontSize: 15,
                                                                color: "#0082ff"
                                                            }}/><span> {item.like}</span>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{fontSize: 8, paddingTop: 5}}>
                                                        {   // 将long整型毫秒数转化为日期格式，之前方便排序
                                                            new Date(item.date).Format("yyyy-MM-dd hh:mm:ss")
                                                        }
                                                    </Row>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                </Row>
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
    const all = state.commodity.all;
    const brand = state.commodity.brand;
    const series = state.commodity.series;
    const type = state.commodity.type;
    const unite = state.commodity.unite;
    const quality = state.commodity.quality;
    const size = state.commodity.size;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        brandList: brand.brandList,
        seriesList: series.seriesList,
        typeList: type.typeList,
        uniteList: unite.uniteList,
        qualityList:quality.qualityList,
        sizeList:size.sizeList,

        commList: all.commList,

        isLoading: all.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteCommodity: (commId) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteCommodity(localStorage.getItem("RealFakeManagerJwt"), commId));
        },
        onEditCommodity: (commId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Edit(commId));
        },
        onFilter: (filterInfo) => {
            console.log(filterInfo);
            dispatch(Actions.Start());
            dispatch(Actions.Filter(filterInfo));
        },
        onFetchBrandList: () => {
            dispatch(BrandActions.Fetching());
        },
        onFetchSeriesList: () => {
            dispatch(SeriesActions.Fetching());
        },
        onFetchTypeList: () => {
            dispatch(TypeActions.Fetching());
        },
        onFetchUniteList: () => {
            dispatch(UniteActions.Fetching());
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));