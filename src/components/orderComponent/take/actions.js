import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (result) => ({
    type : ActionType.Success,
    result
});

export const FetchOrderInfo = (orderId,jwt) => ({
    type : ActionType.FetchOrderInfo,orderId,
    jwt
});

export const FetchOrderInfoSuccess = (result) => ({
    type : ActionType.FetchOrderInfoSuccess,result
});
export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (manId,jwt) => ({
    type : ActionType.Fetching,manId,
    jwt
});


export const UpdateDeliver = (jwt,info) => ({
    type : ActionType.UpdateDeliver,info,jwt
});

export const UpdateDeliverSuccess = (result) => ({
    type : ActionType.UpdateDeliverSuccess,result
});


export const DeleteOrders = (jwt,orderId) => ({
    type : ActionType.DeleteOrders,
    jwt,orderId
});

export const DeleteOrdersSuccess = (result) => ({
    type : ActionType.DeleteOrdersSuccess,
    result
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