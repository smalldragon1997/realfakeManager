import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = () => ({
    type : ActionType.Success,
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (jwt) => ({
    type : ActionType.Fetching,
    jwt
});


export const DelAuth = (authIdList,jwt) => ({
    type : ActionType.DelAuth,authIdList,
    jwt
});


export const DelAuthSuccess = (authIdList) => ({
    type : ActionType.DelAuthSuccess,
    authIdList
});

export const UpdateAuth = (jwt,authId,authName,describe) => ({
    type : ActionType.UpdateAuth,authName,describe,authId,
    jwt
});


export const UpdateAuthSuccess = (authId,authName,describe) => ({
    type : ActionType.UpdateAuthSuccess,authId,
    authName,describe
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
