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


export const UpdateDeliver = (jwt,orderId,expId,number,expMessage) => ({
    type : ActionType.UpdateDeliver,
    jwt,orderId,expId,number,expMessage
});

export const UpdateDeliverSuccess = (orderId,expId,number,expMessage) => ({
    type : ActionType.UpdateDeliverSuccess,
    orderId,expId,number,expMessage
});


export const DeleteOrders = (jwt,orderIdList) => ({
    type : ActionType.DeleteOrders,
    jwt,orderIdList
});

export const DeleteOrdersSuccess = (orderIdList) => ({
    type : ActionType.DeleteOrdersSuccess,
    orderIdList
});

export const Filter = (filter,key) => ({
    type : ActionType.Filter,
    filter,key
});

export const ReFilter = () => ({
    type : ActionType.ReFilter,
});
export const Edit = (orderInfo) => ({
    type : ActionType.Edit,orderInfo
});


export const FetchExpress = (jwt) => ({
    type : ActionType.FetchTakeExpress,
    jwt
});

export const FetchExpressSuccess = (expressList) => ({
    type : ActionType.FetchTakeExpressSuccess,
    expressList
});