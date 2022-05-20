import actionTypes from './actionTypes';
import {toast} from 'react-toastify';
import { dispatch } from '../../redux';
import {get_all_loai_san_pham, create_new_SanPham,get_all_san_pham, 
    editSanPhamService,deleteSanPhamService,getAllDanhMuc, 
    create_new_DanhMuc,editDanhMucService,deleteDanhMucService,create_new_Loaisp,editLoaiSPService,
    deleteLoaispService, searchLoaispService, getgiohang,
    getAllGioHang, create_new_giohang,deleteGioHang
    ,getTrangThaiDonHang,getAllDonHang,getDonHangtheoid_donhang, CreateNewYeuThich,
    getAllYeuThich,deleteYeuThichSerVice,getTTdonhangService,getDiaChiFromUserSerVice,
    getAllMarkdownSerVice, searchSanPhamtheoLoaiSerVice, getAllSanPhamTheoCuaHangService,
    TimsanphamtheoloaiThuocCuaHangService,
} from "../../services/sanphamService";

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

export const fetchAllSANPHAMStart = () =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await get_all_san_pham();
            console.log("check res all sản phẩm", res)
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


export const getAllSanPhamTheoCuaHang = (idCuaHang) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await getAllSanPhamTheoCuaHangService(idCuaHang);
            console.log("check res all sản phẩm theo cửa hàng", res)
            if(res && res.errCode === 0)
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SANPHAM_THEO_CUAHANG_SUCCESS,
                    sanphamtheocuahang: res.data
                })
            }
            else
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SANPHAM_THEO_CUAHANG_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("FETCH_TEST_SANPHAM_FAILED", e)
            dispatch({
                type: actionTypes.FETCH_ALL_SANPHAM_THEO_CUAHANG_FAILED,
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

export const getGiohang = (idUser) =>
{
    return async (dispatch,getState) =>
    {
        try{
            let res = await getgiohang(idUser)
            if(res && res.errCode === 0)
            {
                dispatch({
                        type: actionTypes.GET_ALL_GIO_HANG_SUCCESS,
                        giohangArr: res.data,
                })
                dispatch(fetchAllGioHangSTART(''));

            }
            else
            {
                dispatch({
                    type: actionTypes.GET_ALL_GIO_HANG_FAILED, 
                })
            }
        }catch(e)
        {

        }
    }
}

export const fetchAllGioHangSTART = (userId) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getAllGioHang(userId);
            console.log("check res giỏ hàng theo nguoi dùng", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllGioHangSuccess(res.data));
            }else
            {
                dispatch(fetchAllGioHangFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllGioHangFailed());
            console.log("fetchAllGioHangSTART error",e);
        }
    }
}

export const fetchAllGioHangSuccess = (giohang) => ({
    type: actionTypes.FETCH_ALL_GIOHANGNEW_SUCCESS,
    data: giohang
})

export const fetchAllGioHangFailed = () => ({
    type: actionTypes.FETCH_ALL_GIOHANGNEW_FAILED
})

export const createNewGioHang = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await create_new_giohang(data);
            //console.log("check create sản phẩm redux", res)
            if(res && res.errCode === 0 )
            {
                toast.success("THÊM SẢN PHẨM THÀNH CÔNG")
                //dispatch(saveGioHangSuccess());
                dispatch(fetchAllGioHangSTART(''));
            }else
            {
                toast.error("KHÔNG THỂ THÊM SẢN PHẨM THÀNH CÔNG")
                //dispatch(saveGioHangFailed());
            }
        }catch(e)
        {
            dispatch(saveGioHangFailed());
            console.log("createNewGioHang error",e);
        }
    }
}

export const saveGioHangSuccess = () => (
    {
        type: actionTypes.CREATE_GIOHANG_SUCCESS

    })

export const saveGioHangFailed = () => (
    {
        type: actionTypes.CREATE_GIOHANG_FAILED,
        
    }
)

export const hanldedeleteGioHang = (data) =>
{
    return async (dispatch, getState) =>{
        try{
            let res = await deleteGioHang(data);
            console.log("check res delete giỏ hàng", res)
            if(res && res.errCode === 0 )
            {
                toast.success("XÓA THÀNH CÔNG")
                //dispatch(saveGioHangSuccess());
                dispatch(fetchAllGioHangSTART(''));
            }else
            {
                toast.error("KHÔNG THỂ XÓA")
                //dispatch(saveGioHangFailed());
            }
        }catch(e)
        {
            dispatch(saveGioHangFailed());
            console.log("deleteGioHang error",e);
        }
    }
}

export const deleteGioHangSuccess = () => (
    {
        type: actionTypes.DELETE_GIOHANG_SUCCESS

    })

export const deleteGioHangFailed = () => (
    {
        type: actionTypes.DELETE_GIOHANG_FAILED,
        
    }
)

