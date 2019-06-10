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


class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            disId: undefined,
            // 需要提交的数据
            disName: undefined,
            price: undefined,
            cover: undefined,
            manId: undefined,

            imageUrl: undefined,
        });
    }

    componentDidMount() {
        if(this.props.discountId!==undefined){
            this.props.onFetchDiscountInfo(this.props.discountId);
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
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
            discountInfo,
            info
        } = this.props;

        const {
            disName,
            price,
            cover,
            manId,
            imageUrl,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    discountInfo === undefined ? (
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
                                    <Divider>代金卷信息(发布管理员:{discountInfo.managerInfo.nickname})</Divider>
                                </Row>
                                {/*代金卷名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        代金卷名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={disName} placeholder={discountInfo.disName}
                                               onChange={(e) => {
                                                   this.setState({
                                                       disName: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*代金卷描述*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        代金卷价格：
                                    </Col>
                                    <Col span={18}>
                                        <Input
                                            style={{width: "70%"}} value={price} placeholder={discountInfo.price}
                                            onChange={(e) => {
                                                this.setState({
                                                    price: e.target.value
                                                })
                                            }}/>
                                    </Col>
                                </Row>
                                {/*代金卷封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        代金卷封面：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择代金卷封面" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

                                                <Row>
                                                    {
                                                        cover === undefined ? (
                                                            <Col span={10}>
                                                                <Avatar src={discountInfo.cover} size={160} shape={"square"}/>
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
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                         xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    onUpdate({
                                                        manId:info.manId,
                                                        disId:discountInfo.disId,
                                                        disName: disName === undefined || disName === "" ? discountInfo.disName : disName,
                                                        price: price === undefined || price === "" ? discountInfo.price : price,
                                                        cover: cover === undefined || cover === "" ? discountInfo.cover : cover,
                                                    });
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除代金卷 " + disName + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(discountInfo.disId);
                                                        this.props.history.push("/commodity/discount/");
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
                                                this.props.history.push("/commodity/discount/");
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
    const discount = state.commodity.discount;
    const navLink = state.navLink;
    return {
        info: navLink.info,
        discountId: discount.discountId,
        discountInfo:discount.discountInfo,
        isLoading: discount.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (disId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(disId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (disInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), disInfo));
        },
        onFetchDiscountInfo: (disId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchDiscountInfo(disId));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));