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
            nickname:undefined,
            oldPwd:undefined,
            newPwd:undefined,
            icon:undefined,

            imageUrl:undefined,
        });
    }

    componentDidMount() {
            this.setState({...this.props.info})
    }

    _cropCover() {
        // image in dataUrl
        this.setState({
            icon: this.refs.cropperCover.getCroppedCanvas().toDataURL()
        });
    }

    render() {
        const {
            info,
            auth,
            isLoading, // 是否加载中
            onUpdate,
        } = this.props;

        const {
            nickname,
            oldPwd,
            newPwd,
            icon,
            imageUrl
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>请登录</Divider>
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                    <Divider>管理员信息(创建时间:{new Date(info.createDate).Format("yyyy-MM-dd hh:mm:ss")})</Divider>
                                </Row>
                                {/*昵称*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        昵称：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={nickname}
                                               placeholder={"输入新昵称"}
                                               onChange={(e) => {
                                                   this.setState({
                                                       nickname: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*旧密码*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        旧密码：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={oldPwd}
                                               placeholder={"输入旧密码已修改密码"}
                                               onChange={(e) => {
                                                   this.setState({
                                                       oldPwd: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*新密码*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        新密码：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={newPwd}
                                               placeholder={"输入新密码"}
                                               onChange={(e) => {
                                                   this.setState({
                                                       newPwd: e.target.value
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

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择头像" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

                                                <Row>
                                                    {
                                                        icon === undefined ? null : (
                                                            <Col span={10}>
                                                                <Avatar src={icon} size={160} shape={"square"}/>
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
                                                            {imageUrl ? <Avatar src={imageUrl} size={100} shape={"square"}/> : (
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
                                    <Col  xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                          xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定修改个人信息吗？"}
                                                    onConfirm={() => {
                                                        onUpdate({
                                                            nickname:nickname,
                                                            oldPwd:oldPwd,
                                                            newPwd:newPwd,
                                                            icon:icon
                                                        });
                                                    }} okText="确认" cancelText="点错了">
                                            <Button
                                                type={"primary"}
                                                style={{width: "100%"}}>提交修改</Button>
                                        </Popconfirm>
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
    const info = state.person.info;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: info.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (managerInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), managerInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));