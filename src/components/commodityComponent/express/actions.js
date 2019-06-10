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

export const Fetching = () => ({
    type : ActionType.Fetching
});

export const FetchExpressInfo = (expId) => ({
    type : ActionType.FetchExpressInfo,expId
});

export const FetchExpressInfoSuccess = (result) => ({
    type : ActionType.FetchExpressInfoSuccess,result
});


export const Delete = (expId,jwt) => ({
    type : ActionType.Delete,expId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,
    result
});

export const Update = (jwt,expInfo) => ({
    type : ActionType.Update,expInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,expInfo) => ({
    type : ActionType.Add,expInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (expId) => ({
    type : ActionType.Edit,expId
});
