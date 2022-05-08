import actionTypes from './actionTypes';

import {handelLoginApi} from "../../services/userService"

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) =>(
    {
        type: actionTypes.USER_LOGIN_SUCCESS,
        userInfo: userInfo
    })

export const userLoginFail = () => (
    {
        type: actionTypes.USER_LOGIN_FAIL
    }
)

export const processLogout = () => (
    {
        type: actionTypes.PROCESS_LOGOUT
    }
)


export const LoginStart = (email, password) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await handelLoginApi(email, password);
            console.log("check res LoginStart", res.user.typeRole)
            if(res && res.errCode === 0 )
            {
                dispatch(LoginSuccess(res.user.typeRole));
            }else
            {
                dispatch(LoginFail());
            }
        }catch(e)
        {
            dispatch(LoginFail());
            console.log("LoginStart error",e);
        }
    }
}

export const LoginSuccess = (data) =>(
    {
        
        type: actionTypes.LOGIN_SUCCESS,
        data: data
    })

export const LoginFail = () => (
    {
        type: actionTypes.LOGIN_FAIL
    }
)