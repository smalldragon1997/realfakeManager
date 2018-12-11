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

export const DateFilter = (start,end) => ({
    type : ActionType.DateFilter,
    start,end
});

export const ReDateFilter = () => ({
    type : ActionType.ReDateFilter,
});

