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


export const DeleteAfterSales = (jwt,aftIdList) => ({
    type : ActionType.DeleteAfterSales,
    jwt,aftIdList
});

export const DeleteAfterSalesSuccess = (aftIdList) => ({
    type : ActionType.DeleteAfterSalesSuccess,
    aftIdList
});

export const AgreeAfterSales = (jwt,aftIdList,message) => ({
    type : ActionType.AgreeAfterSales,
    jwt,aftIdList,message
});

export const AgreeAfterSalesSuccess = (aftIdList,message) => ({
    type : ActionType.AgreeAfterSalesSuccess,
    aftIdList,message
});

export const DisAgreeAfterSales = (jwt,aftIdList,message,imageList) => ({
    type : ActionType.DisAgreeAfterSales,
    jwt,aftIdList,message,imageList
});

export const DisAgreeAfterSalesSuccess = (aftIdList) => ({
    type : ActionType.DisAgreeAfterSalesSuccess,
    aftIdList
});

export const CloseAfterSales = (jwt,aftIdList,message,imageList) => ({
    type : ActionType.CloseAfterSales,
    jwt,aftIdList
});

export const CloseAfterSalesSuccess = (aftIdList) => ({
    type : ActionType.CloseAfterSalesSuccess,
    aftIdList
});
export const Filter = (filter,key) => ({
    type : ActionType.Filter,
    filter,key
});

export const ReFilter = () => ({
    type : ActionType.ReFilter,
});
export const Edit = (afterSaleInfo) => ({
    type : ActionType.Edit,afterSaleInfo
});

export const DateFilter = (start,end) => ({
    type : ActionType.DateFilter,
    start,end
});

export const ReDateFilter = () => ({
    type : ActionType.ReDateFilter,
});

