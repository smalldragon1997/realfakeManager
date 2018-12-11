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
// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            seriesId: undefined,
            // 需要提交的数据
            seriesName: undefined,
            describe: undefined,
            cover: undefined,
            manId: undefined,
            pictures: [],
            types: [],
            ids: [],


            oldPictures: [],
            fileList: [],
            imageUrl: undefined,
        });
    }

    componentDidMount() {

        //获取系列信息
        this.searchSeries(this.props.seriesId);
    }

    _cropCover() {
        // image in dataUrl
        this.setState({
            cover: this.refs.cropperCover.getCroppedCanvas().toDataURL()
        });
    }


    // 搜索系列
    searchSeries(seriesId) {
        if (seriesId !== undefined) {
            client.get({
                index: 'series',
                type: 'series',
                id: seriesId
            }).then(
                function (body) {
                    this.setState({
                        ...body._source,
                        oldPictures: body._source.pictures
                    });
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }

    render() {
        const {
            seriesId,
            isLoading, // 是否加载中
            onDelete,
            onUpdate,
        } = this.props;

        const {
            seriesName,
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
                    seriesId === undefined ? (
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
                                    <Divider>系列信息(发布管理员:{manId})</Divider>
                                </Row>
                                {/*系列名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        系列名：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} value={seriesName}
                                               onChange={(e) => {
                                                   this.setState({
                                                       seriesName: e.target.value
                                                   })
                                               }}/>
                                    </Col>
                                </Row>
                                {/*系列描述*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        系列描述：
                                    </Col>
                                    <Col span={18}>
                                        <TextArea
                                            rows={5}
                                            style={{width: "70%"}} value={describe}
                                            onChange={(e) => {
                                                this.setState({
                                                    describe: e.target.value
                                                })
                                            }}/>
                                    </Col>
                                </Row>
                                {/*系列图片*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        系列图片：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择系列图片" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                <ShowImages images={oldPictures} size={70}/><br/>
                                                (此操作将删除历史图片)<br/>
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
                                {/*系列图片链接*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        系列图片链接：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
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
                                                                        <Option value={"brand"} key={"brand"}>跳转品牌</Option>
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
                                {/*系列封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        系列封面：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择品牌图片" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

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
                                                    if(seriesName===undefined||seriesName===""||
                                                        describe===undefined||describe===""||
                                                        cover===undefined||cover===""||
                                                        pictures.length===0||
                                                        types.length===0||
                                                        ids.length===0||idsFlag){
                                                        message.error("信息输入不完整");
                                                    }else{
                                                        onUpdate({
                                                            seriesName: seriesName,
                                                            describe: describe,
                                                            cover: cover,
                                                            pictures: pictures,
                                                            types: types,
                                                            ids: ids,
                                                        });
                                                        this.props.history.push("/commodity/series/");
                                                    }
                                                    console.log(this.state);
                                                }}
                                        >修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除系列 " + seriesName + " 吗？"}
                                                    onConfirm={() => {
                                                        onDelete(seriesId);
                                                        this.props.history.push("/commodity/series/");
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
                                                this.props.history.push("/commodity/series/");
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
    const series = state.commodity.series;
    return {
        seriesId: series.seriesId,
        isLoading: series.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (seriesId) => {
            let seriesIdList = [];
            dispatch(Actions.Start());
            dispatch(Actions.Delete(seriesIdList.push(seriesId), localStorage.getItem("RealFakeManagerJwt")));
        },
        onUpdate: (seriesInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Update(localStorage.getItem("RealFakeManagerJwt"), seriesInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));