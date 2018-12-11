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

export const Fetching = (jwt,key,start,end) => ({
    type : ActionType.Fetching,
    jwt,key,start,end
});


export const DeleteCommodity = (jwt,commId) => ({
    type : ActionType.DeleteCommodity,
    jwt,commId
});

export const DeleteCommoditySuccess = (commId) => ({
    type : ActionType.DeleteCommoditySuccess,
    commId
});

export const UpdateCommodity = (jwt,commInfo) => ({
    type : ActionType.UpdateCommodity,
    jwt,commInfo
});

export const UpdateCommoditySuccess = (commInfo) => ({
    type : ActionType.UpdateCommoditySuccess,
    commInfo
});

export const AddCommodity = (jwt,commInfo) => ({
    type : ActionType.AddCommodity,
    jwt,commInfo
});

export const AddCommoditySuccess = (commInfo) => ({
    type : ActionType.AddCommoditySuccess,
    commInfo
});

export const Filter = (brandId,seriesId,typeId,uniteId,price,sort,desc) => ({
    type : ActionType.Filter,
    brandId,seriesId,typeId,uniteId,price,sort,desc
});

export const ReFilter = () => ({
    type : ActionType.ReFilter,
});
export const Edit = (commId) => ({
    type : ActionType.Edit,commId
});


