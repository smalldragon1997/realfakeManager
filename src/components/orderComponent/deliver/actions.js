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


export const Deliver = (jwt,orderId,expId,number,expMessage) => ({
    type : ActionType.Deliver,
    jwt,orderId,expId,number,expMessage
});

export const DeliverSuccess = (orderId) => ({
    type : ActionType.DeliverSuccess,
    orderId
});


export const DeleteDelivers = (jwt,orderIdList) => ({
    type : ActionType.DeleteDelivers,
    jwt,orderIdList
});

export const DeleteDeliversSuccess = (orderIdList) => ({
    type : ActionType.DeleteDeliversSuccess,
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