export const fetchAllTrangThaiSTART = () =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getTrangThaiDonHang();
            // console.log("check res getTrangThaiDonHang", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllTrangThaiSuccess(res.data));
            }else
            {
                dispatch(fetchAllTrangThaiFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllTrangThaiFailed());
            console.log("fetchAllGioHangSTART error",e);
        }
    }
}

export const fetchAllTrangThaiSuccess = (trangthai) => ({
    type: actionTypes.GET_ALL_TRANGTHAI_SUCCESS,
    data: trangthai
})

export const fetchAllTrangThaiFailed = () => ({
    type: actionTypes.GET_ALL_TRANGTHAI_FAILED
})

// đơn hàng

export const fetchAllDonHangSTART = () =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getAllDonHang();
            // console.log("check res mới", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllDonHangSuccess(res.data));
            }else
            {
                dispatch(fetchAllDonHangFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllDonHangFailed());
            console.log("fetchAllDonHangSTART error",e);
        }
    }
}

export const fetchAllDonHangSuccess = (donhang) => ({
    type: actionTypes.GET_ALL_DONHANG_SUCCESS,
    data: donhang
})

export const fetchAllDonHangFailed = () => ({
    type: actionTypes.GET_ALL_DONHANG_FAILED
})

export const fetchAllChiTietDonHangSTART = (id_chitiet) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getDonHangtheoid_donhang(id_chitiet);
            console.log("check res getDonHangtheoid_donhang", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllChiTietDonHangSuccess(res.data));
            }else
            {
                dispatch(fetchAllChiTietDonHangFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllChiTietDonHangFailed());
            console.log("fetchAllDonHangSTART error",e);
        }
    }
}

export const fetchAllChiTietDonHangSuccess = (donhang) => ({
    type: actionTypes.GET_ALL_CHITIETDONHANG_SUCCESS,
    data: donhang
})

export const fetchAllChiTietDonHangFailed = () => ({
    type: actionTypes.GET_ALL_CHITIETDONHANG_FAILED
})


export const fetchAllYeuThichSTART = () =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getAllYeuThich();
            // console.log("check res mới", res)
            if(res && res.errCode === 0 )
            {
                dispatch(fetchAllYeuThichSuccess(res.data.reverse()));
            }else
            {
                dispatch(fetchAllYeuThichFailed());
            }
        }catch(e)
        {
            dispatch(fetchAllYeuThichFailed());
            console.log("fetchAllGioHangSTART error",e);
        }
    }
}

export const fetchAllYeuThichSuccess = (yeuthich) => ({
    type: actionTypes.GET_ALL_YEUTHICH_SUCCESS,
    data: yeuthich
})

export const fetchAllYeuThichFailed = () => ({
    type: actionTypes.GET_ALL_YEUTHICH_FAILED
})

export const createYeuThich = (data) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await CreateNewYeuThich(data);
            // console.log("check res mới", res)
            if(res && res.errCode === 0 )
            {
                dispatch(createYeuThichSuccess());
                dispatch(fetchAllYeuThichSTART());
            }else
            {
                dispatch(createYeuThichFailed());
            }
        }catch(e)
        {
            dispatch(createYeuThichFailed());
            console.log("fetchAllGioHangSTART error",e);
        }
    }
}

export const createYeuThichSuccess = () => ({
    type: actionTypes.CREATE_YEUTHICH_SUCCESS,
})

export const createYeuThichFailed = () => ({
    type: actionTypes.CREATE_YEUTHICH_FAILED
})

export const deleteYeuThich = (data) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await deleteYeuThichSerVice(data);
            // console.log("check res mới", res)
            if(res && res.errCode === 0 )
            {
                dispatch(deleteYeuThichSuccess());
                dispatch(fetchAllYeuThichSTART());
            }else
            {
                dispatch(deleteYeuThichFailed());
            }
        }catch(e)
        {
            dispatch(deleteYeuThichFailed());
            console.log("fetchAllGioHangSTART error",e);
        }
    }
}

export const deleteYeuThichSuccess = () => ({
    type: actionTypes.DELETE_YEUTHICH_SUCCESS,
})

export const deleteYeuThichFailed = () => ({
    type: actionTypes.DELETE_YEUTHICH_FAILED
})

export const getTTdonhang = (id) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getTTdonhangService(id);
            console.log("check res getTTdonhang", res)
            if(res && res.errCode === 0 )
            {
                dispatch(getTTdonhangSuccess(res));
                // dispatch(fetchAllYeuThichSTART());
            }else
            {
                dispatch(getTTdonhangFailed());
            }
        }catch(e)
        {
            dispatch(getTTdonhangFailed());
            console.log("fetchAllGioHangSTART error",e);
        }
    }
}

export const getTTdonhangSuccess = (data) => ({
    type: actionTypes.GET_TT_DH_SUCCESS,
    data: data
})

export const getTTdonhangFailed = () => ({
    type: actionTypes.GET_TT_DH_FAILED
})

