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


export const Delete = (typeIdList,jwt) => ({
    type : ActionType.Delete,typeIdList,
    jwt
});


export const DeleteSuccess = (typeIdList) => ({
    type : ActionType.DeleteSuccess,
    typeIdList
});

export const Update = (jwt,typeInfo) => ({
    type : ActionType.Update,typeInfo,
    jwt
});


export const UpdateSuccess = (typeInfo) => ({
    type : ActionType.UpdateSuccess,typeInfo
});

export const Add = (jwt,typeInfo) => ({
    type : ActionType.Add,typeInfo,
    jwt
});


export const AddSuccess = (typeInfo) => ({
    type : ActionType.AddSuccess,typeInfo
});


export const Edit = (typeId) => ({
    type : ActionType.Edit,typeId
});
