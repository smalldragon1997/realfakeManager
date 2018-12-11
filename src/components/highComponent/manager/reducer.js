import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    auths:[], // 权限列表
    filter:"nickname", // 筛选方式
    key:undefined, // 筛选关键字
    isForbidden:undefined, // 筛选是否禁用
    managerList: [],
    isLoading: false,   // 是否加载中
    manId: undefined // manager
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {

        case ActionTypes.Start: {
            return {...state, isLoading: true}
        }
        case ActionTypes.Success: {
            return {...state, ...action.result, isLoading: false}
        }
        case ActionTypes.AddManagerSuccess: {
            message.success("添加管理员成功");
            return {...state, isLoading: false}
        }
        case ActionTypes.UpdateManagerSuccess: {
            let newManagerList = state.managerList;
            for(let i=0;i<newManagerList.length;i++){
                if(newManagerList[i].manId===action.manId){
                    newManagerList[i].auths = action.auths;
                    newManagerList[i].nickname = action.nickname;
                    break;
                }
            }
            message.success("修改成功");
            return {...state, managerList:newManagerList,isLoading: false}
        }
        case ActionTypes.FetchAuthListSuccess: {
            return {...state, auths:action.auths, isLoading: false}
        }
        case ActionTypes.EditManager: {
            return {...state, manId:action.manId, isLoading: false}
        }
        case ActionTypes.Filter: {
            return {...state, filter:action.filter,key:action.key, isForbidden:action.isForbidden,isLoading: false}
        }
        case ActionTypes.ReFilter: {
            return {...state, key:undefined,isForbidden:undefined, isLoading: false}
        }
        case ActionTypes.DelManagerSuccess: {
            let newManagerList = state.managerList;
            let idList = action.manIdList;
            for (let j = 0; j < idList.length; j++) {
                for (let i = 0; i < newManagerList.length; i++) {
                    if (idList[j] === newManagerList[i].manId) {
                        newManagerList.remove(i);
                        break;
                    }
                }
            }
            message.success("删除成功");
            return {...state, managerList: newManagerList, isLoading: false}
        }
        case ActionTypes.ForbidManagerSuccess: {
            let newManagerList = state.managerList;
            let idList = action.manIdList;
            for (let j = 0; j < idList.length; j++) {
                for (let i = 0; i < newManagerList.length; i++) {
                    if (idList[j] === newManagerList[i].manId) {
                        newManagerList[i].isForbidden=true;
                        break;
                    }
                }
            }
            message.success("禁用成功");
            return {...state, managerList: newManagerList, isLoading: false}
        }
        case ActionTypes.CanCelForbidManagerSuccess: {
            let newManagerList = state.managerList;
            let idList = action.manIdList;
            for (let j = 0; j < idList.length; j++) {
                for (let i = 0; i < newManagerList.length; i++) {
                    if (idList[j] === newManagerList[i].manId) {
                        newManagerList[i].isForbidden=false;
                        break;
                    }
                }
            }
            message.success("取消禁用成功");
            return {...state, managerList: newManagerList, isLoading: false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state, isLoading: false}
        }
        default:
            return state;
    }
}

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