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


export const Delete = (uniteIdList,jwt) => ({
    type : ActionType.Delete,uniteIdList,
    jwt
});


export const DeleteSuccess = (uniteIdList) => ({
    type : ActionType.DeleteSuccess,
    uniteIdList
});

export const Update = (jwt,uniteInfo) => ({
    type : ActionType.Update,uniteInfo,
    jwt
});


export const UpdateSuccess = (uniteInfo) => ({
    type : ActionType.UpdateSuccess,uniteInfo
});

export const Add = (jwt,uniteInfo) => ({
    type : ActionType.Add,uniteInfo,
    jwt
});


export const AddSuccess = (uniteInfo) => ({
    type : ActionType.AddSuccess,uniteInfo
});


export const Edit = (uniteId) => ({
    type : ActionType.Edit,uniteId
});
