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

export const FetchSizeInfo = (sizeId) => ({
    type : ActionType.FetchSizeInfo,sizeId
});

export const FetchSizeInfoSuccess = (result) => ({
    type : ActionType.FetchSizeInfoSuccess,result
});


export const Delete = (sizeId,jwt) => ({
    type : ActionType.Delete,sizeId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,
    result
});

export const Update = (jwt,sizeInfo) => ({
    type : ActionType.Update,sizeInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,sizeInfo) => ({
    type : ActionType.Add,sizeInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (sizeId) => ({
    type : ActionType.Edit,sizeId
});
