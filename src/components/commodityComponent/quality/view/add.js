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
            // 需要提交的数据
            qualName: undefined,

        });
    }

    componentDidMount() {

    }



    render() {
        const {
            auth,
            info,
            isLoading, // 是否加载中
            onAdd,
        } = this.props;

        const {
            qualName,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    //品质-超级管理员-编辑类目
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
                                    <Divider>添加品质</Divider>
                                </Row>
                                {/*品质名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        品质名：
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder={"输入品质名"}
                                            style={{width: "70%"}} value={qualName}
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
                                                        onAdd({
                                                            qualName: qualName
                                                        });
                                                        this.props.history.push("/commodity/quality/");
                                                    }
                                                    console.log(this.state);

                                                }}
                                        >确认添加</Button>
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
        auth: navLink.auth,
        info: navLink.info,
        isLoading: quality.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (qualityInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Add(localStorage.getItem("RealFakeManagerJwt"), qualityInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));