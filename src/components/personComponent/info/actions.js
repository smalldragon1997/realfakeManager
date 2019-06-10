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

export const Update = (jwt,managerInfo) => ({
    type : ActionType.Update,managerInfo,
    jwt
});


export const UpdateSuccess = (result) => ({
    type : ActionType.UpdateSuccess,result
});


export const UpdatePwd = (jwt,pwdInfo) => ({
    type : ActionType.UpdatePwd,pwdInfo,
    jwt
});


export const UpdatePwdSuccess = (result) => ({
    type : ActionType.UpdatePwdSuccess,result
});
