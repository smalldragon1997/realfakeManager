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

export const FetchSeriesInfo = (seriesId) => ({
    type : ActionType.FetchSeriesInfo,seriesId
});

export const FetchSeriesInfoSuccess = (result) => ({
    type : ActionType.FetchSeriesInfoSuccess,result
});


export const Delete = (seriesId,jwt) => ({
    type : ActionType.Delete,seriesId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,
    result
});

export const Update = (jwt,seriesInfo) => ({
    type : ActionType.Update,seriesInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,seriesInfo) => ({
    type : ActionType.Add,seriesInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (seriesId) => ({
    type : ActionType.Edit,seriesId
});
