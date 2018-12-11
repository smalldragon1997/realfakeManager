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


export const Reply = (jwt,commentInfo) => ({
    type : ActionType.Reply,
    jwt,commentInfo
});

export const ReplySuccess = (commentInfo) => ({
    type : ActionType.ReplySuccess,
    commentInfo
});


export const Delete = (jwt,commentIdList) => ({
    type : ActionType.Delete,
    jwt,commentIdList
});

export const DeleteSuccess = (commentIdList) => ({
    type : ActionType.DeleteSuccess,
    commentIdList
});
