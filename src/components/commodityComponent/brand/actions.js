import * as ActionType from './actionTypes';

export const Start = () => ({
    type : ActionType.Start
});

export const Success = (auths) => ({
    type : ActionType.Success,
    auths
});

export const Failure = (error) => ({
    type : ActionType.Failure,
    error
});

export const Fetching = (jwt) => ({
    type : ActionType.Fetching,
    jwt
});


export const DeleteBrand = (brandIdList,jwt) => ({
    type : ActionType.DeleteBrand,brandIdList,
    jwt
});


export const DeleteBrandSuccess = (brandIdList) => ({
    type : ActionType.DeleteBrandSuccess,
    brandIdList
});

export const UpdateBrand = (jwt,brandInfo) => ({
    type : ActionType.UpdateBrand,brandInfo,
    jwt
});


export const UpdateBrandSuccess = (brandInfo) => ({
    type : ActionType.UpdateBrandSuccess,brandInfo
});

export const AddBrand = (jwt,brandInfo) => ({
    type : ActionType.AddBrand,brandInfo,
    jwt
});


export const AddBrandSuccess = (brandInfo) => ({
    type : ActionType.AddBrandSuccess,brandInfo
});


export const Edit = (brandId) => ({
    type : ActionType.Edit,brandId
});
