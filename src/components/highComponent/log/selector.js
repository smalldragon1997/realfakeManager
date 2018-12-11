import { createSelector } from 'reselect'
import log from "./view/log";


// 获取日志列表
const getLogList = (logList,filter,key,start,end,isSuccess) => logList;
const getFilter = (logList,filter,key,start,end,isSuccess) => filter;
const getKey = (logList,filter,key,start,end,isSuccess) => key;
const getStart = (logList,filter,key,start,end,isSuccess) => start;
const getEnd = (logList,filter,key,start,end,isSuccess) => end;
const getIsSuccess = (logList,filter,key,start,end,isSuccess) => isSuccess;


export const getLogBySuccess = createSelector(
    [ getLogList, getIsSuccess],
    (logList,isSuccess) => {
        if(isSuccess===undefined)
            return logList;
        return logList.filter(
            log=>log.isSuccess===isSuccess
        )
    }
);

export const getLogByDate = createSelector(
    [ getLogBySuccess, getStart,getEnd],
    (logList,start,end) => {
        return logList.filter(
            log=>log.date>=start&&log.date<=end
        )
    }
);

export const getLogByFilter = createSelector(
    [ getLogByDate, getFilter ,getKey],
    (logList, filter , key) => {
        if(key===undefined){
            return logList;
        }else{
            switch (filter){
                case "manId":{
                    return logList.filter(
                        log=>log.manager.manId===key
                    )
                }
                case "nickname":{
                    return logList.filter(
                        log=>log.manager.nickname.indexOf(key)!==-1
                    )
                }
                case "operation":{
                    return logList.filter(
                        log=>log.operation.indexOf(key)!==-1
                    )
                }
                default:
                    return logList
            }
        }
    }
);
