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
export const FetchTypeInfo = (typeId) => ({
    type : ActionType.FetchTypeInfo,typeId
});
export const FetchTypeInfoSuccess = (result) => ({
    type : ActionType.FetchTypeInfoSuccess,result
});


export const Delete = (typeId,jwt) => ({
    type : ActionType.Delete,typeId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,
    result
});

export const Update = (jwt,typeInfo) => ({
    type : ActionType.Update,typeInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,typeInfo) => ({
    type : ActionType.Add,typeInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (typeId) => ({
    type : ActionType.Edit,typeId
});
