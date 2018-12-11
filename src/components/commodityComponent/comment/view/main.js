import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';
import ShowImages from '../../../commom/showImages';
import * as UserActions from '../../../userComponent/all/actions';
import * as CommActions from '../../../commodityComponent/all/actions';
import {HashRouter, BrowserRouter, Route, NavLink, Switch, Redirect, withRouter} from 'react-router-dom';
import {
    Menu,
    Icon,
    Row,
    Col,
    Avatar,
    Dropdown,
    Spin,
    Button,
    Radio,
    Input,
    message,
    Table,
    Tag,
    Select,
    Divider,
    Modal,
    Popconfirm
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const {TextArea} = Input;
// 搜索引擎客户端创建连接
const elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200',
});

class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // 列表复选
            selectedRowKeys: [],
            // 评论弹框
            commentId: undefined,
            reply: undefined,
            visible: false,
            //获取的数据
            commentList: [],
            userInfoList: [],
        });
    }

    componentDidMount() {
        this.fetchComments();
        // this.fetchUserInfo();
    }


    // 获取评论
    fetchComments() {
        client.search({
            index: 'comment',
            type: 'comment',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({commentList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    // 获取用户
    fetchUserInfo() {
        client.search({
            index: 'user_info',
            type: 'user_info',
            body: {
                query: {match_all: {}}
            }
        }).then(
            function (body) {
                let value = body.hits.hits;
                this.setState({userInfoList: value.reduce((total, next) => (next._score === 0 ? (total) : (total.concat(next._source))), [])});
            }.bind(this),
            function (error) {
                console.trace(error.message);
            }
        );
    }

    render() {
        const {
            auth, // 管理员权限
            info, // 管理员信息
            onDelete, // 删除评论
            onReply, // 回复评论
            isLoading, //
            onEditUser,
            onEditComm
        } = this.props;

        const {
            commentList, // 评论列表
            userInfoList,
            commentId, // 指定的评论id
            reply, // 回复信息
            visible, // 回复评论框显示
            selectedRowKeys, // 已选中的行
        } = this.state;

        // 表格头
        const columns = [
            {
                title: '评论编号',
                dataIndex: 'commentId',
                key: 'commentId',
            }, {
                title: '商品编号',
                dataIndex: 'commId',
                key: 'commId',
                render: commId => (<a onClick={()=>{
                    onEditComm(commId);
                    this.props.history.push("/commodity/all/info");
                }}>{commId}</a>)
            }, {
                title: '用户编号',
                dataIndex: 'userId',
                key: 'userId',
                render: userId => (<a onClick={()=>{
                    onEditUser(userId);
                    this.props.history.push("/user/all/info");
                }}>{userId}</a>)
            }, {
                title: '评论时间',
                dataIndex: 'date',
                key: 'date',
            }, {
                title: '操作',
                dataIndex: 'actions',
                key: 'actions',
                render: (commentInfo) => (
                    <span>
                    <Tag color="blue" key={commentInfo.commentId + "1"} onClick={() => {
                        this.setState({visible: true, commentId: commentInfo.commentId})
                    }}>回复</Tag>
                    <Popconfirm placement="top" title={"确定删除此评论吗？"} onConfirm={() => {
                        let commentIdList = [];
                        commentIdList.push(commentInfo.commentId + "");
                        onDelete(commentIdList);
                        let newCommentList = this.state.commentList;
                        for (let i = 0; i < newCommentList.length; i++) {
                            if (newCommentList[i].commentId === commentInfo.commentId) {
                                newCommentList.remove(i);
                                break;
                            }
                        }
                        this.setState({
                            commentList: newCommentList
                        })
                    }} okText="确认" cancelText="点错了">
                        <Tag color="red" key={commentInfo.commentId + +"2"}>删除</Tag>
                    </Popconfirm>

                </span>
                ),
            }];

        // 表格数据
        let options = [];
        for (let i = 0; i < commentList.length; i++) {
            if (commentList[i].reply === undefined) {
                options.push({
                    key: commentList[i].commentId,
                    commentId: commentList[i].commentId,
                    commId: commentList[i].commId,
                    userId: commentList[i].userId,
                    content: commentList[i].content,
                    pictures: commentList[i].pictures,
                    date: new Date(commentList[i].date).Format("yyyy-MM-dd hh:mm:ss"),
                    actions: commentList[i],
                })
            }
        }
        return (
            <Spin spinning={isLoading}>
                {
                    info === undefined ? (
                        <Divider>请登录</Divider>
                    ) : (
                        (auth.see_comment || info.isSuper) ? (
                            <Row>
                                {/*回复弹框*/}
                                <Modal
                                    // maskStyle={{opacity:0.1,backgroundColor:"#fff"}}
                                    title="回复评论"
                                    visible={visible}
                                    onOk={() => {
                                        if (reply === undefined) {
                                            message.error("请输入回复内容")
                                        } else {
                                            onReply({
                                                reply: reply,
                                                commentId: commentId
                                            });
                                            let newCommentList = this.state.commentList;
                                            for (let i = 0; i < newCommentList.length; i++) {
                                                if (newCommentList[i].commentId === commentId) {
                                                    newCommentList.remove(i);
                                                    break;
                                                }
                                            }
                                            this.setState({visible: false, reply: undefined, commentId: undefined,
                                                commentList: newCommentList})
                                        }
                                    }}
                                    onCancel={() => {
                                        this.setState({visible: false, reply: undefined, commentId: undefined})
                                    }}
                                >
                                    <TextArea rows={5} placeholder={"请输入回复内容"} value={reply} onChange={(e) => {
                                        this.setState({reply: e.target.value})
                                    }}/>
                                </Modal>

                                <Col>
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingBottom: 0}}>
                                        <Divider>新增评论</Divider>
                                    </Row>
                                    {/*全选*/}
                                    <Row type={"flex"} align={"middle"}
                                         style={{padding: "3%", paddingBottom: 10, paddingTop: 0}}>
                                        <Col span={2}>
                                            <Popconfirm placement="top"
                                                        title={"确定删除这" + selectedRowKeys.length + "个评论吗？"}
                                                        onConfirm={() => {
                                                            onDelete(selectedRowKeys);
                                                            let newCommentList = this.state.commentList;
                                                            for (let j = 0; j < selectedRowKeys.length; j++) {
                                                                for (let i = 0; i < newCommentList.length; i++) {
                                                                    if (newCommentList[i].commentId === selectedRowKeys[j]) {
                                                                        newCommentList.remove(i);
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            this.setState({
                                                                selectedRowKeys: [],
                                                                commentList: newCommentList
                                                            });
                                                        }} okText="确认" cancelText="点错了">
                                                <Button type={"danger"}
                                                        loading={isLoading}
                                                        disabled={!selectedRowKeys.length > 0}
                                                >删除</Button>
                                            </Popconfirm>
                                        </Col>

                                    </Row>
                                    {/*表格*/}
                                    <Row type={"flex"} align={"middle"} style={{padding: "3%", paddingTop: 0}}>
                                        <Table
                                            defaultExpandAllRows
                                            expandedRowRender={commentInfo =>
                                                <span style={{ margin: 0 }}>
                                                    {commentInfo.content}
                                                    {
                                                        commentInfo.pictures === undefined || commentInfo.pictures.length === 0 ? null : (
                                                            <ShowImages images={commentInfo.pictures} size={50}/>)
                                                    }
                                                </span>}
                                            style={{width: "100%"}}
                                            rowSelection={{
                                                selectedRowKeys,
                                                onChange: (selectedRowKeys) => {
                                                    this.setState({...this.state, selectedRowKeys});
                                                },
                                            }} columns={columns} dataSource={options}/>
                                    </Row>
                                </Col>
                            </Row>
                        ) : (
                            <Divider>权限不足</Divider>
                        )
                    )
                }
            </Spin>
        )


    }
}

// props绑定state
const mapStateToProps = (state) => {
    const comment = state.commodity.comment;
    const navLink = state.navLink;
    return {
        auth: navLink.auth,
        info: navLink.info,
        isLoading: comment.isLoading
    }
};

// props绑定dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        onEditUser:(userId)=>{
            dispatch(UserActions.Edit(userId));
        },
        onEditComm:(commId)=>{
            dispatch(CommActions.Edit(commId));
        },
        onDelete: (commentIdList) => {
            dispatch(Actions.Start());
            dispatch(Actions.Delete(localStorage.getItem("RealFakeManagerJwt"), commentIdList));
        },
        onReply: (jwt, commentInfo) => {
            dispatch(Actions.Start());
            dispatch(Actions.Reply(localStorage.getItem("RealFakeManagerJwt"), commentInfo));
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(main));
