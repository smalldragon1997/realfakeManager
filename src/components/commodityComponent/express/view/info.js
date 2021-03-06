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
    Divider, Upload, Select, Collapse
} from 'antd';

const Option = Select.Option;
import ShowImage from '../../../commom/showImage'
import ShowImages from '../../../commom/showImages'

const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;
const Panel = Collapse.Panel;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            expId: undefined,
            // 需要提交的数据
            expName: undefined,
            price: undefined,
            cover: undefined,
            manId: undefined,

            imageUrl: undefined,
        });
    }

    componentDidMount() {
        if (this.props.expressId !== undefined) {
            this.props.onFetchExpressInfo(this.props.expressId);
        }
    }

    _cropCover() {
        // image in dataUrl
        this.setState({
            cover: this.refs.cropperCover.getCroppedCanvas().toDataURL()
        });
    }

    render() {
        const {
            expId,
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
            expressInfo,
            info
        } = this.props;

        const {
            expName,
            price,
            cover,
            manId,
            imageUrl,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    expressInfo === undefined ? (
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
                                    <Divider>快递信息(发布管理员:{expressInfo.nickname})</Divider>
                                </Row>
                                {/*快递名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        快递名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={expName} placeholder={expressInfo.expName}
                                               onChange={(e) => {
                                                   this.setState({
                                                       expName: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*快递描述*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        快递价格：
                                    </Col>
                                    <Col span={18}>
                                        <Input
                                            style={{width: "70%"}} value={price} placeholder={expressInfo.price}
                                            onChange={(e) => {
                                                this.setState({
                                                    price: e.target.value
                                                })
                                            }}/>
                                    </Col>
                                </Row>
                                {/*快递封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        快递封面：
                                    </Col>
                                    <Col span={12}>
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择快递封面" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>

                                                <Row>
                                                    {
                                                        cover === undefined ? (
                                                            <Col span={10}>
                                                                <Avatar src={expressInfo.cover} size={160} shape={"square"}/>
                                                            </Col>
                                                        ) : (
                                                            <Col span={10}>
                                                                <Avatar src={cover} size={160} shape={"square"}/>
                                                            </Col>
                                                        )
                                                    }
                                                    <Col span={5}>
                                                        <Upload
                                                            accept={"image/*"}
                                                            name="avatar"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            beforeUpload={(file) => {
                                                                console.log(file.size / 1024);
                                                                lrz(file, {quality: 1})
                                                                    .then((rst) => {
                                                                        console.log(rst.fileLen / 1024);
                                                                        this.setState({
                                                                            imageUrl: rst.base64,
                                                                        })
                                                                    });
                                                                return false;
                                                            }}
                                                        >
                                                            {imageUrl ?
                                                                <Avatar src={imageUrl} size={100} shape={"square"}/> : (
                                                                    null
                                                                )}
                                                            <div>
                                                                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                                                                <div className="ant-upload-text">上传封面</div>
                                                            </div>
                                                        </Upload>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={16}>
                                                        {
                                                            imageUrl === undefined ? (
                                                                "请先上传封面图片"
                                                            ) : (
                                                                <Cropper
                                                                    ref='cropperCover'
                                                                    src={imageUrl}
                                                                    style={{height: 300, width: '100%'}}
                                                                    // Cropper.js options
                                                                    aspectRatio={1}
                                                                    guides={true}
                                                                    crop={this._cropCover.bind(this)}/>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
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
                                                    onUpdate({
                                                        manId:info.manId,
                                                        expId:expressInfo.expId,
                                                        expName: expName === undefined || expName === "" ? expressInfo.expName : expName,
                                                        price: price === undefined || price === "" ? expressInfo.price : price,
                                                        cover: cover === undefined || cover === "" ? expressInfo.cover : cover,                                                        });

                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除快递 " + expName + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(expId);
                                                        this.props.history.push("/commodity/express/");
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
                                                this.props.history.push("/commodity/express/");
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
    const express = state.commodity.express;
    const navLink = state.navLink;
    return {
        info: navLink.info,
        expressId: express.expressId,
        expressInfo: express.expressInfo,
        isLoading: express.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (expId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(expId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (expInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), expInfo));
        },
        onFetchExpressInfo: (expId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchExpressInfo(expId));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));