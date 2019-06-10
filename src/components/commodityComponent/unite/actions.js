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

export const FetchUniteInfo = (uniteId) => ({
    type : ActionType.FetchUniteInfo,uniteId

});
export const FetchUniteInfoSuccess = (result) => ({
    type : ActionType.FetchUniteInfoSuccess,result

});

export const Delete = (uniteId,jwt) => ({
    type : ActionType.Delete,uniteId,
    jwt
});


export const DeleteSuccess = (result) => ({
    type : ActionType.DeleteSuccess,
    result
});

export const Update = (jwt,uniteInfo) => ({
    type : ActionType.Update,uniteInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});

export const Add = (jwt,uniteInfo) => ({
    type : ActionType.Add,uniteInfo,
    jwt
});


export const AddSuccess = (result) => ({
    type : ActionType.AddSuccess,result
});


export const Edit = (uniteId) => ({
    type : ActionType.Edit,uniteId
});
