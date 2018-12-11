import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import lrz from 'lrz';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {
    Popconfirm,
    Menu,
    Icon,
    Row,
    Col,
    Avatar,
    Dropdown,
    Spin,
    Button,
    Checkbox,
    Input,
    message,
    Table,
    Tag,
    Divider, Upload, Select,Collapse,DatePicker,Modal
} from 'antd';

const Option = Select.Option;
import ShowImage from '../../../commom/showImage'
import ShowImages from '../../../commom/showImages'
import discount from "../../../commodityComponent/discount/view/discount";

const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;

const Panel = Collapse.Panel;
// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 需要提交的数据
            discountId:undefined,
            discountDate:undefined,
            discountLimit:undefined,

            discountList:[],

            userId: undefined,
            nickname: undefined,
            icon: undefined,
            createDate: undefined,
            disId: [],
            date: [],
            limit: [],
            commId: [],
            qualId: [],
            sizeId: [],
            likeId: [],

            commList:[],
            qualList:[],
            disList:[],
            likeList:[],
            visible:false,
        });
    }

    componentDidMount() {

        //获取用户信息
        this.searchUser(this.props.userId);
        //获取代金卷列表
        this.searchDiscountList();
    }

    // 搜索用户
    searchUser(userId) {
        if (userId !== undefined) {
            client.get({
                index: 'user_info',
                type: 'user_info',
                id: userId
            }).then(
                function (body) {
                    this.setState({
                        ...body._source,
                    });
                    //获取购物车商品
                    this.searchCommodity(this.state.commId);
                    //获取购物车商品的品质
                    this.searchQuality(this.state.qualId);
                    //获取收藏
                    this.searchLike(this.state.commId);
                    //获取代金卷
                    this.searchDiscount(this.state.disId);
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }
    // 获取商品
    searchCommodity(commIds) {
        if (commIds.length!== 0) {
            client.mget({
                index: 'commodity',
                type: 'commodity',
                body:{
                    ids:commIds
                }
            }).then(
                function (body) {
                    this.setState({
                        commList:body.docs.reduce((commList,next)=>(commList.concat(next._source)),[]),
                    });
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }
    // 获取购物车中的品质列表
    searchQuality(qualIds) {
        if (qualIds.length!== 0) {
            client.mget({
                index: 'quality',
                type: 'quality',
                body:{
                    ids:qualIds
                }
            }).then(
                function (body) {
                    this.setState({
                        ...body._source,
                    });
                    this.setState({
                        qualList:body.docs.reduce((qualList,next)=>(qualList.concat(next._source)),[]),
                    });
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }

    // 获取收藏
    searchLike(commIds) {
        if (commIds.length!== 0) {
            client.mget({
                index: 'commodity',
                type: 'commodity',
                body:{
                    ids:commIds
                }
            }).then(
                function (body) {
                    this.setState({
                        likeList:body.docs.reduce((commList,next)=>(commList.concat(next._source)),[]),
                    });
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }
    // 获取代金卷
    searchDiscount(disIds) {
        if (disIds.length!== 0) {
            client.mget({
                index: 'discount',
                type: 'discount',
                body:{
                    ids:disIds
                }
            }).then(
                function (body) {
                    this.setState({
                        disList:body.docs.reduce((disList,next)=>(disList.concat(next._source)),[]),
                    });
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }
    // 获取代金卷列表
    searchDiscountList() {
        client.search({
            index: 'discount',
            type: 'discount',
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({discountList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );

    }


    render() {
        const {
            userId,
            isLoading, // 是否加载中
            onDelete,
            onDiscount,
        } = this.props;

        const {
            nickname,
            icon,
            createDate,
            disId,
            date,
            limit,
            commId,
            qualId,
            disList,
            sizeId,
            likeId,
            commList,
            qualList,
            likeList,
            visible,
            discountList,
            discountId,
            discountDate,
            discountLimit,
        } = this.state;

        // 购物车
        const columns = [
            {
                title: '商品编号',
                dataIndex: 'commId',
                key: 'commId',
            }, {
                title: '商品封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '商品标题',
                dataIndex: 'title',
                key: 'title',
            }, {
                title: '品质',
                dataIndex: 'qualName',
                key: 'qualName',
            }, {
                title: '尺码',
                dataIndex: 'size',
                key: 'size',
            },
        ];

        // 多选列表
        let options = [];
        if(commList.length!==0&&qualList.length!==0&&sizeId.length!==0){
            for (let i = 0; i < commList.length; i++) {
                options.push({
                    key: commList[i].commId,
                    commId: commList[i].commId,
                    cover: commList[i].cover,
                    title: commList[i].title,
                    qualName: qualList[i].qualName,
                    size: sizeId[i],
                })
            }
        }


        // 收藏
        const likeColumns = [
            {
                title: '商品编号',
                dataIndex: 'commId',
                key: 'commId',
            }, {
                title: '商品封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '商品标题',
                dataIndex: 'title',
                key: 'title',
            }
        ];

        // 多选列表
        let likeOptions = [];
        if(likeList.length!==0){
            for (let i = 0; i < likeList.length; i++) {
                likeOptions.push({
                    key: likeList[i].commId,
                    commId: likeList[i].commId,
                    cover: likeList[i].cover,
                    title: likeList[i].title,
                })
            }
        }

        // 代金卷
        const disColumns = [
            {
                title: '代金卷编号',
                dataIndex: 'disId',
                key: 'disId',
            }, {
                title: '代金卷封面',
                dataIndex: 'cover',
                key: 'cover',
                render: cover => <ShowImage image={cover} size={50}/>
            }, {
                title: '代金卷名',
                dataIndex: 'disName',
                key: 'disName',
            }, {
                title: '截至日期',
                dataIndex: 'date',
                key: 'date',
            }, {
                title: '满减条件',
                dataIndex: 'limit',
                key: 'limit',
            }
        ];

        // 多选列表
        let disOptions = [];
        if(disList.length!==0&&date.length!==0&&limit.length!==0){
            for (let i = 0; i < disList.length; i++) {
                disOptions.push({
                    key: i,
                    disId: disList[i].disId,
                    cover: disList[i].cover,
                    disName: disList[i].disName,
                    date: new Date(date[i]).Format("yyyy-MM-dd hh:mm:ss"),
                    limit: (limit[i]===0?"无门槛减":"满"+limit[i]+"减")+disList[i].price,
                })
            }
        }

        return (
            <Spin spinning={isLoading}>
                {
                    userId === undefined ? (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>参数错误请重新操作</Divider>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>用户信息(注册时间:{new Date(createDate).Format("yyyy-MM-dd hh:mm:ss")})</Divider>
                                </Row>
                                {/*昵称*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        昵称：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={nickname}
                                               onChange={(e) => {
                                                   this.setState({
                                                       nickname: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*头像*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        头像：
                                    </Col>
                                    <Col span={12}>

                                        {
                                            icon === undefined ? null : (
                                                <Col span={10}>
                                                    <ShowImage image={icon} size={160}/>
                                                </Col>
                                            )
                                        }

                                    </Col>
                                </Row>
                                {/*用户购物车*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        用户购物车：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false}>
                                            <Panel header="查看用户购物车" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                <Table
                                                    pagination={{
                                                        pageSize:5,
                                                        showQuickJumper:true
                                                    }}

                                                    style={{width: "100%"}}
                                                    columns={columns} dataSource={options}/>
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*用户收藏*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        用户收藏：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false}>
                                            <Panel header="查看用户收藏" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                <Table
                                                    pagination={{
                                                        pageSize:5,
                                                        showQuickJumper:true
                                                    }}

                                                    style={{width: "100%"}}
                                                    columns={likeColumns} dataSource={likeOptions}/>
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*用户代金卷*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        用户代金卷：
                                    </Col>
                                    <Col span={12}>

                                        <Row>
                                            <Collapse bordered={false}>
                                                <Panel header={
                                                    <Row type={"flex"} align={"middle"}>
                                                        <Col span={18}>
                                                            查看用户代金卷
                                                        </Col>
                                                        <Col span={6} style={{paddingRight: 10}}>
                                                            <Button style={{width: "100%"}} onClick={()=>{this.setState({visible:true})}}>
                                                                添加代金卷
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                } key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                    <Table
                                                        pagination={{
                                                            pageSize:5,
                                                            showQuickJumper:true
                                                        }}

                                                        style={{width: "100%"}}
                                                        columns={disColumns} dataSource={disOptions}/>
                                                </Panel>
                                            </Collapse>
                                        </Row>
                                        {/*弹框*/}
                                        <Modal
                                            // maskStyle={{opacity:0.1,backgroundColor:"#fff"}}
                                            title="添加代金卷"
                                            visible={visible}
                                            onOk={()=>{
                                                if(discountId===""||discountId===undefined||
                                                    discountDate===""||discountDate===undefined||
                                                    discountLimit===""||discountLimit===undefined){
                                                    message.error("请输入完整")
                                                }else{
                                                    onDiscount({
                                                        discountId:discountId,
                                                        discountDate:discountDate,
                                                        discountLimit:discountLimit
                                                    });

                                                    this.setState({visible:false,discountId:undefined,discountDate:undefined,discountLimit:undefined})
                                                }
                                            }}
                                            onCancel={()=>{
                                                this.setState({visible:false,discountId:undefined,discountDate:undefined,discountLimit:undefined})
                                            }}
                                        >
                                            <Row type={"flex"} align={"middle"} style={{paddingTop:5}}>
                                                <Col span={8}>
                                                    选择代金卷：
                                                </Col>
                                                <Col span={10}>
                                                    <Select notFoundContent={"没有匹配内容"} allowClear
                                                            dropdownMatchSelectWidth={false}
                                                            disabled={isLoading}
                                                            showSearch
                                                            style={{width: "100%", paddingRight: 5}}
                                                            placeholder="品牌"
                                                            optionFilterProp="children"
                                                            onChange={(e) => {
                                                                this.setState({discountId: e});
                                                            }}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        {   //遍历选定品牌后该品牌下的系列
                                                            discountList.map((item, index) => (
                                                                <Option value={item.disId}
                                                                        key={index}>{item.disName}</Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Col>
                                            </Row>
                                            <Row type={"flex"} align={"middle"} style={{paddingTop:5}}>
                                                <Col span={8}>
                                                    使用期限：
                                                </Col>
                                                <Col span={10}>
                                                    <DatePicker onChange={(e, date) => {
                                                        this.setState({
                                                            discountDate: date[0] === "" ? undefined : new Date(date).getTime(),
                                                        });
                                                    }} />
                                                </Col>
                                            </Row>
                                            <Row type={"flex"} align={"middle"} style={{paddingTop:5}}>
                                                <Col span={8}>
                                                    使用金额条件：
                                                </Col>
                                                <Col span={10}>
                                                    <Input placeholder={"满减条件"} value={discountLimit} onChange={(e)=>{
                                                        this.setState({discountLimit:e.target.value})
                                                    }}/>
                                                </Col>
                                            </Row>
                                        </Modal>
                                    </Col>
                                </Row>
                                {/*确认*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col  xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                          xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除用户 " + nickname + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(userId);
                                                        this.props.history.push("/user/all/");
                                                    }} okText="确认" cancelText="点错了">
                                            <Button
                                                type={"danger"}
                                                style={{width: "100%"}}>删除</Button>
                                        </Popconfirm>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                        <Button
                                            style={{width: "100%"}}
                                            onClick={() => {
                                                this.props.history.push("/user/all/");
                                            }}>取消</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )
                }
            </Spin>
        )
    }
}

// props绑定state
const mapStateToProps = (state) => {
    const all = state.user.all;
    return {
        userId: all.userId,
        isLoading: all.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (userId) => {
            let userIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.Delete(userIdList.push(userId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onDiscount: (disInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Discount(localStorage.getItem("RealFakeManagerJwt"), disInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));