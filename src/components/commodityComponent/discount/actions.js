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


export const FetchDiscountInfo = (disId) => ({
    type : ActionType.FetchDiscountInfo,disId
});


export const FetchDiscountInfoSuccess = (result) => ({
    type : ActionType.FetchDiscountInfoSuccess,result
});


export const Delete = (disId,jwt) => ({
    type : ActionType.Delete,disId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,
    result
});

export const Update = (jwt,disInfo) => ({
    type : ActionType.Update,disInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,disInfo) => ({
    type : ActionType.Add,disInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (disId) => ({
    type : ActionType.Edit,disId
});
