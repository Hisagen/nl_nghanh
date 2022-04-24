import axios from "../axios";

const get_all_san_pham =  () =>
{
    return axios.get(`/api/get_all_sanpham?id=${"ALL"}`)
}

const get_all_loai_san_pham = () =>
{
    return axios.get(`/api/GetAllLoaiSanPham?id=${"ALL"}`)
}

const create_new_SanPham = (data) =>
{
    return axios.post(`/api/create-new-sanpham`,data)
}

const getInfoDetailSanPham = (id) =>
{
    return axios.get(`/api/get_detail_sanpham?id=${id}`)
}

const editSanPhamService = (data) =>
{
    return axios.put(`/api/edit-sanpham`,data)
}

const deleteSanPhamService = (id) =>
{
    return axios.delete(`/api/delete-sanpham?id=${id}`)
}

const getAllDanhMuc = () =>
{
    return axios.get(`/api/GetAllDanhMuc?id=${"ALL"}`)
}
const create_new_DanhMuc = (data) =>
{
    console.log("check data",data)
    return axios.post(`/api/create-new-DMsanpham`,data)
}

const editDanhMucService = (data) =>
{
    return axios.put(`/api/edit-danhmuc`,data)
}

const deleteDanhMucService = (id) =>
{
    return axios.delete(`/api/delete-danhmuc?id=${id}`)
}

const create_new_Loaisp = (data) =>
{
    return axios.post(`/api/create-new-loaisanpham`,data)
}
const editLoaiSPService = (data) =>
{
    return axios.put(`/api/update-DMsanpham`,data)
}

const deleteLoaispService = (id) =>
{
    return axios.delete(`/api/delete-loaisanpham?id=${id}`)
}

const searchLoaispService = (id) =>
{
    return axios.get(`/api/tim_loaisp_danhmuc?id=${id}`)
}

const getdsloaidm = (id) =>
{
    return axios.get(`/api/lay_ds_loaisp_dm?id=${id}`)

}
export  {
    get_all_san_pham,
    get_all_loai_san_pham,
    create_new_SanPham,
    getInfoDetailSanPham,
    editSanPhamService,
    deleteSanPhamService,
    getAllDanhMuc,
    create_new_DanhMuc,
    editDanhMucService,
    deleteDanhMucService,
    create_new_Loaisp,
    editLoaiSPService,
    deleteLoaispService,
    searchLoaispService,
    getdsloaidm
}