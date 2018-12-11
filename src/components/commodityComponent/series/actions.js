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


export const Delete = (seriesIdList,jwt) => ({
    type : ActionType.Delete,seriesIdList,
    jwt
});


export const DeleteSuccess = (seriesIdList) => ({
    type : ActionType.DeleteSuccess,
    seriesIdList
});

export const Update = (jwt,seriesInfo) => ({
    type : ActionType.Update,seriesInfo,
    jwt
});


export const UpdateSuccess = (seriesInfo) => ({
    type : ActionType.UpdateSuccess,seriesInfo
});

export const Add = (jwt,seriesInfo) => ({
    type : ActionType.Add,seriesInfo,
    jwt
});


export const AddSuccess = (seriesInfo) => ({
    type : ActionType.AddSuccess,seriesInfo
});


export const Edit = (seriesId) => ({
    type : ActionType.Edit,seriesId
});
