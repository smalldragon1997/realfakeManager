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


export const Delete = (userIdList,jwt) => ({
    type : ActionType.Delete,userIdList,
    jwt
});


export const DeleteSuccess = (userIdList) => ({
    type : ActionType.DeleteSuccess,
    userIdList
});

export const Discount = (jwt,disInfo) => ({
    type : ActionType.Discount,disInfo,
    jwt
});


export const DiscountSuccess = (disInfo) => ({
    type : ActionType.DiscountSuccess,disInfo
});



export const Edit = (userId) => ({
    type : ActionType.Edit,userId
});
