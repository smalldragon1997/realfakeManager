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


export const UpdatePrice = (jwt,orderId,price) => ({
    type : ActionType.UpdatePrice,
    jwt,orderId,price
});

export const UpdatePriceSuccess = (orderId,price) => ({
    type : ActionType.UpdatePriceSuccess,
    orderId,price
});


export const DeletePays = (jwt,orderIdList) => ({
    type : ActionType.DeletePays,
    jwt,orderIdList
});

export const DeletePaysSuccess = (orderIdList) => ({
    type : ActionType.DeletePaysSuccess,
    orderIdList
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