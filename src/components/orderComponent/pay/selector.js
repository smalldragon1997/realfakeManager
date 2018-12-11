import { createSelector } from 'reselect'


// 获取系列列表
const getPayList = (payList,filter,key) => payList;
const getFilter = (payList,filter,key) => filter;
const getKey = (payList,filter,key) => key;

export const getPayListByFilter = createSelector(
    [ getPayList, getFilter,getKey],
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