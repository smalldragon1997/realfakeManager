import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (result) => ({
    type : ActionType.Success,result
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (jwt) => ({
    type : ActionType.Fetching,
    jwt
});

export const FetchAuthInfo = (authId,jwt) => ({
    type : ActionType.FetchAuthInfo,authId,
    jwt
});

export const FetchAuthInfoSuccess = (result) => ({
    type : ActionType.FetchAuthInfoSuccess,result
});

export const DelAuth = (authIdList,jwt) => ({
    type : ActionType.DelAuth,authIdList,
    jwt
});


export const DelAuthSuccess = (authIdList) => ({
    type : ActionType.DelAuthSuccess,
    authIdList
});

export const UpdateAuth = (authInfo,jwt) => ({
    type : ActionType.UpdateAuth,authInfo,
    jwt
});


export const UpdateAuthSuccess = (result) => ({
    type : ActionType.UpdateAuthSuccess,result
});

export const AddAuth = (jwt,authName,describe) => ({
    type : ActionType.AddAuth,authName,describe,
    jwt
});


export const AddAuthSuccess = () => ({
    type : ActionType.AddAuthSuccess
});


export const EditAuth = (authId) => ({
    type : ActionType.EditAuth,authId
});
