import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import lrz from 'lrz';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';

import {getManagerByManId} from '../selector';
import {Select,Upload,
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
    Divider,Collapse
} from 'antd';

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

class add extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 是否半选状态
            indeterminate: false,
            // 是否全选
            checkAll: false,
            // 头像图片的中间变量
            imageUrl:undefined,

            // 需要提交的数据
            // 昵称
            nickname: undefined,
            // 头像base64
            icon:undefined,
            // 是否禁用
            isForbidden:false,
            // 权限选择列表
            checkedList: [],
            // 用户名
            username:undefined,
            // 密码
            password:undefined
        });
    }

    componentDidMount() {
        // 获取权限列表
        this.props.onFetchAuths();
    }

    // 裁剪图片
    _cropIcon() {
        // image in dataUrl
        this.setState({
            icon: this.refs.cropperIcon.getCroppedCanvas().toDataURL()
        });
    }

    render() {
        const {
            auth, // 当前管理员权限
            info, // 当前管理员信息
            auths, // 权限列表
            isLoading, // 是否加载中
            onAddManager, // 添加管理员
        } = this.props;

        const {
            icon,//头像base64编码
            imageUrl, // 裁剪图片中间变量
            checkedList, // 权限选中列表
            nickname, // 昵称
            username, // 用户名
            password, // 密码
            isForbidden // 是否禁用
        } = this.state;

        // 权限选项列表数据
        const plainOptions = [];
        for (let i = 0; i < auths.length; i++) {
            plainOptions.push(auths[i].describe);
        }

        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined?(
                        <Divider>请登录</Divider>
                    ):(
                        !info.isSuper?(
                            <Divider>权限不足</Divider>
                        ):(
                            <Row>
                                <Col>
                                    {/*添加管理员*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%"}}>
                                        <Divider>添加管理员</Divider>
                                    </Row>
                                    {/*昵称*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            昵称：
                                        </Col>
                                        <Col span={18}>
                                            <Input style={{width: "70%"}} placeholder={"管理员昵称"}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           nickname: e.target.value
                                                       })
                                                   }}/>
                                        </Col>
                                    </Row>
                                    {/*用户名*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            用户名：
                                        </Col>
                                        <Col span={18}>
                                            <Input style={{width: "70%"}} placeholder={"登录的用户名"}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           username: e.target.value
                                                       })
                                                   }}/>
                                        </Col>
                                    </Row>
                                    {/*密码*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            密码：
                                        </Col>
                                        <Col span={18}>
                                            <Input style={{width: "70%"}} placeholder={"登录的密码"}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           password: e.target.value
                                                       })
                                                   }}/>
                                        </Col>
                                    </Row>
                                    {/*状态*/}
                                    <Row style={{padding: "3%", paddingTop: 0}} type={"flex"} align={"middle"}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            状态：
                                        </Col>
                                        <Col span={18}>
                                            <Select defaultValue={false} style={{ width: 120 }} onChange={(e)=>{
                                                this.setState({isForbidden:e})
                                            }}>
                                                <Option value={false}>可用</Option>
                                                <Option value={true}>禁用</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    {/*头像*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            头像：
                                        </Col>
                                        <Col span={12}>
                                            <Collapse bordered={false} >
                                                <Panel header="上传管理员头像" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

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
                                                            <div className="ant-upload-text">上传头像</div>
                                                        </div>
                                                    </Upload>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={16}>
                                                    {
                                                        imageUrl === undefined ? (
                                                            "请先上传头像图片"
                                                        ) : (
                                                            <Cropper
                                                                ref='cropperIcon'
                                                                src={imageUrl}
                                                                style={{height: 300, width: '100%'}}
                                                                // Cropper.js options
                                                                aspectRatio={1}
                                                                guides={true}
                                                                crop={this._cropIcon.bind(this)}/>
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                                </Panel>
                                            </Collapse>
                                        </Col>
                                    </Row>
                                    {/*权限*/}
                                    <Row style={{padding: "3%", paddingTop: 0}}>
                                        <Col span={6} style={{textAlign: "right"}}>
                                            权限设置：
                                        </Col>
                                        <Col span={14}>
                                            <Checkbox
                                                indeterminate={this.state.indeterminate}
                                                onChange={(e) => {
                                                    this.setState({
                                                        checkedList: e.target.checked ? plainOptions : [],
                                                        indeterminate: false,
                                                        checkAll: e.target.checked,
                                                    });
                                                }}
                                                checked={this.state.checkAll}
                                            >
                                                全选
                                            </Checkbox>
                                            <br/>
                                            <CheckboxGroup options={plainOptions} value={this.state.checkedList}
                                                           onChange={(checkedList) => {
                                                               this.setState({
                                                                   checkedList,
                                                                   indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
                                                                   checkAll: checkedList.length === plainOptions.length,
                                                               });
                                                           }}/>
                                        </Col>
                                    </Row>
                                    {/*按钮*/}
                                    <Row style={{padding: "3%", paddingTop: 0}}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                             xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                            <Button type={"primary"} style={{width: "100%"}}
                                                    onClick={() => {
                                                        let resultAuths = [];
                                                        for (let j = 0; j < checkedList.length; j++) {
                                                            for (let i = 0; i < auths.length; i++) {
                                                                if (auths[i].describe === checkedList[j]) {
                                                                    resultAuths.push(auths[i].authId);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        if(!(nickname&&username&&password&&icon)){
                                                            message.error("请输入完整");
                                                        }else{
                                                            onAddManager({
                                                                auths:resultAuths,
                                                                nickname:nickname,
                                                                username:username,
                                                                password:password,
                                                                icon:icon,
                                                                isForbidden:isForbidden,
                                                            });
                                                        }
                                                    }}
                                            >确认添加</Button>
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                            <Button
                                                style={{width: "100%"}}
                                                onClick={() => {
                                                    this.props.history.push("/high/manager/");
                                                }}>取消</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    )
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const manager = state.high.manager;
    const navLink = state.navLink;
    return {
        auth:navLink.auth,
        info:navLink.info,
        auths: manager.auths,
        managerInfo: getManagerByManId(manager.managerList, "manId", manager.manId),
        managerList: manager.managerList,
        isLoading: manager.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAddManager: (managerInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.AddManager(managerInfo,localStorage.getItem("RealFakeManagerJwt")));
        },
        onFetchAuths: () => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchAuthList(localStorage.getItem("RealFakeManagerJwt")));
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(add));