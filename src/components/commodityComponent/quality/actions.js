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
    type : ActionType.Fetching,

});
export const FetchQualityInfo = (qualityId) => ({
    type : ActionType.FetchQualityInfo,qualityId

});
export const FetchQualityInfoSuccess = (result) => ({
    type : ActionType.FetchQualityInfoSuccess,result

});


export const Delete = (qualityId,jwt) => ({
    type : ActionType.Delete,qualityId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,result
});

export const Update = (jwt,qualityInfo) => ({
    type : ActionType.Update,qualityInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,qualityInfo) => ({
    type : ActionType.Add,qualityInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (qualityId) => ({
    type : ActionType.Edit,qualityId
});
