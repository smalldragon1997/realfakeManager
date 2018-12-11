import {call, put, takeEvery} from 'redux-saga/effects'
import * as Api from '../../../api';
import * as Actions from './actions';
import * as ActionTypes from './actionTypes';


// 获取未付款订单列表
function* reply(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     orderId:action.orderId,
        //     price:action.price,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.ReplySuccess(action.commentInfo));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("回复评论时发生错误："+e.toString()));
    }
}

export function* watchReply() {
    yield takeEvery(ActionTypes.Reply, reply);
}


// 获取未付款订单列表
function* deleteComments(action) {
    try {
        // const result = yield call(Api.fetchPays,{
        //     orderIdList:action.orderIdList,
        //     jwt:action.jwt
        // });
        // yield put(Actions.Success(result.data.data));
        yield put(Actions.DeleteSuccess(action.commentId));
    } catch (e) {
        console.log(e);
        yield put(Actions.Failure("删除评论时发生错误："+e.toString()));
    }
}

export function* watchDeleteComments() {
    yield takeEvery(ActionTypes.Delete, deleteComments);
}
