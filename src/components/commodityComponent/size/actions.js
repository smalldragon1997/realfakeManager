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


export const Delete = (sizeIdList,jwt) => ({
    type : ActionType.Delete,sizeIdList,
    jwt
});


export const DeleteSuccess = (sizeIdList) => ({
    type : ActionType.DeleteSuccess,
    sizeIdList
});

export const Update = (jwt,sizeInfo) => ({
    type : ActionType.Update,sizeInfo,
    jwt
});


export const UpdateSuccess = (sizeInfo) => ({
    type : ActionType.UpdateSuccess,sizeInfo
});

export const Add = (jwt,sizeInfo) => ({
    type : ActionType.Add,sizeInfo,
    jwt
});


export const AddSuccess = (sizeInfo) => ({
    type : ActionType.AddSuccess,sizeInfo
});


export const Edit = (sizeId) => ({
    type : ActionType.Edit,sizeId
});
