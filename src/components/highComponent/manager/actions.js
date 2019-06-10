import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (result) => ({
    type : ActionType.Success,
    result
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (jwt) => ({
    type : ActionType.Fetching,
    jwt
});


export const FetchManagerInfo = (manId,jwt) => ({
    type : ActionType.FetchManagerInfo,manId,
    jwt
});


export const FetchManagerInfoSuccess = (result) => ({
    type : ActionType.FetchManagerInfoSuccess,result
});

export const DelManager = (manIdList,jwt) => ({
    type : ActionType.DelManager,manIdList,
    jwt
});


export const DelManagerSuccess = (manIdList) => ({
    type : ActionType.DelManagerSuccess,
    manIdList
});

export const ForbidManager = (manIdList,jwt) => ({
    type : ActionType.ForbidManager,manIdList,
    jwt
});


export const ForbidManagerSuccess = (result) => ({
    type : ActionType.ForbidManagerSuccess,
    result
});

export const CanCelForbidManager = (manIdList,jwt) => ({
    type : ActionType.CanCelForbidManager,manIdList,
    jwt
});


export const CanCelForbidManagerSuccess = (result) => ({
    type : ActionType.CanCelForbidManagerSuccess,
    result
});

export const Filter = (filter,key,isForbidden) => ({
    type : ActionType.Filter,
    filter,key,isForbidden
});

export const ReFilter = () => ({
    type : ActionType.ReFilter
});

export const EditManager = (manId) => ({
    type : ActionType.EditManager,manId
});

export const FetchAuthList = (jwt) => ({
    type : ActionType.FetchAuthList,jwt
});

export const FetchAuthListSuccess = (result) => ({
    type : ActionType.FetchAuthListSuccess,result
});


export const UpdateManager = (managerInfo,jwt) => ({
    type : ActionType.UpdateManager,jwt,managerInfo
});

export const UpdateManagerSuccess = (result) => ({
    type : ActionType.UpdateManagerSuccess,result
});

export const AddManager = (managerInfo,jwt) => ({
    type : ActionType.AddManager,jwt,managerInfo
});

export const AddManagerSuccess = (result) => ({
    type : ActionType.AddManagerSuccess,result
});
