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
        if(this.props.qualityId!==undefined){
            this.props.onFetchQualityInfo(this.props.qualityId);
        }
    }

    render() {
        const {
            qualityId,
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
            qualityInfo,
            info
        } = this.props;

        const {
            qualName,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    qualityInfo === undefined ? (
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
                                    <Divider>品质信息(发布管理员:{qualityInfo.managerInfo.nickname})</Divider>
                                </Row>
                                {/*品质名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        品质名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={qualName} placeholder={qualityInfo.qualName}
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
                                                    onUpdate({
                                                        manId:info.manId,
                                                        qualityId:qualityInfo.qualId,
                                                        qualName: qualName===undefined||qualName===""?qualityInfo.qualName:qualName
                                                    });
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除品质 " + qualName + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(qualityInfo.qualId);
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
    const navLink = state.navLink;
    return {
        info: navLink.info,
        qualityId: quality.qualityId,
        qualityInfo: quality.qualityInfo,
        isLoading: quality.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (qualId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(qualId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (qualityInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), qualityInfo));
        },
        onFetchQualityInfo: (qualityId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchQualityInfo(qualityId));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));