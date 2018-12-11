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


export const Update = (jwt,seriesInfo) => ({
    type : ActionType.Update,seriesInfo,
    jwt
});


export const UpdateSuccess = (seriesInfo) => ({
    type : ActionType.UpdateSuccess,seriesInfo
});
