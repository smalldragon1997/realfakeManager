import { createSelector } from 'reselect'


// 获取系列列表
const getPayList = (payList,filter,key,start,end,flag) => payList;
const getFilter = (payList,filter,key,start,end,flag) => filter;
const getKey = (payList,filter,key,start,end,flag) => key;
const getStart = (payList,filter,key,start,end,flag) => start;
const getEnd = (payList,filter,key,start,end,flag) => end;
const getFlag = (payList,filter,key,start,end,flag) => flag;

// flag为强制触发

export const getOrderListByDate = createSelector(
    [ getPayList, getStart,getEnd,getFlag],
        (payList, start,end) => {
        return payList.filter(item=>(item.doneDate>=start&&item.doneDate<end))
    }
);
export const getOrderListByFilter = createSelector(
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
                case "address":{
                    return payList.filter(item=>{
                        const address = item.address;
                        return address.area.indexOf(key) !== -1||address.detail.indexOf(key) !== -1
                            ||address.tel.indexOf(key) !== -1||address.name.indexOf(key) !== -1;
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