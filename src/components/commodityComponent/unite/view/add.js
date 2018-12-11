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
const Panel = Collapse.Panel;

const CheckboxGroup = Checkbox.Group;
const {TextArea} = Input;

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

    }

    _cropCover() {
        // image in dataUrl
        this.setState({
            cover: this.refs.cropperCover.getCroppedCanvas().toDataURL()
        });
    }


    render() {
        const {
            auth,
            info,
            isLoading, // 是否加载中
            onAdd,
        } = this.props;

        const {
            uniteName,
            describe,
            cover,
            pictures,
            types,
            ids,
            fileList,
            imageUrl,
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
                                    <Divider>添加联名</Divider>
                                </Row>
                                {/*联名名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名名：
                                    </Col>
                                    <Col span={18}>
                                        <Input placeholder={"输入联名名"}
                                            style={{width: "70%"}} value={uniteName}
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
                                            placeholder={"输入联名描述"}
                                            rows={5}
                                            style={{width: "70%"}} value={describe}
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

                                        <Collapse bordered={false} >
                                            <Panel header="选择联名图片" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
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
                                {/*联名图片链接*/}
                                {
                                    pictures.length!==0?(
                                        <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                            <Col span={6} style={{textAlign: "right"}}>
                                                联名图片链接：
                                            </Col>
                                            <Col span={12}>

                                                <Collapse bordered={false} >
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
                                                                                <Option value={"unite"} key={"unite"}>跳转联名</Option>
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
                                    ):null
                                }
                                {/*联名封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名封面：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} >
                                            <Panel header="选择联名封面" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                <Row>
                                                    {
                                                        cover === undefined ? null : (
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
                                                    let idsFlag = false;
                                                    for (let i=0;i<pictures.length;i++){
                                                        if(ids[i]===""){
                                                            idsFlag=true;
                                                            break;
                                                        }
                                                    }
                                                    if(uniteName===undefined||uniteName===""||
                                                        describe===undefined||describe===""||
                                                        cover===undefined||cover===""||
                                                        pictures.length===0||
                                                        types.length===0||
                                                        ids.length===0||idsFlag){
                                                        message.error("信息输入不完整");
                                                    }else{
                                                        onAdd({
                                                            uniteName: uniteName,
                                                            describe: describe,
                                                            cover: cover,
                                                            pictures: pictures,
                                                            types: types,
                                                            ids: ids,
                                                        });
                                                        this.props.history.push("/commodity/unite/");
                                                    }
                                                    console.log(this.state);

                                                }}
                                        >确认添加</Button>
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
        auth: navLink.auth,
        info: navLink.info,
        isLoading: unite.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (uniteInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Add(localStorage.getItem("RealFakeManagerJwt"), uniteInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));