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

export const Deliver = (jwt,info) => ({
    type : ActionType.Deliver,
    jwt,info
});

export const DeliverSuccess = (result) => ({
    type : ActionType.DeliverSuccess,
    result
});


export const DeleteDelivers = (jwt,orderId) => ({
    type : ActionType.DeleteDelivers,
    jwt,orderId
});

export const DeleteDeliversSuccess = (result) => ({
    type : ActionType.DeleteDeliversSuccess,
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
    type : ActionType.FetchExpress,
    jwt
});

export const FetchExpressSuccess = (expressList) => ({
    type : ActionType.FetchExpressSuccess,
    expressList
});

export const FetchExcel = (jwt,orderIdList) => ({
    type : ActionType.FetchExcel,
    jwt,orderIdList
});

export const FetchExcelSuccess = (url) => ({
    type : ActionType.FetchExcelSuccess,
    url
});