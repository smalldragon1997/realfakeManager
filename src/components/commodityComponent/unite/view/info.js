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

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            uniteId: undefined,
            // 需要提交的数据
            uniteName: undefined,
            describe: undefined,
            cover: undefined,
            pictures: [],
            types: [],
            ids: [],

            fileList: [],
            imageUrl: undefined,
        });
    }

    componentDidMount() {
        if (this.props.uniteId !== undefined) {
            this.props.onFetchUniteInfo(this.props.uniteId);
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
            uniteId,
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
            uniteInfo,
            info
        } = this.props;

        const {
            uniteName,
            describe,
            cover,
            manId,
            pictures,
            types,
            ids,
            oldPictures,
            fileList,
            imageUrl,
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    uniteInfo === undefined ? (
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
                                    <Divider>联名信息(发布管理员:{uniteInfo.managerInfo.nickname})</Divider>
                                </Row>
                                {/*联名名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={uniteName}
                                               placeholder={uniteInfo.uniteName}
                                               onChange={(e) => {
                                                   this.setState({
                                                       uniteName: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*联名描述*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名描述：
                                    </Col>
                                    <Col span={18}>
                                        <TextArea
                                            rows={5}
                                            style={{width: "70%"}} value={describe} placeholder={uniteInfo.describe}
                                            onChange={(e) => {
                                                this.setState({
                                                    describe: e.target.value
                                                })
                                            }}/>
                                    </Col>
                                </Row>
                                {/*联名图片*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名图片：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择联名图片" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                <ShowImages
                                                    images={uniteInfo.unitePicList.reduce((list, next) => (list.concat(next.url)), [])}
                                                    size={70}/><br/>

                                                (此操作将删除历史图片)<br/>
                                                <Upload
                                                    headers={{Authorization: "bearer " + localStorage.getItem("RealFakeManagerJwt")}}
                                                    accept={"image/*"}
                                                    multiple
                                                    action="/api/v1/data/file"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={({fileList}) => this.setState({
                                                        types: fileList.reduce((list, next) => (list.concat("commodities")), []),
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
                                {/*联名图片链接*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名图片链接：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="设置图片跳转" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>

                                                (按图片顺序)
                                                {
                                                    pictures.length === 0 ? "请上传图片后设置图片跳转" :
                                                        pictures.map((item, index) => {
                                                            return (
                                                                <Row style={{padding: 5}}>
                                                                    <Col span={8}>
                                                                        <Select
                                                                            value={types[index] === "" ? ("commodities") : (types[index])}
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
                                                                            <Option value={"commodities"}
                                                                                    key={"commodity"}>跳转商品</Option>
                                                                            <Option value={"brands"}
                                                                                    key={"brand"}>跳转品牌</Option>
                                                                            <Option value={"series"}
                                                                                    key={"series"}>跳转系列</Option>
                                                                            <Option value={"unites"}
                                                                                    key={"unite"}>跳转联名</Option>
                                                                        </Select>
                                                                    </Col>
                                                                    <Col span={8}>
                                                                        <Row type={"flex"} align={"middle"}>
                                                                            <Col span={14} style={{textAlign: "right"}}>
                                                                                跳转编号：
                                                                            </Col>
                                                                            <Col span={10}>
                                                                                <Input value={ids[index]}
                                                                                       onChange={(e) => {
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
                                        当前图片跳转(按顺序)<br/>{
                                        uniteInfo.unitePicList.map((item, index) => (
                                            <Row>{"跳转：" + item.type + " 编号：" + item.id}</Row>
                                        ))
                                    }
                                    </Col>
                                </Row>
                                {/*联名封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名封面：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择联名封面" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                <Row>
                                                    {
                                                        cover === undefined ? (
                                                            <Col span={10}>
                                                                <Avatar src={uniteInfo.cover} size={160}
                                                                        shape={"square"}/>
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
                                                        manId: info.manId,
                                                        uniteId: uniteInfo.uniteId,
                                                        uniteName: uniteName === undefined || uniteName === "" ? uniteInfo.uniteName : uniteName,
                                                        describe: describe === undefined || describe === "" ? uniteInfo.describe : describe,
                                                        cover: cover === undefined || cover === "" ? uniteInfo.cover : cover,
                                                        pictures: pictures,
                                                        types: types,
                                                        ids: ids,
                                                    });
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除联名 " + uniteInfo.uniteName + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(uniteId);
                                                        this.props.history.push("/commodity/unite/");
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
                                                this.props.history.push("/commodity/unite/");
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
    const unite = state.commodity.unite;
    const navLink = state.navLink;
    return {
        info: navLink.info,
        uniteId: unite.uniteId,
        uniteInfo: unite.uniteInfo,
        isLoading: unite.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (uniteId) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(uniteId, localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (uniteInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), uniteInfo));
        },
        onFetchUniteInfo: (uniteId) => {
            dispatch(Actions.Start());
            dispatch(Actions.FetchUniteInfo(uniteId));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));