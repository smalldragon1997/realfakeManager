import { createSelector } from 'reselect'


// 获取系列列表
const getPayList = (payList,filter,key,start,end,state,flag) => payList;
const getFilter = (payList,filter,key,start,end,state,flag) => filter;
const getKey = (payList,filter,key,start,end,state,flag) => key;
const getStart = (payList,filter,key,start,end,state,flag) => start;
const getEnd = (payList,filter,key,start,end,state,flag) => end;
const getFlag = (payList,filter,key,start,end,state,flag) => flag;
const getState = (payList,filter,key,start,end,state,flag) => state;

// flag为强制触发

export const getOrderListByState = createSelector(
    [ getPayList, getState,getFlag],
    (payList, state) => {
        if(state>1){
            return payList.filter(item=>(item.state>1))
        }
        return payList.filter(item=>(item.state===state))
    }
);
export const getOrderListByDate = createSelector(
    [ getOrderListByState, getStart,getEnd,getFlag],
        (payList, start,end) => {
        return payList.filter(item=>(item.applyDate>=start&&item.applyDate<end))
    }
);
export const getAfterSaleListByFilter = createSelector(
    [ getOrderListByDate, getFilter,getKey,getFlag],
    (payList, filter,key) => {
        if(key===undefined){
            return payList;
        }else{
            switch (filter){
                case "orderId":{
                    return payList.filter(item=>{
                        return item.orderId.indexOf(key) !== -1;
                    })
                }
                case "aftId":{
                    return payList.filter(item=>{
                        return item.aftId.indexOf(key) !== -1;
                    })
                }
                case "nickname":{
                    return payList.filter(item=>{
                        return item.userInfo.nickname.indexOf(key) !== -1;
                    })
                }
                case "userId":{
                    return payList.filter(item=>{
                        return item.userInfo.userId.indexOf(key) !== -1;
                    })
                }
            }
        }
    }
);