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
// 默认的过滤条件
const initFilter = {
    brandId: undefined,
    seriesId: undefined,
    typeId: undefined,
    price: undefined,
    sort: undefined,
    desc: true,
};
// 默认的页面状态
const initState = {
    page: 1, //默认当前页
    key: "", // 默认搜索条件
    start: 0, // 默认开始时间
    end: 9999999999999 // 默认结束时间
};

// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            ...initState, // 搜索条件

            commList: [], // 商品列表
            seriesList: [], // 系列列表
            brandList: [], // 品牌列表
            typeList: [], // 类型列表
            uniteList: [], // 联名列表
        });
        // 回到页面顶部
        window.scrollTo(0, 0);
    }

    // 初始化获取数据
    componentDidMount() {
        const {key, start, end,} = this.state;
        //  搜索商品
        this.searchCommodity(key, start, end);
        // 获取系列
        this.fetchSeries();
        //获取品牌
        this.fetchBrand();
        // 获取类型
        this.fetchType();
        // 获取联名
        this.fetchUnite();
    }

    // 搜索商品
    searchCommodity(key, start, end) {
        if (key === "") {
            client.search({
                index: 'commodity',
                type: 'commodity',
                body: {
                    query: {
                        bool: {
                            must: {match_all: {}},
                            filter: {
                                range: {
                                    date: {
                                        gte: start,
                                        lt: end,
                                    }
                                }
                            }
                        }
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    this.setState({commList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        } else {
            client.search({
                index: 'commodity',
                type: 'commodity',
                body: {
                    query: {
                        bool: {
                            should: [
                                {match: {title: key}},
                                {match: {describe: key}},
                                {match: {commId: key}}
                            ],
                            filter: {
                                range: {
                                    date: {
                                        gte: start,
                                        lt: end,
                                    }
                                }
                            }
                        }
                    }
                }
            }).then(
                function (body) {
                    let value = body.hits.hits;
                    console.log(value)
                    this.setState({commList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }

    // 获取系列
    fetchSeries() {
        client.search({
            index: 'series',
            type: 'series',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({seriesList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取品牌
    fetchBrand() {
        client.search({
            index: 'brand',
            type: 'brand',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({brandList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取类型
    fetchType() {
        client.search({
            index: 'type',
            type: 'type',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({typeList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取联名
    fetchUnite() {
        client.search({
            index: 'unite',
            type: 'unite',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({uniteList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    render() {
        const {
            auth, // 权限信息
            info, // 管理员信息
            isLoading, // 是否加载中
            brandId, // 帅选品牌id
            seriesId,// 帅选系列id
            typeId,// 帅选类型id
            uniteId, // 筛选联名id
            price,// 帅选价格
            sort, // 排序方式
            desc,// 升序降序
            onFilter, //筛选
            onEditCommodity, // 查看详情
            onDeleteCommodity, // 删除商品
        } = this.props;

        const {
            page, // 当前页
            key, // 搜索关键字
            start, // 开始时间
            end, // 结束时间
            commList, // 商品列表
            seriesList, // 系列列表
            brandList, // 品牌列表
            typeList, // 类型列表
            uniteList, // 联名列表
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
                                     style={{padding: "3%", paddingTop: 0,paddingBottom: "1%"}}>
                                    <Col span={15} style={{textAlign: "right", paddingRight: 5}}>

                                        <RadioGroup
                                            buttonStyle="solid"
                                            style={{width: "100%"}}
                                            onChange={(e) => {
                                                onFilter(brandId, seriesId, typeId, uniteId, price, e.target.value, desc);
                                                this.setState({page: 1});
                                            }} defaultValue="like">
                                            <RadioButton value="like" onClick={(e) => {
                                                onFilter(brandId, seriesId, typeId, uniteId, price, sort, desc, e.target.value);
                                                this.setState({page: 1});
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
                                                onFilter(brandId, seriesId, typeId, uniteId, price, sort, desc, e.target.value);
                                                this.setState({page: 1});
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
                                            <RadioButton value="sale" onClick={(e) => {
                                                onFilter(brandId, seriesId, typeId, uniteId, price, sort, desc, e.target.value);
                                                this.setState({page: 1});
                                            }}>
                                                销量{   // 如果当前没有选中 则不显示箭头
                                                sort === "sale" ? (
                                                    // 根据desc判断箭头指示方向
                                                    desc ? (
                                                        <Icon type="arrow-down" theme="outlined"/>
                                                    ) : (
                                                        <Icon type="arrow-up" theme="outlined"/>
                                                    )
                                                ) : null
                                            }</RadioButton>
                                            <RadioButton value="price" onClick={(e) => {
                                                onFilter(brandId, seriesId, typeId, uniteId, price, sort, desc, e.target.value);
                                                this.setState({page: 1});
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
                                                onFilter(brandId, seriesId, typeId, uniteId, price, sort, desc, e.target.value);
                                                this.setState({page: 1});
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
                                                    value={key}
                                                    style={{width: "100%"}} placeholder={"商品编号、标题、描述"}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            ...this.state,
                                                            key: e.target.value
                                                        })
                                                    }}/>
                                            </Col>
                                            <Col span={6} style={{paddingRight: 5}}>
                                                <Button
                                                    style={{width: "100%"}} type={"primary"} onClick={() => {
                                                    if (key === "") {
                                                        message.error("请输入关键字");
                                                    } else {
                                                        this.searchCommodity(key, start, end);
                                                        this.setState({page: 1});
                                                    }
                                                }}>搜索</Button>
                                            </Col>
                                            <Col span={6}>
                                                <Button
                                                    style={{width: "100%"}} onClick={() => {
                                                    this.setState({...initState});
                                                    this.searchCommodity("", start, end)
                                                }}>重置</Button>
                                            </Col>

                                        </Row>

                                    </Col>

                                </Row>
                                {/*筛选条件和时间*/}
                                <Row style={{textAlign: "right", padding: "3%", paddingBottom: "1%",paddingTop:0}}>
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
                                                            onFilter(e, seriesId, typeId, uniteId, price, sort, desc);
                                                            this.setState({page: 1});
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
                                                            onFilter(brandId, e, typeId, uniteId, price, sort, desc);
                                                            this.setState({page: 1});
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
                                                            seriesList.filter(item => (item.brandId === brandId)).map((item, index) => (
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
                                                            onFilter(brandId, seriesId, e, uniteId, price, sort, desc);
                                                            this.setState({page: 1});
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
                                                            onFilter(brandId, seriesId, typeId, e, price, sort, desc);
                                                            this.setState({page: 1});
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
                                                            onFilter(brandId, seriesId, typeId, uniteId, e, sort, desc);
                                                            this.setState({page: 1});
                                                        }}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value={200} key={200}>200以内</Option>
                                                    <Option value={300} key={300}>300以内</Option>
                                                    <Option value={400} key={400}>400以内</Option>
                                                    <Option value={500} key={500}>500以内</Option>
                                                    <Option value={600} key={600}>600以内</Option>
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
                                                this.setState({
                                                    start: start,
                                                    end: end,
                                                });
                                                this.searchCommodity(key, start, end);
                                                this.setState({page: 1});
                                            }}
                                        />
                                        <Button onClick={() => {
                                            this.setState({
                                                start: 0,
                                                end: 9999999999999,
                                                page: 1
                                            });
                                            this.searchCommodity(key, 0, 9999999999999)
                                        }}>重置时间范围</Button>
                                    </Col>

                                </Row>
                                {/*商品列表*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%",paddingTop:0}}>
                                    <List
                                        pagination={{
                                            current: page,
                                            onChange: (page) => {
                                                this.setState({page: page});
                                                // 回到页面顶部
                                                window.scrollTo(0, 0);
                                            },
                                            showQuickJumper: true,
                                            showTotal: (total, range) => `第${range[0]}-${range[1]}个商品 总个数 ${total} 个`,
                                            pageSize: 15,
                                        }}
                                        grid={{gutter: 16, xs: 2, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3}}
                                        dataSource={getCommListByFilter(commList, brandId, seriesId, typeId, uniteId, price, sort, desc, new Date().getTime())}
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

                                                                        let newCommList = commList;
                                                                        for (let i = 0; i < newCommList.length; i++) {
                                                                            if (newCommList[i].commId === item.commId) {
                                                                                newCommList.remove(i);
                                                                                break;
                                                                            }
                                                                        }
                                                                        this.setState({commList: newCommList});
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
                                                    {
                                                        typeList.length!==0?(
                                                            <Row style={{marginBottom:"4%"}}>
                                                                {
                                                                    typeList.map((item,index)=>{
                                                                        return (
                                                                            <Tag color="blue" key={index}>{item.typeName}</Tag>
                                                                        )
                                                                    })
                                                                }
                                                            </Row>
                                                        ):null
                                                    }
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

                                                                {"" + item.describe.slice(0, 25) + "..."}
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
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        brandId: all.brandId,
        seriesId: all.seriesId,
        typeId: all.typeId,
        uniteId: all.uniteId,
        price: all.price,
        sort: all.sort,
        desc: all.desc,
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
        onEditCommodity: (commInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Edit(commInfo));
        },
        onFilter: (brandId, seriesId, typeId, uniteId, price, sort, desc, selected) => {
            dispatch(Actions.Start());
            // 如果已经选中排序则切换排序方式
            if (selected === sort) {
                dispatch(Actions.Filter(brandId, seriesId, typeId, uniteId, price, sort, !desc));
            } else {
                dispatch(Actions.Filter(brandId, seriesId, typeId, uniteId, price, sort, desc));
            }
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));