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
    Divider
} from 'antd';

const CheckboxGroup = Checkbox.Group;


class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            authId: undefined,
            // 需要提交的数据
            authName: undefined,
            describe: undefined
        });
    }

    componentDidMount() {
        this.props.onFetchAuth(this.props.authId)
    }


    render() {
        const {
            isLoading, // 是否加载中
            onUpdateAuth, // 更新管理员信息
            auth,
        } = this.props;

        const {
            authId,
            authName,
            describe,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    auth === undefined ? (
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
                                    <Divider>权限信息</Divider>
                                </Row>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        权限名：
                                    </Col>
                                    <Col span={18}>
                                        {auth.authName}
                                    </Col>
                                </Row>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        权限描述：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={describe} placeholder={auth.describe}
                                               onChange={(e) => {
                                                   this.setState({
                                                       describe: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                         xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    onUpdateAuth({
                                                        authId:auth.authId,
                                                        authName:auth.authName,
                                                        describe:describe===undefined||describe===""?auth.describe:describe
                                                    });
                                                    // this.props.history.push("/high/auth/");
                                                }}
                                        >修改</Button>
                                    </Col>
                                    {/*<Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>*/}

                                        {/*<Popconfirm placement="top" title={"确定删除权限 " + authName + " 吗？"}*/}
                                                    {/*onConfirm={() => {*/}
                                                        {/*onDelAuth(authId);*/}
                                                        {/*this.props.history.push("/high/auth/");*/}
                                                    {/*}} okText="确认" cancelText="点错了">*/}
                                            {/*<Button*/}
                                                {/*type={"danger"}*/}
                                                {/*style={{width: "100%"}}>删除</Button>*/}
                                        {/*</Popconfirm>*/}
                                    {/*</Col>*/}
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                        <Button
                                            style={{width: "100%"}}
                                            onClick={() => {
                                                this.props.history.push("/high/auth/");
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
    const auth = state.high.auth;
    return {
        authId: auth.authId,
        auth: auth.auth,
        isLoading: auth.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelAuth: (authId) => {
            let authIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.DelAuth(authIdList.concat(authId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onFetchAuth: (authId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchAuthInfo(authId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdateAuth: (authInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.UpdateAuth(authInfo,localStorage.getItem("RealFakeManagerJwt")));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));