import actionTypes from './actionTypes';
import {createNewCuaHangService, getAllCuaHangService, getUpdateCuaHangService} from "../../services/CuaHangService"
import {toast} from 'react-toastify';

export const createNewCuaHang = (data) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await createNewCuaHangService(data);
            if(res && res.errCode === 0)
            {
                toast.success("TẠO CỬA HÀNG THÀNH CÔNG")
                dispatch(getAllCuaHang("ALL"));
                dispatch({
                        type: actionTypes.CREATE_CUAHANG_SUCCESS,
                })
            }
            else
            {
                toast.error("KHÔNG THỂ TẠO CỬA HÀNG")
                dispatch({
                    type: actionTypes.CREATE_CUAHANG_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("catch createNewCuaHang lỗi ", e)
            toast.error("KHÔNG THỂ TẠO CỬA HÀNG")
            dispatch({
                type: actionTypes.CREATE_CUAHANG_FAILED,
            })
        }
    }
}

export const getAllCuaHang = (idCuaHang) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await getAllCuaHangService(idCuaHang);
            // console.log("check mảng cửa hàng:", res)
            if(res)
            {
                // toast.success("TẠO CỬA HÀNG THÀNH CÔNG")
                dispatch(getAllCuaHangSuccess(res))
            }
            else
            {
                // toast.error("KHÔNG THỂ TẠO CỬA HÀNG")
                dispatch({
                    type: actionTypes.GET_ALL_CUAHANG_SUCCESS,
                    data: res
                    })
            }

        }catch(e)
        {
            console.log("getAllCuaHang ", e)
            // toast.error("KHÔNG THỂ TẠO CỬA HÀNG")
            dispatch({
                type: actionTypes.GET_ALL_CUAHANG_FAILED,
            })
        }
    }
}

export const getAllCuaHangSuccess = (data) => ({
    type: actionTypes.GET_ALL_CUAHANG_SUCCESS,
    data: data
})

export const getUpdateCuaHang = (data) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await getUpdateCuaHangService(data);
            console.log("check update cửa hàng:", res)
            if(res)
            {
                // toast.success("TẠO CỬA HÀNG THÀNH CÔNG")
                dispatch({
                    type: actionTypes.UPDATE_CUAHANG_SUCCESS,
                    data: res
                })
                dispatch(getAllCuaHang("ALL"));
            }
            else
            {
                // toast.error("KHÔNG THỂ TẠO CỬA HÀNG")
                dispatch({
                    type: actionTypes.UPDATE_CUAHANG_FAILED,
                    })
            }

        }catch(e)
        {
            console.log("getUpdateCuaHang ", e)
            // toast.error("KHÔNG THỂ TẠO CỬA HÀNG")
            dispatch({
                type: actionTypes.UPDATE_CUAHANG_FAILED,
            })
        }
    }
}