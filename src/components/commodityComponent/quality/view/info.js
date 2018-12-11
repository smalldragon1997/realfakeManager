import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
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
    Divider, Upload, Select
} from 'antd';

const Option = Select.Option;

const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;

// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            qualId: undefined,
            // 需要提交的数据
            qualName: undefined,
            manId: undefined,

        });
    }

    componentDidMount() {

        //获取品质信息
        this.searchQuality(this.props.qualityId);
    }



    // 搜索品质
    searchQuality(qualId) {
        if (qualId !== undefined) {
            client.get({
                index: 'quality',
                type: 'quality',
                id: qualId
            }).then(
                function (body) {
                    this.setState({
                        ...body._source,
                    });
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }

    render() {
        const {
            qualityId,
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
        } = this.props;

        const {
            qualName,
            manId,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    qualityId === undefined ? (
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
                                    <Divider>品质信息(发布管理员:{manId})</Divider>
                                </Row>
                                {/*品质名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        品质名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={qualName}
                                               onChange={(e) => {
                                                   this.setState({
                                                       qualName: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*确认*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                         xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    if(qualName===undefined||qualName===""){
                                                        message.error("信息输入不完整");
                                                    }else{
                                                        onUpdate({
                                                            qualName: qualName
                                                        });
                                                        this.props.history.push("/commodity/quality/");
                                                    }
                                                    console.log(this.state);
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除品质 " + qualName + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(qualId);
                                                        this.props.history.push("/commodity/quality/");
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
                                                this.props.history.push("/commodity/quality/");
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
    const quality = state.commodity.quality;
    return {
        qualityId: quality.qualityId,
        isLoading: quality.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (qualId) => {
            let qualIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.Delete(qualIdList.push(qualId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (qualityInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), qualityInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));