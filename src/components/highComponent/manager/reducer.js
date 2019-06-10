import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    auths:[], // 权限列表

    filter:"nickname", // 筛选方式
    key:undefined, // 筛选关键字
    isForbidden:undefined, // 筛选是否禁用
    managerInfo:undefined,
    managerList: [],
    defaultCheckedList:[], // 默认权限
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
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                return {...state, managerList:data.managerList, isLoading: false}
            }
        }
        case ActionTypes.AddManagerSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                message.success("添加管理员成功");
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.UpdateManagerSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                message.success(action.result.msg);
                return {...state, isLoading: false}
            }
        }
        case ActionTypes.FetchAuthListSuccess: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                return {...state, auths:data.auths, isLoading: false}
            }
        }
        case ActionTypes.FetchManagerInfoSuccess: {
            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                const auths = state.auths;
                const managerInfo = data.managerInfo;
                // 默认的权限选中内容
                const defaultOptions = [];

                // 根据权限内容改变权限选中状态
                if (auths.length !== 0 && managerInfo !== undefined) {
                    for (let i = 0; i < auths.length; i++) {
                        for (let j = 0; j < managerInfo.authList.length; j++) {
                            if (auths[i].authName === managerInfo.authList[j].authName) {
                                defaultOptions.push(auths[i].describe);
                            }
                        }
                    }
                }
                return {...state, managerInfo:data.managerInfo,defaultCheckedList:defaultOptions, isLoading: false}
            }
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
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                message.success("禁用成功");
                const info = state.managerInfo;
                info.isForbidden = true;
                return {...state, managerInfo:info, isLoading: false}
            }
        }
        case ActionTypes.CanCelForbidManagerSuccess: {
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                message.success("启动成功");
                const info = state.managerInfo;
                info.isForbidden = false;
                return {...state, managerInfo:info, isLoading: false}
            }
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