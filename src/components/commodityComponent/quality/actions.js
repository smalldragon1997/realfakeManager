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


export const Delete = (qualityIdList,jwt) => ({
    type : ActionType.Delete,qualityIdList,
    jwt
});


export const DeleteSuccess = (qualityIdList) => ({
    type : ActionType.DeleteSuccess,
    qualityIdList
});

export const Update = (jwt,qualityInfo) => ({
    type : ActionType.Update,qualityInfo,
    jwt
});


export const UpdateSuccess = (qualityInfo) => ({
    type : ActionType.UpdateSuccess,qualityInfo
});

export const Add = (jwt,qualityInfo) => ({
    type : ActionType.Add,qualityInfo,
    jwt
});


export const AddSuccess = (qualityInfo) => ({
    type : ActionType.AddSuccess,qualityInfo
});


export const Edit = (qualityId) => ({
    type : ActionType.Edit,qualityId
});
