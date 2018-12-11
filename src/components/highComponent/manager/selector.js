import { createSelector } from 'reselect'


// 获取系列列表
const getManagerList = (managerList,filter,key,isForbidden) => managerList;
const getFilter = (managerList,filter,key,isForbidden) => filter;
const getKey = (managerList,filter,key,isForbidden) => key;
const getIsForbidden = (managerList,filter,key,isForbidden) => isForbidden;

export const getManagerByState = createSelector(
    [ getManagerList, getIsForbidden],
    (managerList, isForbidden) => {
        if(isForbidden===undefined){
            return managerList;
        }else{
            return managerList.filter(
                manager => manager.isForbidden===isForbidden
            )
        }
    }
);
export const getManagerByFilter = createSelector(
    [ getManagerByState, getFilter ,getKey],
    (managerList, filter , key) => {
        if(key===undefined){
            return managerList;
        }else{
            return managerList.filter(
                manager => manager[filter]===key
            )
        }
    }
);

export const getManagerByManId = createSelector(
    [ getManagerList, getFilter ,getKey],
    (managerList, filter , key) => {
        for(let i=0;i<managerList.length;i++){
            if(managerList[i].manId===key){
                return managerList[i];
            }
        }
    }
);
