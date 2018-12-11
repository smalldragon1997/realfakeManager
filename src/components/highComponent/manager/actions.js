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


export const ForbidManagerSuccess = (manIdList) => ({
    type : ActionType.ForbidManagerSuccess,
    manIdList
});

export const CanCelForbidManager = (manIdList,jwt) => ({
    type : ActionType.CanCelForbidManager,manIdList,
    jwt
});


export const CanCelForbidManagerSuccess = (manIdList) => ({
    type : ActionType.CanCelForbidManagerSuccess,
    manIdList
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

export const FetchAuthListSuccess = (auths) => ({
    type : ActionType.FetchAuthListSuccess,auths
});


export const UpdateManager = (jwt,manId,auths,nickname) => ({
    type : ActionType.UpdateManager,jwt,auths,nickname,manId
});

export const UpdateManagerSuccess = (manId,auths,nickname) => ({
    type : ActionType.UpdateManagerSuccess,auths,nickname,manId
});

export const AddManager = (jwt,auths,nickname,username,password,icon,isForbidden) => ({
    type : ActionType.AddManager,jwt,auths,nickname,username,password,icon,isForbidden
});

export const AddManagerSuccess = () => ({
    type : ActionType.AddManagerSuccess
});
