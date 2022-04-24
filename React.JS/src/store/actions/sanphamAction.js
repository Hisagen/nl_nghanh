import actionTypes from './actionTypes';
import {toast} from 'react-toastify';
import { dispatch } from '../../redux';
import {get_all_loai_san_pham, create_new_SanPham,get_all_san_pham, 
    editSanPhamService,deleteSanPhamService,getAllDanhMuc, 
    create_new_DanhMuc,editDanhMucService,deleteDanhMucService,create_new_Loaisp,editLoaiSPService,
    deleteLoaispService, searchLoaispService} from "../../services/sanphamService";

export const createNewSanPham = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await create_new_SanPham(data);
            console.log("check create sản phẩm redux", res)
            if(res && res.errCode === 0 )
            {
                toast.success("TẠO SẢN PHẨM THÀNH CÔNG")
                dispatch(saveSanPhamSuccess());
                dispatch(fetchAllSANPHAMStart());
            }else
            {
                toast.error("KHÔNG THỂ TẠO SẢN PHẨM")
                //dispatch(saveSanPhamFailed());
            }
        }catch(e)
        {
            dispatch(saveSanPhamFailed());
            console.log("fetchRoleStart error",e);
        }
    }
}

export const saveSanPhamSuccess = () => (
    {
        type: actionTypes.CREATE_SANPHAM_SUCCESS

    })

export const saveSanPhamFailed = () => (
    {
        type: actionTypes.CREATE_SANPHAM_FAIL
    }
)

export const fetchAllSANPHAMStart = (data) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await get_all_san_pham(data);
            //console.log("check res sản phẩm", res)
            if(res && res.errCode === 0)
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SANPHAM_SUCCESS,
                    sanphams: res.data
                })
            }
            else
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SANPHAM_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("FETCH_TEST_SANPHAM_FAILED", e)
            dispatch({
                type: actionTypes.FETCH_ALL_SANPHAM_FAILED,
            })
        }
    }
}

export const editSanPham = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await editSanPhamService(data);
            console.log("check res", res);
            if(res && res.errCode === 0 )
            {
                toast.success("SỬA SẢN PHẨM THÀNH CÔNG")
                dispatch(editSanPhamSuccess()); 
                dispatch(fetchAllSANPHAMStart());
            }else
            {
                toast.error("KHÔNG THỂ SỬA SẢN PHẨM")
                dispatch(editSanPhamFailed());
            }
        }catch(e)
        {
            dispatch(editSanPhamFailed());
            console.log("editSanPham error",e);
        }
    }
}

export const editSanPhamSuccess = () => ({
        type: actionTypes.EDIT_SANPHAM_SUCCESS
    }
)

export const editSanPhamFailed = () => ({
    type: actionTypes.EDIT_SANPHAM_FAIL
})

export const deleteSanPham = (userId) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await deleteSanPhamService(userId) ;
            if(res && res.errCode === 0 )
            {
                toast.success("XÓA SẢN PHẨM THÀNH CÔNG")
                dispatch(deleteSanPhamSuccess());
                dispatch(fetchAllSANPHAMStart());
            }else
            {
                toast.error("KHÔNG THỂ XÓA SẢN PHẨM")
                dispatch(deleteSanPhamFailed());
            }
        }catch(e)
        {
            dispatch(deleteSanPhamFailed());
            console.log("deleteSanPham error",e);
        }
    }
}

export const deleteSanPhamSuccess = () => ({
    type: actionTypes.DELETE_SANPHAM_SUCCESS
})

export const deleteSanPhamFailed = () => ({
    type: actionTypes.DELETE_SANPHAM_FAILED
})
// Danh mục
export const fetchAllDanhMucSTART = () =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getAllDanhMuc();
            //console.log("check res mới", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllDanhMucSuccess(res.danhmuc));
                //console.log("check res.danhmuc", res.danhmuc)
            }else
            {
                dispatch(fetchAllDanhMucFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllDanhMucFailed());
            console.log("fetchAllDanhMucSTART error",e);
        }
    }
}

export const fetchAllDanhMucSuccess = (danhmuc) => ({
    type: actionTypes.FETCH_ALL_DANHMUC_SUCCESS,
    danhmucArr: danhmuc
})

export const fetchAllDanhMucFailed = () => ({
    type: actionTypes.FETCH_ALL_DANHMUC_FAILED
})

export const createNewDanhMuc = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await create_new_DanhMuc(data);
            //console.log("check create sản phẩm redux", res)
            if(res && res.errCode === 0 )
            {
                toast.success("TẠO SẢN PHẨM THÀNH CÔNG")
                dispatch(saveDanhMucSuccess());
                dispatch(fetchAllDanhMucSTART());
            }else
            {
                toast.error("KHÔNG THỂ TẠO SẢN PHẨM")
                //dispatch(saveDanhMucFailed());
            }
        }catch(e)
        {
            dispatch(saveDanhMucFailed());
            console.log("createNewDanhMuc error",e);
        }
    }
}

export const saveDanhMucSuccess = () => (
    {
        type: actionTypes.CREATE_DANHMUC_SUCCESS

    })

export const saveDanhMucFailed = () => (
    {
        type: actionTypes.CREATE_DANHMUC_FAIL,
        
    }
)

export const editDanhMuc = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await editDanhMucService(data);
            console.log("check res", res);
            if(res && res.errCode === 0 )
            {
                toast.success("SỬA SẢN PHẨM THÀNH CÔNG")
                dispatch(editDanhMucSuccess());
                dispatch(fetchAllDanhMucSTART());
            }else
            {
                toast.error("KHÔNG THỂ SỬA DANH MUC")
                dispatch(editDanhMucFailed());
            }
        }catch(e)
        {
            dispatch(editDanhMucFailed());
            console.log("editDanhMuc error",e);
        }
    }
}

