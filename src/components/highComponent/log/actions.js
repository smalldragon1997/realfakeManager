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


export const Filter = (filter,key,start,end,isSuccess) => ({
    type : ActionType.Filter,
    filter,key,start,end,isSuccess
});

export const ReFilter = () => ({
    type : ActionType.ReFilter
});

export const FetchOperation = (jwt) => ({
    type : ActionType.FetchOperation,jwt
});

export const FetchOperationSuccess = (result) => ({
    type : ActionType.FetchOperationSuccess,result
});
