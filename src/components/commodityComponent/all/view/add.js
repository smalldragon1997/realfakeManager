import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import * as BrandActions from '../../brand/actions';
import * as SeriesActions from '../../series/actions';
import * as TypeActions from '../../type/actions';
import * as UniteActions from '../../unite/actions';
import * as QualityActions from '../../quality/actions';
import * as SizeActions from '../../size/actions';
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
    Tag, Select, Switch,
    Divider, Popconfirm, Modal, Upload, Timeline, Collapse
} from 'antd';
import lrz from 'lrz';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const {TextArea} = Input;

class info extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            manId: undefined,
            commId: undefined,
            title: undefined,
            describe: undefined,
            pictures: [],
            cover: undefined,
            brandId: undefined,
            seriesId: undefined,
            typeId: undefined,
            uniteId: undefined,
            qualId: undefined,
            price: undefined,
            sizeId: undefined,
            isOut: false,
            oversize: undefined,

            coverVisible: false,
            fileList: [],
            isLoading: false,
            imageUrl: undefined,
        });
    }


    componentDidMount() {
        this.props.onFetchBrandList();
        this.props.onFetchSeriesList();
        this.props.onFetchTypeList();
        this.props.onFetchUniteList();
        this.props.onFetchQualityList();
        this.props.onFetchSizeList();
    }

    _crop() {
        // image in dataUrl
        this.setState({
            cover: this.refs.cropper.getCroppedCanvas().toDataURL()
        });
    }

    render() {
        const {
            auth, // 管理员权限
            info, // 管理员信息


            brandList,
            seriesList,
            typeList,
            uniteList,
            qualityList,
            sizeList,
            isLoading,

            onAddCommodity, // 添加商品
        } = this.props;
        const {
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

            fileList, // 商品图片上传的中间数据
            imageUrl, // 商品封面的中间数据 base64编码
        } = this.state;

        return (
            <Spin spinning={isLoading}>
                {
                    //权限-超级管理员-编辑商品
                    !(info!==undefined && info.isSuper || auth.edi_comm) ? (
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
                                    <Divider>添加商品</Divider>
                                </Row>
                                {/*商品标题*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        商品标题：
                                    </Col>
                                    <Col span={18}>
                                        <Input style={{width: "70%"}} placeholder={"商品标题"}
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
                                        <TextArea rows={5} style={{width: "70%"}} placeholder={"商品描述"}
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

                                        <Collapse bordered={false}>
                                            <Panel header="选择商品图片" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                <Upload
                                                    headers={{Authorization: "bearer " + localStorage.getItem("RealFakeManagerJwt")}}
                                                    accept={"image/*"}
                                                    multiple
                                                    action="/api/v1/data/file"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    onChange={({fileList}) => this.setState({
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
                                {/*商品封面*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        商品封面：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false}>
                                            <Panel header="选择商品封面" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>

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
                                                                // const reader = new FileReader();
                                                                // reader.readAsDataURL(file); //开始读取文件
                                                                // // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
                                                                // reader.onload = (e) => {
                                                                //     this.setState({
                                                                //         imageUrl: e.target.result, //cropper的图片路径
                                                                //     })
                                                                // };
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
                                <Row style={{padding: "3%", paddingTop: 0}} align={"middle"} type={"flex"}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        品牌：
                                    </Col>
                                    <Col span={3}>
                                        <Select notFoundContent={"没有匹配内容"} allowClear
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
                                    </Col>
                                    <Col span={3} style={{textAlign: "right"}}>
                                        系列：
                                    </Col>
                                    <Col span={3}>
                                        <Select notFoundContent={"没有匹配内容"} allowClear
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
                                                    seriesList
                                                        .filter(item => (item.brand !== null && item.brand.brandId === brandId))
                                                        .map((item, index) => (
                                                            <Option value={item.seriesId}
                                                                    key={index}>{item.seriesName}</Option>
                                                        ))
                                                )
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                                {/*商品类型联名*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        类型：
                                    </Col>
                                    <Col span={12}>
                                        <Collapse bordered={false}>
                                            <Panel header="选择类型" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                {
                                                    typeList.map((item, index) => {
                                                        return (
                                                            <Checkbox key={index}
                                                                      value={item.typeId} onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    let newTypeId = this.state.typeId;
                                                                    this.setState({typeId: newTypeId === undefined ? [].concat(e.target.value) : newTypeId.concat(e.target.value)})
                                                                } else {
                                                                    let newTypeId = this.state.typeId;
                                                                    const i = newTypeId.indexOf(e.target.value);
                                                                    if (i !== -1) {
                                                                        newTypeId.remove(i);
                                                                    }
                                                                    this.setState({typeId: newTypeId})
                                                                }
                                                            }}>{item.typeName}</Checkbox>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        联名：
                                    </Col>
                                    <Col span={12}>
                                        <Collapse bordered={false}>
                                            <Panel header="选择联名" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                {
                                                    uniteList.map((item, index) => {
                                                        return (
                                                            <Checkbox key={index}
                                                                      value={item.uniteId} onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    let newUniteId = this.state.uniteId;
                                                                    this.setState({uniteId: newUniteId === undefined ? [].concat(e.target.value) : newUniteId.concat(e.target.value)})
                                                                } else {
                                                                    let newUniteId = this.state.uniteId;
                                                                    const i = newUniteId.indexOf(e.target.value);
                                                                    if (i !== -1) {
                                                                        newUniteId.remove(i);
                                                                    }
                                                                    this.setState({uniteId: newUniteId})
                                                                }
                                                            }}>{item.uniteName}</Checkbox>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                {/*商品价格品质*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        价格：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false}>
                                            <Panel header="选择品质" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                {
                                                    qualityList.map((item, index) => {
                                                        return (
                                                            <Row key={index} style={{paddingBottom: "2%"}}>
                                                                <Checkbox onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        let newQualId = this.state.qualId;
                                                                        let newPrice = this.state.price;
                                                                        this.setState({
                                                                            qualId: newQualId === undefined ? [].concat(e.target.value) : newQualId.concat(e.target.value),
                                                                            price: newPrice === undefined ? [].concat(0) : newPrice.concat(0)
                                                                        })
                                                                    } else {
                                                                        let newQualId = this.state.qualId;
                                                                        let newPrice = this.state.price;
                                                                        const i = newQualId.indexOf(e.target.value);
                                                                        if (i !== -1) {
                                                                            newQualId.remove(i);
                                                                            newPrice.remove(i)
                                                                        }
                                                                        this.setState({
                                                                            qualId: newQualId,
                                                                            price: newPrice
                                                                        })
                                                                    }
                                                                }} value={item.qualId}>
                                                                    {item.qualName+" 价格:"}
                                                                    <Input
                                                                        value={
                                                                            this.state.qualId===undefined?"":this.state.qualId.indexOf(item.qualId) !== -1 ? (
                                                                                this.state.price[this.state.qualId.indexOf(item.qualId)]
                                                                            ) : ""
                                                                        }
                                                                        style={{width: "50%"}}
                                                                        placeholder={"请输入 "+item.qualName+" 价格"} onChange={(e) => {

                                                                        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
                                                                        const value = e.target.value;
                                                                        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                                                                            if (this.state.qualId.indexOf(item.qualId) !== -1) {
                                                                                let newPrice = this.state.price;
                                                                                newPrice[this.state.qualId.indexOf(item.qualId)] = parseInt(value);
                                                                                this.setState({price: newPrice})
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
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                    <Col span={6} style={{textAlign: "right"}}>
                                        尺码：
                                    </Col>
                                    <Col span={12}>

                                        <Collapse bordered={false}>
                                            <Panel header="选择尺码" key="1"
                                                   style={{background: '#f7f7f7', border: 0, overflow: 'hidden'}}>
                                                {
                                                    sizeList.sort(sortSize).map((item, index) => {
                                                        return (
                                                            <Checkbox key={index}
                                                                      value={item.sizeId} onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    let newSizeId = this.state.sizeId;
                                                                    this.setState({sizeId: newSizeId === undefined ? [].concat(e.target.value) : newSizeId.concat(e.target.value)})
                                                                } else {
                                                                    let newSizeId = this.state.sizeId;
                                                                    const i = newSizeId.indexOf(e.target.value);
                                                                    if (i !== -1) {
                                                                        newSizeId.remove(i);
                                                                    }
                                                                    this.setState({sizeId: newSizeId})
                                                                }
                                                            }}>{item.value}</Checkbox>
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>

                                    </Col>
                                </Row>
                                {/*商品状态*/}
                                <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
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
                                    </Col>
                                    <Col span={3} style={{textAlign: "right"}}>
                                        是否售空：
                                    </Col>
                                    <Col span={3}>
                                        <Switch checkedChildren="是" unCheckedChildren="否" onChange={(e) => {
                                            this.setState({isOut: e});
                                        }}/>
                                    </Col>
                                </Row>
                                {/*确认*/}
                                <Row style={{padding: "3%", paddingTop: 0}}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={{span: 3, offset: 6}}
                                         xxl={{span: 3, offset: 6}} style={{padding: "1%"}}>
                                        <Button type={"primary"} style={{width: "100%"}}
                                                onClick={() => {
                                                    const flag = title === undefined || describe === undefined || pictures.length === 0 || cover.length === 0
                                                        || qualId.length === 0 || price.length === 0 || brandId === undefined || seriesId === undefined || sizeId.length === 0 || oversize === undefined;
                                                    if (flag) {
                                                        message.error("请输入完整");
                                                    } else {
                                                        if(title===undefined||title===""||
                                                            describe===undefined||describe===""||
                                                            pictures.length===0||
                                                            cover===undefined||cover===""||
                                                            brandId===undefined||brandId===""||
                                                            seriesId===undefined||seriesId===""||
                                                            isOut===undefined||oversize===undefined||
                                                            qualId.length===0||
                                                            sizeId.length===0){
                                                            message.error("商品信息不完整")
                                                        }
                                                        onAddCommodity({
                                                            manId: info.manId,
                                                            title: title ,
                                                            describe: describe,
                                                            pictures: pictures,
                                                            cover: cover ,
                                                            brandId: brandId ,
                                                            seriesId: seriesId,
                                                            typeId: typeId===undefined?[]:typeId,
                                                            uniteId: uniteId===undefined?[]:uniteId,
                                                            qualityId: qualId,
                                                            price: price ,
                                                            sizeId: sizeId,
                                                            soldOut: isOut,
                                                            oversize:oversize,
                                                        });
                                                    }
                                                }}
                                        >确认添加</Button>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3} style={{padding: "1%"}}>
                                        <Button
                                            style={{width: "100%"}}
                                            onClick={() => {
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
    const brand = state.commodity.brand;
    const series = state.commodity.series;
    const type = state.commodity.type;
    const unite = state.commodity.unite;
    const quality = state.commodity.quality;
    const size = state.commodity.size;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        brandList: brand.brandList,
        seriesList: series.seriesList,
        typeList: type.typeList,
        uniteList: unite.uniteList,
        qualityList: quality.qualityList,
        sizeList: size.sizeList,
        isLoading: all.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onAddCommodity: (commInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.AddCommodity(localStorage.getItem("RealFakeManagerJwt"), commInfo));
        },
        onFetchBrandList: () => {
            dispatch(BrandActions.Fetching());
        },
        onFetchSeriesList: () => {
            dispatch(SeriesActions.Fetching());
        },
        onFetchTypeList: () => {
            dispatch(TypeActions.Fetching());
        },
        onFetchUniteList: () => {
            dispatch(UniteActions.Fetching());
        },
        onFetchQualityList: () => {
            dispatch(QualityActions.Fetching());
        },
        onFetchSizeList: () => {
            dispatch(SizeActions.Fetching());
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
function sortSize(a,b){
    return a.value.split("码")[0]-b.value.split("码")[0];
}