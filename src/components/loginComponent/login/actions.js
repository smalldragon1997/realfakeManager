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
export const Done = () => ({
    type : ActionType.Done
});

export const Fetching = (username,password,rememberMe) => ({
    type : ActionType.Fetching,
    username,password,rememberMe
});