// export const getAllDiaChi = () => {
//     return async (dispatch, getState) =>
//     {
//         try{

//             let res = await getDiaChiFromUserSerVice("ALL");
//             console.log("check res getDiaChiFromUser", res)
//             if(res && res.errCode === 0 )
//             {
//                 dispatch(getDiaChiFromUserSuccess(res));
//                 // dispatch(fetchAllYeuThichSTART());
//             }else
//             {
//                 dispatch(getDiaChiFromUserFailed());
//             }
//         }catch(e)
//         {
//             dispatch(getDiaChiFromUserFailed());
//             console.log("getDiaChiFromUser error",e);
//         }
//     }
// }
export const getDiaChiFromUser = (idUser) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getDiaChiFromUserSerVice(idUser);
            console.log("check res getDiaChiFromUser", res)
            if(res && res.errCode === 0 )
            {
                dispatch(getDiaChiFromUserSuccess(res.data));
                // dispatch(getDiaChiFromUser(idUser));

            }else
            {
                dispatch(getDiaChiFromUserFailed());
            }
        }catch(e)
        {
            dispatch(getDiaChiFromUserFailed());
            console.log("getDiaChiFromUser error",e);
        }
    }
}

export const getDiaChiFromUserSuccess = (data) => ({
    type: actionTypes.GET_DIACHIFROMUSER_SUCCESS,
    data: data
})

export const getDiaChiFromUserFailed = () => ({
    type: actionTypes.GET_DIACHIFROMUSER_FAILED
})

export const getAllMarkdown = (data) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getAllMarkdownSerVice(data);
            console.log("check res getAllMarkdown", res)
            if(res && res.errCode === 0 )
            {
                dispatch(getAllMarkdownSuccess(res.data));
                // dispatch(getDiaChiFromUser(idUser));

            }else
            {
                dispatch(getAllMarkdownFailed());
            }
        }catch(e)
        {
            dispatch(getAllMarkdownFailed());
            console.log("getDiaChiFromUser error",e);
        }
    }
}

export const getAllMarkdownSuccess = (data) => ({
    type: actionTypes.GET_ALLMARKDOWN_SUCCESS,
    data: data
})

export const getAllMarkdownFailed = () => ({
    type: actionTypes.GET_ALLMARKDOWN_FAILED
})

export const getOneMarkdown = (id) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await getAllMarkdownSerVice(id);
            console.log("check res getOneMarkdown", res)
            if(res && res.errCode === 0 )
            {
                dispatch(getOneMarkdownSuccess(res.data));
                // dispatch(getDiaChiFromUser(idUser));

            }else
            {
                dispatch(getOneMarkdownFailed());
            }
        }catch(e)
        {
            dispatch(getOneMarkdownFailed());
            console.log("getDiaChiFromUser error",e);
        }
    }
}

export const getOneMarkdownSuccess = (data) => ({
    type: actionTypes.GET_ONEMARKDOWN_SUCCESS,
    data: data
})

export const getOneMarkdownFailed = () => ({
    type: actionTypes.GET_ONEMARKDOWN_FAILED
})



export const searchSanPhamtheoLoai = (idLoai) =>
{
    return async (dispatch, getState) =>
    {
        try{

            let res = await searchSanPhamtheoLoaiSerVice(idLoai);
            // console.log("check res searchSanPhamtheoLoai", res.data)
            if(res && res.errCode === 0 )
            {
                dispatch(searchSanPhamtheoLoaiSuccess(res.data));
                // dispatch(getDiaChiFromUser(idUser));

            }else
            {
                dispatch(searchSanPhamtheoLoaiFailed());
            }
        }catch(e)
        {
            dispatch(searchSanPhamtheoLoaiFailed());
            console.log("searchSanPhamtheoLoai error",e);
        }
    }
}

export const searchSanPhamtheoLoaiSuccess = (data) => ({
    type: actionTypes.SEARCH_SANPHAM_THEOLOAI_SUCCESS,
    data: data
})

export const searchSanPhamtheoLoaiFailed = () => ({
    type: actionTypes.SEARCH_SANPHAM_THEOLOAI_FAILED
})


export const TimsanphamtheoloaiThuocCuaHang = (data) =>
{  
    return async (dispatch,getState) =>
    {
        try{
            let res = await TimsanphamtheoloaiThuocCuaHangService(data);
            console.log("check res TimsanphamtheoloaiThuocCuaHang", res)
            if(res && res.errCode === 0)
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_SUCCESS,
                    timsanphamtheoLoaiThuoccuahang: res.data
                })
            }
            else
            {
                dispatch({
                    type: actionTypes.FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_FAILED, 
                })
            }

        }catch(e)
        {
            console.log("FETCH_TEST_SANPHAM_FAILED", e)
            dispatch({
                type: actionTypes.FETCH_ALL_SANPHAM_THEO_LOAI_THUOC_CUAHANG_FAILED,
            })
        }
    }
}
