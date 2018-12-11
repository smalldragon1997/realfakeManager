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

export const Fetching = (username,password,rememberMe) => ({
    type : ActionType.Fetching,
    username,password,rememberMe
});


export const FetchOrders = (jwt) => ({
    type : ActionType.FetchOrders,jwt
});

export const FetchOrdersSuccess = (orderList) => ({
    type : ActionType.FetchOrdersSuccess,orderList
});

export const FetchVisit = (jwt) => ({
    type : ActionType.FetchVisit,jwt
});

export const FetchVisitSuccess = (visitList) => ({
    type : ActionType.FetchVisitSuccess,visitList
});

export const FetchAfterSale = (jwt) => ({
    type : ActionType.FetchAfterSale,jwt
});

export const FetchAfterSaleSuccess = (afterSaleList) => ({
    type : ActionType.FetchAfterSaleSuccess,afterSaleList
});

export const FetchCommodities = (jwt) => ({
    type : ActionType.FetchCommodities,jwt
});

export const FetchCommoditiesSuccess = (commList) => ({
    type : ActionType.FetchCommoditiesSuccess,commList
});

export const FetchKeyWords = (jwt) => ({
    type : ActionType.FetchKeyWords,jwt
});

export const FetchKeyWordsSuccess = (keyList) => ({
    type : ActionType.FetchKeyWordsSuccess,keyList
});