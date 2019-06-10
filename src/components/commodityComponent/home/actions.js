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


export const Update = (jwt,homeInfo) => ({
    type : ActionType.Update,homeInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});
