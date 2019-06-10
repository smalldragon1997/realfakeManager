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

export const Fetching = (filterInfo) => ({
    type : ActionType.Fetching,filterInfo
});


export const DeleteCommodity = (jwt,commId) => ({
    type : ActionType.DeleteCommodity,
    jwt,commId
});

export const DeleteCommoditySuccess = (result) => ({
    type : ActionType.DeleteCommoditySuccess,
    result
});

export const UpdateCommodity = (jwt,commInfo) => ({
    type : ActionType.UpdateCommodity,
    jwt,commInfo
});

export const UpdateCommoditySuccess = (result) => ({
    type : ActionType.UpdateCommoditySuccess,
    result
});

export const AddCommodity = (jwt,commInfo) => ({
    type : ActionType.AddCommodity,
    jwt,commInfo
});

export const AddCommoditySuccess = (result) => ({
    type : ActionType.AddCommoditySuccess,
    result
});

export const Filter = (filterInfo) => ({
    type : ActionType.Filter,
    filterInfo
});

export const Edit = (commId) => ({
    type : ActionType.Edit,commId
});



export const FetchCommodity = (commId) => ({
    type : ActionType.FetchCommodity,commId
});
export const FetchCommoditySuccess = (result) => ({
    type : ActionType.FetchCommoditySuccess,result
});
