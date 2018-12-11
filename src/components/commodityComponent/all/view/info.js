import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {HashRouter, BrowserRouter, Route, NavLink, Redirect, withRouter} from 'react-router-dom';
import ShowImage from '../../../commom/showImage'
import ShowImages from '../../../commom/showImages'
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
    Tag, Select,Switch,
    Divider, Popconfirm, Modal, Upload, Timeline,Collapse
} from 'antd';
import lrz from 'lrz';
const Option = Select.Option;
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
            manId:undefined,
            commId:undefined,
            title: undefined,
            describe: undefined,
            pictures:[],
            cover: undefined,
            brandId: undefined,
            seriesId: undefined,
            typeId: [],
            uniteId: [],
            qualId: [],
            price: [],
            sizeId:[],
            isOut:false,
            oversize:undefined,

            oldPictures:[],
            fileList: [],
            isLoading: false,
            seriesList: [], // 系列列表
            brandList: [], // 品牌列表
            typeList: [], // 类型列表
            uniteList: [], // 联名列表
            qualList: [], // 品质列表
            sizeList: [], // 尺码列表
            commQualList:[],
            imageUrl: undefined,
        });
    }


    componentDidMount() {
        // 获取商品信息
        this.searchCommodity(this.props.commId);
        // 获取系列
        this.fetchSeries();
        //获取品牌
        this.fetchBrand();
        // 获取类型
        this.fetchType();
        // 获取类型
        this.fetchUnite();
        // 获取品质
        this.fetchQual();
        // 获取尺码
        this.fetchSize();
    }

    _crop() {
        // image in dataUrl
        this.setState({
            cover: this.refs.cropper.getCroppedCanvas().toDataURL()
        });
    }

    // 搜索商品
    searchCommodity(commId) {
        if(commId!==undefined){
            client.get({
                index: 'commodity',
                type: 'commodity',
                id:commId
            }).then(
                function (body) {
                    let value = body;

                    this.setState({...value._source,oldPictures:value._source.pictures});
                }.bind(this),
                function (error) {
                    console.trace(error.message);
                }
            );
        }

    }
    // 获取系列
    fetchSeries() {
        client.search({
            index: 'series',
            type: 'series',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({seriesList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取品牌
    fetchBrand() {
        client.search({
            index: 'brand',
            type: 'brand',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({brandList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取类型
    fetchType() {
        client.search({
            index: 'type',
            type: 'type',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({typeList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取联名
    fetchUnite() {
        client.search({
            index: 'unite',
            type: 'unite',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({uniteList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取品质
    fetchQual() {
        client.search({
            index: 'quality',
            type: 'quality',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({qualList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }
    // 获取尺码
    fetchSize() {
        client.search({
            index: 'size',
            type: 'size',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({sizeList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }


    render() {
        const {
            auth,
            info,
            commId,
            isLoading,
            onUpdateCommodity,
            onDeleteCommodity,
        } = this.props;
        const {
            manId,
            // 提交的数据
            title, // 商品标题
            describe, // 商品描述
            pictures, // 商品图片 文件名
            cover, // 商品封面 base64编码
            isOut, // 是否售空
            qualId, // 品质列表
            price, // 价格列表 下表index对应品质列表
            brandId, // 品牌
            seriesId, // 系列
            typeId, // 类型列表
            uniteId, // 联名列表
            sizeId, // 尺码列表
            oversize, // 尺码信息

            // 中间数据
            oldPictures, // 商品当前图片
            seriesList, // 系列列表
            brandList, // 品牌列表
            typeList, // 类型列表
            uniteList,// 联名列表
            qualList, // 品质列表
            sizeList,// 尺码列表
            fileList, // 商品图片上传的中间数据
            imageUrl, // 商品封面的中间数据 base64编码
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    commId === undefined ? (
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
                                    <Divider>商品信息(发布管理员:{manId})</Divider>
                                </Row>
                                {/*商品标题*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        商品标题：
                                    </Col>
                                    <Col span={18}>
                                        <Input
                                            value={title}
                                            style={{width: "70%"}} placeholder={"商品标题"}
                                               onChange={(e) => {
                                                   this.setState({title: e.target.value})
                                               }}/>
                                    </Col>
                                </Row>
                                {/*商品描述*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        商品描述：
                                    </Col>
                                    <Col span={18}>
                                        <TextArea
                                            value={describe}
                                            rows={5} style={{width: "70%"}} placeholder={"商品标描述"}
                                                  onChange={(e) => {
                                                      this.setState({describe: e.target.value})
                                                  }}/>
                                    </Col>
                                </Row>
                                {/*商品图片*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        商品图片：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择商品图片" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                <ShowImages images={oldPictures} size={70}/><br/>
                                                (此操作将删除历史图片)<br/>
                                                <Upload
                                                    accept={"image/*"}
                                                    multiple
                                                    action="/mock/upload"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={({fileList}) => this.setState({
                                                        pictures:fileList.reduce((list,next)=>(list.concat(next.name)),[]),
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
                                {/*商品封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        商品封面：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择商品封面" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>

                                                <Row>
                                                    {
                                                        cover===undefined?null:(
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
                                                                // const reader = new FileReader();
                                                                // reader.readAsDataURL(file); //开始读取文件
                                                                // // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
                                                                // reader.onload = (e) => {
                                                                //     this.setState({
                                                                //         imageUrl: e.target.result, //cropper的图片路径
                                                                //     })
                                                                // };
                                                                console.log(file.size/1024);
                                                                lrz(file, {quality:0.15})
                                                                    .then((rst)=>{
                                                                        console.log(rst.fileLen/1024);
                                                                        this.setState({
                                                                            imageUrl:rst.base64,
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
                                                            imageUrl===undefined?(
                                                                "请先上传封面图片"
                                                            ):(
                                                                <Cropper
                                                                    ref='cropper'
                                                                    src={imageUrl}
                                                                    style={{height: 300, width: '100%'}}
                                                                    // Cropper.js options
                                                                    aspectRatio={1}
                                                                    guides={true}
                                                                    crop={this._crop.bind(this)}/>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*商品品牌系列*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        品牌：
                                    </Col>
                                    <Col span={3}>
                                        <Select defaultValue={brandId}
                                                notFoundContent={"没有匹配内容"} allowClear
                                                dropdownMatchSelectWidth={false}
                                                disabled={isLoading}
                                                showSearch
                                                style={{width: "100%", paddingRight: 5}}
                                                placeholder="品牌"
                                                optionFilterProp="children"
                                                onChange={(e) => {
                                                    this.setState({brandId: e});
                                                }}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {   //遍历选定品牌后该品牌下的系列
                                                brandList.map((item, index) => (
                                                    <Option value={item.brandId}
                                                            key={index}>{item.brandName}</Option>
                                                ))
                                            }
                                        </Select>
                                        {brandList.length===0?(""):(
                                        brandList.filter(item=>(item.brandId===brandId))[0].brandName
                                    )}(当前)
                                    </Col>
                                    <Col span={3} style={{textAlign: "right"}}>
                                        系列：
                                    </Col>
                                    <Col span={3}>
                                        <Select defaultValue={seriesId}
                                            notFoundContent={"没有匹配内容"} allowClear
                                                dropdownMatchSelectWidth={false}
                                                disabled={isLoading}
                                                showSearch
                                                style={{width: "100%", paddingRight: 5}}
                                                placeholder="系列"
                                                optionFilterProp="children"
                                                onChange={(e) => {
                                                    this.setState({seriesId: e});
                                                }}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {   //遍历选定品牌后该品牌下的系列
                                                brandId === undefined ? (
                                                    <Option value={undefined}>-请选择品牌-</Option>
                                                ) : (
                                                    seriesList.filter(item => (item.brandId === brandId)).map((item, index) => (
                                                        <Option value={item.seriesId}
                                                                key={index}>{item.seriesName}</Option>
                                                    ))
                                                )
                                            }
                                        </Select>
                                        {seriesList.length===0?(""):(
                                            seriesList.filter(item=>(item.seriesId===seriesId))[0].seriesName
                                        )}(当前)
                                    </Col>
                                </Row>
                                {/*商品类型联名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        类型：
                                    </Col>
                                    <Col span={3}>
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择类型" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                {
                                                    typeList.map((item, index) => {
                                                        let flag = false;
                                                        for(let i=0;i<typeId.length;i++){
                                                            if(typeId[i]===item.typeId){
                                                                flag = true;
                                                                break;
                                                            }
                                                        }
                                                        return (
                                                            <Row key={index}>
                                                                <Checkbox checked={flag}
                                                                          value={item.typeId} onChange={(e) => {
                                                                    if(e.target.checked){
                                                                        let newTypeId = this.state.typeId;
                                                                        this.setState({typeId:newTypeId.concat(e.target.value)})
                                                                    }else{
                                                                        let newTypeId = this.state.typeId;
                                                                        const i = newTypeId.indexOf(e.target.value);
                                                                        if(i!==-1){
                                                                            newTypeId.remove(i);
                                                                        }
                                                                        this.setState({typeId:newTypeId})
                                                                    }
                                                                }}>{item.typeName}</Checkbox>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                    <Col span={3} style={{textAlign: "right"}}>
                                        联名：
                                    </Col>
                                    <Col span={3}>
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择联名" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                {
                                                    uniteList.map((item, index) => {
                                                        let flag = false;
                                                        for(let i=0;i<uniteId.length;i++){
                                                            if(uniteId[i]===item.uniteId){
                                                                flag = true;
                                                                break;
                                                            }
                                                        }
                                                        return (
                                                            <Row key={index}>
                                                                <Checkbox checked={flag}
                                                                          value={item.uniteId} onChange={(e) => {
                                                                    if(e.target.checked){
                                                                        let newUniteId = this.state.uniteId;
                                                                        this.setState({uniteId:newUniteId.concat(e.target.value)})
                                                                    }else{
                                                                        let newUniteId = this.state.uniteId;
                                                                        const i = newUniteId.indexOf(e.target.value);
                                                                        if(i!==-1){
                                                                            newUniteId.remove(i);
                                                                        }
                                                                        this.setState({uniteId:newUniteId})
                                                                    }
                                                                }}>{item.uniteName}</Checkbox>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                {/*商品价格品质*/}
                                <Row type={"flex"} align={"middle"}  style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        价格：
                                    </Col>
                                    <Col span={6}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择品质" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                {
                                                    qualList.map((item, index) => {
                                                        let flag = false;
                                                        for(let i=0;i<qualId.length;i++){
                                                            if(qualId[i]===item.qualId){
                                                                flag = true;
                                                                break;
                                                            }
                                                        }
                                                        return (
                                                            <Row key={index} style={{paddingBottom:"2%"}}>
                                                                <Checkbox checked={flag} onChange={(e) => {
                                                                    if(e.target.checked){
                                                                        let newQualId = this.state.qualId;
                                                                        let newPrice = this.state.price;
                                                                        this.setState({
                                                                            qualId:newQualId.concat(e.target.value),
                                                                            price:newPrice.concat(0)
                                                                        })
                                                                    }else{
                                                                        let newQualId = this.state.qualId;
                                                                        let newPrice = this.state.price;
                                                                        const i = newQualId.indexOf(e.target.value);
                                                                        if(i!==-1){
                                                                            newQualId.remove(i);
                                                                            newPrice.remove(i)
                                                                        }
                                                                        this.setState({qualId:newQualId,price:newPrice})
                                                                    }
                                                                }}  value={item.qualId}>
                                                                    {item.qualName}
                                                                    <Input
                                                                        value={
                                                                            this.state.qualId.indexOf(item.qualId)!==-1?(
                                                                                this.state.price[this.state.qualId.indexOf(item.qualId)]
                                                                            ):""
                                                                        }
                                                                        style={{width:"50%"}}
                                                                        placeholder={"请输入相应价格"} onChange={(e) => {

                                                                        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                                                                        const value = e.target.value;
                                                                        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                                                                            if(this.state.qualId.indexOf(item.qualId)!==-1){
                                                                                let newPrice = this.state.price;
                                                                                newPrice[this.state.qualId.indexOf(item.qualId)] = parseInt(value);
                                                                                this.setState({price:newPrice})
                                                                            }
                                                                        }

                                                                    }}/>
                                                                </Checkbox>

                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*商品尺码*/}
                                <Row type={"flex"} align={"middle"}  style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        尺码：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Panel header="选择尺码" key="1" style={{background: '#f7f7f7',border: 0,overflow: 'hidden'}}>
                                                {
                                                    sizeList.map((item, index) => {
                                                        let flag = false;
                                                        for(let i=0;i<sizeId.length;i++){
                                                            if(sizeId[i]===item.sizeId){
                                                                flag = true;
                                                                break;
                                                            }
                                                        }
                                                        return (
                                                            <Checkbox checked={flag}
                                                                      value={item.sizeId} onChange={(e) => {
                                                                if(e.target.checked){
                                                                    let newSizeId = this.state.sizeId;
                                                                    this.setState({sizeId:newSizeId.concat(e.target.value)})
                                                                }else{
                                                                    let newSizeId = this.state.sizeId;
                                                                    const i = newSizeId.indexOf(e.target.value);
                                                                    if(i!==-1){
                                                                        newSizeId.remove(i);
                                                                    }
                                                                    this.setState({sizeId:newSizeId})
                                                                }
                                                            }}>{item.sizeId}</Checkbox>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*商品状态*/}
                                <Row  style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        尺码标准：
                                    </Col>
                                    <Col span={3}>
                                        <Select notFoundContent={"没有匹配内容"} allowClear
                                                dropdownMatchSelectWidth={false}
                                                disabled={isLoading}
                                                showSearch
                                                style={{width: "100%", paddingRight: 5}}
                                                placeholder="尺码信息"
                                                optionFilterProp="children"
                                                onChange={(e) => {
                                                    this.setState({oversize: e});
                                                }}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value={"标准码"} key={"标准码"}>标准码</Option>
                                            <Option value={"偏大一码"} key={"偏大一码"}>偏大一码</Option>
                                            <Option value={"偏小一码"} key={"偏小一码"}>偏小一码</Option>
                                            <Option value={"偏大半码"} key={"偏大半码"}>偏大半码</Option>
                                            <Option value={"偏小半码"} key={"偏小半码"}>偏小半码</Option>
                                        </Select>
                                        {oversize}(当前)
                                    </Col>
                                    <Col span={3} style={{textAlign: "right"}}>
                                        是否售空：
                                    </Col>
                                    <Col span={3}>
                                        <Switch checked={isOut} checkedChildren="是" unCheckedChildren="否" onChange={(e) => {
                                            this.setState({isOut: e});
                                        }} />
                                    </Col>
                                </Row>
                                {/*确认*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                         xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    const flag = title===undefined||describe===undefined||pictures.length===0||cover.length===0
                                                        ||qualId.length===0||price.length===0||brandId===undefined||seriesId===undefined||sizeId.length===0||oversize===undefined;
                                                    if(flag){
                                                        message.error("请输入完整");
                                                    }else{
                                                        onUpdateCommodity({
                                                            title: title,
                                                            describe: describe,
                                                            pictures:pictures,
                                                            cover: cover,
                                                            brandId: brandId,
                                                            seriesId: seriesId,
                                                            typeId: typeId,
                                                            uniteId: uniteId,
                                                            qualId:qualId,
                                                            price:price,
                                                            sizeId:sizeId,
                                                            isOut:isOut,
                                                            oversize:oversize
                                                        });
                                                        this.props.history.push("/commodity/all");
                                                    }
                                                }}
                                        >确认修改</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>

                                        <Popconfirm placement="top" title={"确定删除商品 "+commId+" 吗？"} onConfirm={()=>{
                                            onDeleteCommodity(commId);
                                            this.props.history.push("/commodity/all/");
                                        }} okText="确认" cancelText="点错了">
                                            <Button
                                                type={"danger"}
                                                style={{width: "100%"}}>
                                                删除该商品
                                            </Button>
                                        </Popconfirm>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                        <Button
                                            style={{width: "100%"}}
                                            onClick={() => {
                                                onDeleteCommodity(commId);
                                                this.props.history.push("/commodity/all/");
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
    const all = state.commodity.all;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        commId: all.commId,
        isLoading: all.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCommodity: (commInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.UpdateCommodity(localStorage.getItem("RealFakeManagerJwt"), commInfo));
        },
        onDeleteCommodity: (commId) => {
            dispatch(Actions.Start());
            dispatch(Actions.DeleteCommodity(localStorage.getItem("RealFakeManagerJwt"), commId));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(info));


Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (let i = 0, n = 0; i < this.length; i++) {
        if (this[i] !== this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};