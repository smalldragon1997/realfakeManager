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
    Divider, Upload, Select
} from 'antd';

const Option = Select.Option;
import ShowImage from '../../../commom/showImage'
import ShowImages from '../../../commom/showImages'

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
            sizeId: undefined,
            // 需要提交的数据
            value: undefined,
            manId: undefined,

        });
    }

    componentDidMount() {

        //获取尺码信息
        this.searchSize(this.props.sizeId);
    }



    // 搜索尺码
    searchSize(sizeId) {
        if (sizeId !== undefined) {
            client.search({
                index: 'size',
                type: 'size',
                body:{
                    query:{
                        bool:{
                            must:{
                                match:{sizeId:sizeId}
                            }
                        }
                    }
                }
            }).then(
                function (body) {
                    console.log(body);
                    this.setState({
                        ...body.hits.hits[0]._source,
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
            sizeId,
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
        } = this.props;

        const {
            value,
            manId,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    sizeId === undefined ? (
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
                                    <Divider>尺码信息(发布管理员:{manId})</Divider>
                                </Row>
                                {/*尺码名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        尺码名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={value}
                                               onChange={(e) => {
                                                   this.setState({
                                                       value: e.target.value
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
                                                    if(value===undefined||value===""){
                                                        message.error("信息输入不完整");
                                                    }else{
                                                        onUpdate({
                                                            value: value
                                                        });
                                                        this.props.history.push("/commodity/size/");
                                                    }
                                                    console.log(this.state);
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除尺码 " + value + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(sizeId);
                                                        this.props.history.push("/commodity/size/");
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
                                                this.props.history.push("/commodity/size/");
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
    const size = state.commodity.size;
    return {
        sizeId: size.sizeId,
        isLoading: size.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (sizeId) => {
            let sizeIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.Delete(sizeIdList.push(sizeId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (sizeInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), sizeInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));