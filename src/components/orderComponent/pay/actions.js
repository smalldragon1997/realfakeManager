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

export const Fetching = (manId,jwt) => ({
    type : ActionType.Fetching,manId,
    jwt
});

export const FetchOrderInfo = (orderId,jwt) => ({
    type : ActionType.FetchOrderInfo,orderId,
    jwt
});

export const FetchOrderInfoSuccess = (result) => ({
    type : ActionType.FetchOrderInfoSuccess,result
});


export const UpdatePrice = (jwt,orderId,price) => ({
    type : ActionType.UpdatePrice,
    jwt,orderId,price
});

export const UpdatePriceSuccess = (result) => ({
    type : ActionType.UpdatePriceSuccess,result
});


export const DeletePays = (jwt,orderId) => ({
    type : ActionType.DeletePays,
    jwt,orderId
});

export const DeletePaysSuccess = (result) => ({
    type : ActionType.DeletePaysSuccess,
    result
});

export const EditPay = (payInfo) => ({
    type : ActionType.EditPay,
    payInfo
});

export const Filter = (filter,key) => ({
    type : ActionType.Filter,
    filter,key
});

export const ReFilter = () => ({
    type : ActionType.ReFilter,
});