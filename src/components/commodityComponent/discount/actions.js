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


export const Delete = (disIdList,jwt) => ({
    type : ActionType.Delete,disIdList,
    jwt
});


export const DeleteSuccess = (disIdList) => ({
    type : ActionType.DeleteSuccess,
    disIdList
});

export const Update = (jwt,disInfo) => ({
    type : ActionType.Update,disInfo,
    jwt
});


export const UpdateSuccess = (disInfo) => ({
    type : ActionType.UpdateSuccess,disInfo
});

export const Add = (jwt,disInfo) => ({
    type : ActionType.Add,disInfo,
    jwt
});


export const AddSuccess = (disInfo) => ({
    type : ActionType.AddSuccess,disInfo
});


export const Edit = (disId) => ({
    type : ActionType.Edit,disId
});
