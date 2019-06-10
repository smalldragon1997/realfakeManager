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

export const Fetching = () => ({
    type : ActionType.Fetching
});

export const FetchBrandInfo = (brandId) => ({
    type : ActionType.FetchBrandInfo,brandId
});
export const FetchBrandInfoSuccess = (result) => ({
    type : ActionType.FetchBrandInfoSuccess,result
});


export const DeleteBrand = (brandId,jwt) => ({
    type : ActionType.DeleteBrand,brandId,
    jwt
});


export const DeleteBrandSuccess = (result) => ({
    type : ActionType.DeleteBrandSuccess,
    result
});

export const UpdateBrand = (jwt,brandInfo) => ({
    type : ActionType.UpdateBrand,brandInfo,
    jwt
});


export const UpdateBrandSuccess = (result) => ({
    type : ActionType.UpdateBrandSuccess,result
});

export const AddBrand = (jwt,brandInfo) => ({
    type : ActionType.AddBrand,brandInfo,
    jwt
});


export const AddBrandSuccess = (result) => ({
    type : ActionType.AddBrandSuccess,result
});


export const Edit = (brandId) => ({
    type : ActionType.Edit,brandId
});
