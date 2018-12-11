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
    Divider, Upload, Select,Collapse
} from 'antd';

const Option = Select.Option;
import ShowImage from '../../../commom/showImage'
import ShowImages from '../../../commom/showImages'

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
            pictures: [],
            types: [],
            ids: [],


            oldPictures: [],
            fileList: [],
        });
    }

    componentDidMount() {

        //获取主页信息
        this.searchHome();
    }

    // 搜索主页
    searchHome() {
        client.search({
            index: 'home_pic',
            type: 'home_pic',
            body: {
                query: {
                    match_all: {}
                }
            }
        }).then(
            function (body) {
                this.setState({
                    ...body.hits.hits[0]._source,
                    oldPictures: body.hits.hits[0]._source.pictures
                });
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    render() {
        const {
            isLoading, // 是否加载中
            onUpdate,
            auth,
            info,
        } = this.props;

        const {
            pictures,
            types,
            ids,
            oldPictures,
            fileList,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    //权限-超级管理员-编辑类目
                    !(info.isSuper || auth.edi_category) ? (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>权限不足</Divider>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>主页信息</Divider>
                                </Row>
                                {/*主页图片*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        主页图片：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择主页图片" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                {
                                                    oldPictures.length!==0?(
                                                        <span>
                                                            <ShowImages images={oldPictures} size={70}/><br/>
                                                (此操作将删除历史图片)<br/>
                                                        </span>
                                                    ):null
                                                }
                                                <Upload
                                                    accept={"image/*"}
                                                    multiple
                                                    action="/mock/upload"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={({fileList}) => this.setState({
                                                        types: fileList.reduce((list, next) => (list.concat("commodity")), []),
                                                        ids: fileList.reduce((list, next) => (list.concat("")), []),
                                                        pictures: fileList.reduce((list, next) => (list.concat(next.name)), []),
                                                        fileList
                                                    })}
                                                >
                                                    <div>
                                                        <Icon type="plus"/>
                                                        <div className="ant-upload-text">上传图片</div>
                                                    </div>
                                                </Upload>
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*主页图片链接*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        主页图片链接：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="设置图片跳转" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

                                                (按图片顺序)
                                                {
                                                    pictures.map((item, index) => {
                                                        return (
                                                            <Row style={{padding: 5}}>
                                                                <Col span={8}>
                                                                    <Select
                                                                        value={types[index] === "" ? ("commodity") : (types[index])}
                                                                        notFoundContent={"没有匹配内容"} allowClear
                                                                        dropdownMatchSelectWidth={false}
                                                                        disabled={isLoading}
                                                                        showSearch
                                                                        style={{width: "100%", paddingRight: 5}}
                                                                        placeholder="链接类型"
                                                                        optionFilterProp="children"
                                                                        onChange={(e) => {
                                                                            let newTypes = types;
                                                                            newTypes[index] = e;
                                                                            this.setState({types: newTypes});
                                                                        }}
                                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                    >
                                                                        <Option value={"commodity"}
                                                                                key={"commodity"}>跳转商品</Option>
                                                                        <Option value={"brand"} key={"brand"}>跳转品牌</Option>
                                                                        <Option value={"series"} key={"series"}>跳转系列</Option>
                                                                        <Option value={"unite"} key={"unite"}>跳转联名</Option>
                                                                    </Select>
                                                                </Col>
                                                                <Col span={8}>
                                                                    <Row type={"flex"} align={"middle"}>
                                                                        <Col span={14} style={{textAlign: "right"}}>
                                                                            跳转编号：
                                                                        </Col>
                                                                        <Col span={10}>
                                                                            <Input value={ids[index]} onChange={(e) => {
                                                                                let newIds = ids;
                                                                                newIds[index] = e.target.value;
                                                                                this.setState({ids: newIds});
                                                                            }}/>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                {/*确认*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                         xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    let idsFlag = false;
                                                    for (let i=0;i<pictures.length;i++){
                                                        if(ids[i]===""){
                                                            idsFlag=true;
                                                            break;
                                                        }
                                                    }
                                                    if(pictures.length===0||
                                                        types.length===0||
                                                        ids.length===0||idsFlag){
                                                        message.error("信息输入不完整");
                                                    }else{
                                                        onUpdate({
                                                            pictures: pictures,
                                                            types: types,
                                                            ids: ids,
                                                        });
                                                        this.props.history.push("/commodity/home/");
                                                    }
                                                    console.log(this.state);
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                        <Button
                                            style={{width: "100%"}}
                                            onClick={() => {
                                                this.props.history.push("/commodity/home/");
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
    const home = state.commodity.home;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: home.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (homeInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), homeInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));