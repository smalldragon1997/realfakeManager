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

export const Fetching = (jwt) => ({
    type : ActionType.Fetching,
    jwt
});

export const SaveInfo = (info) => ({
    type : ActionType.SaveInfo,
    info
});

export const Exit = (manId,jwt) => ({
    type : ActionType.Exit,manId,jwt
});

export const ExitSuccess = (result) => ({
    type : ActionType.ExitSuccess,result
});