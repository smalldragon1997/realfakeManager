import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (auths) => ({
    type : ActionType.Success,
    auths
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (jwt) => ({
    type : ActionType.Fetching,
    jwt
});


export const Delete = (expIdList,jwt) => ({
    type : ActionType.Delete,expIdList,
    jwt
});


export const DeleteSuccess = (expIdList) => ({
    type : ActionType.DeleteSuccess,
    expIdList
});

export const Update = (jwt,expInfo) => ({
    type : ActionType.Update,expInfo,
    jwt
});


export const UpdateSuccess = (expInfo) => ({
    type : ActionType.UpdateSuccess,expInfo
});

export const Add = (jwt,expInfo) => ({
    type : ActionType.Add,expInfo,
    jwt
});


export const AddSuccess = (expInfo) => ({
    type : ActionType.AddSuccess,expInfo
});


export const Edit = (expId) => ({
    type : ActionType.Edit,expId
});
