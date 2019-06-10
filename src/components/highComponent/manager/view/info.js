import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {getManagerByManId} from '../selector';
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
    Input,
    message,
    Table,
    Tag,
    Divider,Popconfirm
} from 'antd';

const CheckboxGroup = Checkbox.Group;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 已选中的列表
            checkedList: [],
            // 是否半选状态
            indeterminate: false,
            // 是否全选
            checkAll: false,
            // 昵称
            nickname: undefined,
        });
    }


    componentDidMount() {
        // 获取权限列表
        this.props.onFetchAuths();
        // 管理员信息
        this.props.onFetchManagerInfo(this.props.manId);

    }

    render() {
        const {
            auths, // 权限列表
            managerInfo, // 管理员信息
            defaultCheckedList, // 默认权限
            isLoading, // 是否加载中
            onDelManager, // 删除管理员
            onUpdateManager, // 更新管理员信息
            onForbiddenManager, // 禁用管理员
            onCancelForbiddenManager, // 取消禁用管理员
        } = this.props;
        const {
            nickname,
            checkedList
        } = this.state;

        const plainOptions = [];
        for (let i = 0; i < auths.length; i++) {
            plainOptions.push(auths[i].describe);
        }

        return (
            <Spin spinning={isLoading}>
                {
                    managerInfo === undefined ? (
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
                                    <Divider>管理员信息</Divider>
                                </Row>
                                {/*昵称*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        昵称：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} placeholder={managerInfo.nickname}
                                               onChange={(e) => {
                                                   this.setState({
                                                       nickname: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*状态*/}
                                <Row style={{padding: "3%", paddingTop: 0}} type={"flex"} align={"middle"}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        状态：
                                    </Col>
                                    {
                                        managerInfo.isForbidden?(
                                            <Col span={18}>
                                                已禁用 <Button
                                                type={"dashed"}
                                                onClick={() => {
                                                    onCancelForbiddenManager(managerInfo.manId);
                                                }}>取消禁用</Button>
                                            </Col>
                                        ):(
                                            <Col span={18}>
                                                可用 <Button
                                                type={"dashed"}
                                                onClick={() => {
                                                    onForbiddenManager(managerInfo.manId);
                                                }}>禁用</Button>
                                            </Col>
                                        )
                                    }
                                </Row>
                                {/*头像*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        头像：
                                    </Col>
                                    <Col span={18}>
                                        <Avatar src={managerInfo.icon} size={100} shape={"square"}/>
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
                                        <CheckboxGroup options={plainOptions} value={checkedList}
                                                       onChange={(checkedList) => {
                                                           this.setState({
                                                               checkedList,
                                                               indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
                                                               checkAll: checkedList.length === plainOptions.length,
                                                           });
                                                       }}/>
                                    </Col>
                                </Row>
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        当前拥有权限：
                                    </Col>
                                    <Col span={14}>
                                        {
                                            defaultCheckedList.length===0?"无任何权限":defaultCheckedList.map(item=>(
                                                item+" "
                                            ))
                                        }
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
                                                    onUpdateManager({
                                                        manId:managerInfo.manId,
                                                        auths:resultAuths,
                                                        icon:managerInfo.icon,
                                                        nickname:nickname===undefined||nickname===""?managerInfo.nickname:nickname,
                                                        isForbidden:managerInfo.isForbidden,
                                                        isSuper:managerInfo.isSuper
                                                    });
                                                    // this.props.history.push("/high/manager/");
                                                }}
                                        >修改</Button>
                                    </Col>
                                    {/*<Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>*/}
                                        {/*<Popconfirm placement="top" title={"确定删除管理员 "+managerInfo.nickname+" 吗？"} onConfirm={()=>{*/}
                                            {/*onDelManager(managerInfo.manId);*/}
                                            {/*this.props.history.push("/high/manager/");*/}
                                        {/*}} okText="确认" cancelText="点错了">*/}
                                            {/*<Button*/}
                                                {/*type={"danger"}*/}
                                                {/*style={{width: "100%"}}*/}
                                                {/*onClick={() => {*/}
                                                {/*}}>删除</Button>*/}
                                        {/*</Popconfirm>*/}
                                    {/*</Col>*/}
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
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const manager = state.high.manager;
    return {
        auths: manager.auths,
        manId: manager.manId,
        managerInfo: manager.managerInfo,
        managerList: manager.managerList,
        defaultCheckedList:manager.defaultCheckedList,
        isLoading: manager.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelManager: (manId) => {
            let manIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.DelManager(manIdList.concat(manId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onForbiddenManager: (manId) => {
            let manIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.ForbidManager(manIdList.concat(manId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onCancelForbiddenManager: (manId) => {
            let manIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.CanCelForbidManager(manIdList.concat(manId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onFetchAuths: () => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchAuthList(localStorage.getItem("RealFakeManagerJwt")));
        },
        onFetchManagerInfo: (manId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchManagerInfo(manId,localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdateManager: (managerInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.UpdateManager(managerInfo,localStorage.getItem("RealFakeManagerJwt")));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));