export const editDanhMucSuccess = () => ({
        type: actionTypes.EDIT_DANHMUC_SUCCESS
    }
)

export const editDanhMucFailed = () => ({
    type: actionTypes.EDIT_DANHMUC_FAIL
})

export const deleteDanhMuc = (id) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await deleteDanhMucService(id) ;
            if(res && res.errCode === 0 )
            {
                toast.success("XÓA SẢN PHẨM THÀNH CÔNG")
                dispatch(deleteDanhMucSuccess());
                dispatch(fetchAllDanhMucSTART());
            }else
            {
                toast.error("KHÔNG THỂ XÓA SẢN PHẨM")
                //dispatch(deleteDanhMucFailed());
            }
        }catch(e)
        {
            dispatch(deleteDanhMucFailed());
            console.log("deleteSanPham error",e);
        }
    }
}

export const deleteDanhMucSuccess = () => ({
    type: actionTypes.DELETE_SANPHAM_SUCCESS
})

export const deleteDanhMucFailed = () => ({
    type: actionTypes.DELETE_SANPHAM_FAILED
})

// loại sản phẩm

export const fetchAllLoaiSanPhamSTART = () =>
{
    return async (dispatch, getState) =>
    {
        try{

            dispatch({
                type: actionTypes.FETCH_ALL_LOAISANPHAM_START
            })
            let res = await get_all_loai_san_pham();
            //console.log("check res mới", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllLoaiSanPhamSuccess(res.loaisp));
            }else
            {
                dispatch(fetchAllLoaiSanPhamFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllLoaiSanPhamFailed());
            console.log("fetchLoaiSPStart error",e);
        }
    }
}

export const fetchAllLoaiSanPhamSuccess = (loaisp) => ({
    type: actionTypes.FETCH_ALL_LOAISANPHAM_SUCCESS,
    data: loaisp
})

export const fetchAllLoaiSanPhamFailed = () => ({
    type: actionTypes.FETCH_ALL_LOAISANPHAM_FAILED
})

export const createNewLoaisp = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await create_new_Loaisp(data);
            //console.log("check create sản phẩm redux", res)
            if(res && res.errCode === 0 )
            {
                toast.success("TẠO SẢN PHẨM THÀNH CÔNG")
                dispatch(saveLoaispSuccess());
                dispatch(fetchAllLoaiSanPhamSTART());
            }else
            {
                toast.error("KHÔNG THỂ TẠO SẢN PHẨM")
                //dispatch(saveLoaispFailed());
            }
        }catch(e)
        {
            dispatch(saveLoaispFailed());
            console.log("createNewDanhMuc error",e);
        }
    }
}

export const saveLoaispSuccess = () => (
    {
        type: actionTypes.CREATE_LOAISANPHAM_SUCCESS

    })

export const saveLoaispFailed = () => (
    {
        type: actionTypes.CREATE_LOAISANPHAM_FAIL
    }
)

export const editLoaisp = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await editLoaiSPService(data);
            console.log("check res", res);
            if(res && res.errCode === 0 )
            {
                toast.success("SỬA LOẠI SẢN PHẨM THÀNH CÔNG")
                dispatch(editLoaispSuccess()); 
                dispatch(fetchAllLoaiSanPhamSTART());
            }else
            {
                toast.error("KHÔNG THỂ SỬA LOẠI SẢN PHẨM")
                dispatch(editLoaispFailed());
            }
        }catch(e)
        {
            dispatch(editLoaispFailed());
            console.log("editDanhMuc error",e);
        }
    }
}

export const editLoaispSuccess = () => ({
        type: actionTypes.EDIT_LOAISANPHAM_SUCCESS
    }
)

export const editLoaispFailed = () => ({
    type: actionTypes.EDIT_LOAISANPHAM_FAIL
})

export const deleteLoaisp = (id) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await deleteLoaispService(id) ;
            if(res && res.errCode === 0 )
            {
                toast.success("XÓA SẢN PHẨM THÀNH CÔNG")
                dispatch(deleteDanhMucSuccess());
                dispatch(fetchAllLoaiSanPhamSTART());
            }else
            {
                toast.error("KHÔNG THỂ XÓA SẢN PHẨM")
                dispatch(deleteDanhMucFailed());
            }
        }catch(e)
        {
            dispatch(deleteDanhMucFailed());
            console.log("deleteSanPham error",e);
        }
    }
}

export const deleteLoaispSuccess = () => ({
    type: actionTypes.DELETE_LOAISANPHAM_SUCCESS
})

export const deleteLoaispFailed = () => ({
    type: actionTypes.DELETE_LOAISANPHAM_FAILED
})

export const searchLoaisp = (id) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await searchLoaispService(id);
            console.log("check res", res);
            if(res && res.errCode === 0 )
            {
                //toast.success("SỬA LOẠI SẢN PHẨM THÀNH CÔNG")
                dispatch(searchLoaispSuccess(res.data)); 
                
                //dispatch(fetchAllLoaiSanPhamSTART());
            }else
            {
                //toast.error("KHÔNG THỂ SỬA LOẠI SẢN PHẨM")
                dispatch(searchLoaispFailed());
            }
        }catch(e)
        {
            dispatch(searchLoaispFailed());
            console.log("editDanhMuc error",e);
        }
    }
}

export const searchLoaispSuccess = (data) =>
({
    type: actionTypes.SEARCH_LOAISP_SUCCESS,
    loaispnew: data
})

export const searchLoaispFailed = () =>
({
    type: actionTypes.SEARCH_LOAISP_FAILED
})

