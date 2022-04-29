import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserService, getAllUser 
    ,deleteUserService, editUserService, getTopDTHomeService, 
    getAllSP, saveInForSP} from '../../services/userService';
import * as actions from "../actions";
import {toast} from 'react-toastify';
import { dispatch } from '../../redux';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =  () => {
    return async (dispatch, getState) =>{
        try{

            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("Gender");
            console.log("check res Gender", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchGenderSuccess(res.data));
            }else
            {
                dispatch(fetchGenderFailed());
            }
        }catch(e)
        {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error",e);
        }
    }
    
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


//role

export const fetchRoleStart =  () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeService("Role");
            if(res && res.errCode === 0 )
            {
                dispatch(fetchRoleSuccess(res.data));
            }else
            {
                dispatch(fetchRoleFailed());
            }
        }catch(e)
        {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error",e);
        }
    }
    
} 

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

// status

export const fetchStatusStart =  () => {
    return async (dispatch, getState) =>{
        try{

            dispatch({
                type: actionTypes.FETCH_STATUS_START
            })
            let res = await getAllCodeService("Status");
            //console.log("check res status", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchStatusSuccess(res.data));
            }else
            {
                dispatch(fetchStatusFailed());
            }
        }catch(e)
        {
            dispatch(fetchStatusFailed());
            console.log("fetchGenderStart error",e);
        }
    }
    
}

export const fetchStatusSuccess = (statusData) => ({
    type: actionTypes.FETCH_STATUS_SUCCESS,
    status: statusData
})

export const fetchStatusFailed = () => ({
    type: actionTypes.FETCH_STATUS_FAILED
})


export const createNewUser = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await createNewUserService(data);
            console.log("check create user redux", res)
            if(res && res.errCode === 0 )
            {
                toast.success("TẠO NGƯỜI DÙNG THÀNH CÔNG")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }else
            {
                toast.error("KHÔNG THỂ TẠO NGƯỜI DÙNG")
                dispatch(saveUserFailed());
            }
        }catch(e)
        {
            dispatch(saveUserFailed());
            console.log("fetchRoleStart error",e);
        }
    }
}

export const saveUserSuccess = () => (
    {
        type: actionTypes.CREATE_USER_SUCCESS
    })

export const saveUserFailed = () => (
    {
        type: actionTypes.CREATE_USER_FAILED
    }
)

export const fetchAllUserStart =  () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllUser("ALL");
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }else
            {
                dispatch(fetchAllUserFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllUserFailed());
            console.log("fetchRoleStart error",e);
        }
    }
    
} 

export const fetchAllUserSuccess =  (data) =>(
    {
        type: actionTypes.FETCH_ALL_USER_SUCCESS,
        users: data
    }
)

export const fetchAllUserFailed =  () =>(
    {
        type: actionTypes.FETCH_ALL_USER_FAILED
    }
)

export const deleteUser = (userId) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await deleteUserService(userId) ;
            if(res && res.errCode === 0 )
            {
                toast.success("XÓA NGƯỜI DÙNG THÀNH CÔNG")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }else
            {
                toast.error("KHÔNG THỂ XÓA NGƯỜI DÙNG THÀNH CÔNG")
                dispatch(deleteUserFailed());
            }
        }catch(e)
        {
            dispatch(deleteUserFailed());
            console.log("fetchRoleStart error",e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await editUserService(data) ;
            console.log("check res", res);
            if(res && res.errCode === 0 )
            {
                toast.success("SỬA NGƯỜI DÙNG THÀNH CÔNG")
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }else
            {
                toast.error("KHÔNG THỂ SỬA NGƯỜI DÙNG THÀNH CÔNG")
                dispatch(editUserFailed());
            }
        }catch(e)
        {
            dispatch(editUserFailed());
            console.log("fetchRoleStart error",e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDT = () =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await getTopDTHomeService('');
            if(res && res.errCode === 0)
            {
                dispatch({
                        type: actionTypes.FETCH_TOP_DT_SUCCESS,
                        dataDTs: res.data
                })
            }
            else
            {
                dispatch({
                    type: actionTypes.FETCH_TOP_DT_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("FETCH_TOP_DT_FAILED", e)
            dispatch({
                type: actionTypes.FETCH_TOP_DT_FAILED,
            })
        }
    }
}
// let res1 = await getTopDTHomeService(2);

export const fetchAllSP = (data) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await getAllSP(data);
            if(res && res.errCode === 0)
            {
                dispatch({
                        type: actionTypes.FETCH_ALL_SP_SUCCESS,
                        dataSPs: res.data
                })
            }
            else
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SP_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("FETCH_TOP_DT_FAILED", e)
            dispatch({
                type: actionTypes.FETCH_ALL_SP_FAILED,
            })
        }
    }
}

export const saveDetailSP = (data) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await saveInForSP(data);
            if(res && res.errCode === 0)
            {
                toast.success("Save Infor Detail SP Success")
                dispatch({
                        type: actionTypes.FETCH_SAVE_INFO_SP_SUCCESS,
                })
            }
            else
            {
                toast.error("Save Infor Detail SP Fail")
                dispatch({
                    type: actionTypes.FETCH_FAIL_INFO_SP_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("FETCH_FAIL_INFO_SP_FAILED", e)
            toast.error("Save Infor Detail SP Fail")
            dispatch({
                type: actionTypes.FETCH_FAIL_INFO_SP_FAILED,
            })
        }
    }
}



