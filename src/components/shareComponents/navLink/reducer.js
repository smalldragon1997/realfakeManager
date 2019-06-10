import * as ActionTypes from './actionTypes';
import {message} from 'antd';

const initState = {
    // 初始化权限为空
    auth: {
        see_all: false,
        see_order: false,
        edi_order: false,
        see_after_sale: false,
        edi_after_sale: false,
        see_commodity: false,
        see_category: false,
        edi_category: false,
        see_comm: false,
        edi_comm: false,
        see_comment: false,
        edi_comment: false,
        see_user: false,
        edi_user: false
    },
    info: undefined, // 管理员信息
    isLoading: true   // 是否加载中
};

//初始化status为载入状态
export default (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.Success: {

            const data = action.result.data;
            if(action.result.status!=="200"){
                message.error(action.result.msg);
                return {...state, isLoading: false}
            }else{
                const auths = data.info.auth;
                let oldAuth = {
                    see_all: false,
                    see_order: false,
                    edi_order: false,
                    see_after_sale: false,
                    edi_after_sale: false,
                    see_commodity: false,
                    see_category: false,
                    edi_category: false,
                    see_comm: false,
                    edi_comm: false,
                    see_comment: false,
                    edi_comment: false,
                    see_user: false,
                    edi_user: false
                };
                // 将管理员拥有的权限修改为true
                for (const name in oldAuth) {
                    if (oldAuth.hasOwnProperty(name)){
                        for(let i=0;i<auths.length;i++){
                            if(name===auths[i]){
                                oldAuth[name]=true;
                                break;
                            }
                        }
                    }
                }
                // 如果需要保存登录状态
                localStorage.setItem("RealFakeManagerJwt", data.info.jwt);
                // console.log("已保存登录状态" + localStorage.getItem("RealFakeManagerJwt"));
                return {...state, info: data.info,auth:oldAuth, isLoading: false}
            }

        }
        case ActionTypes.ExitSuccess: {
            // 删除登录状态
            localStorage.removeItem("RealFakeManagerJwt");
            console.log("已删除登录状态");
            message.success("注销成功");
            return {...state,info:undefined,isLoading: false}
        }
        case ActionTypes.Failure: {
            message.error(action.error);
            return {...state, isLoading: false}
        }
        default:
            return state;
    }
}
