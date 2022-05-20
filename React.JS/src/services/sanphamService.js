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
const create_new_giohang = (data) =>
{
    return axios.post(`/api/create-new-giohang`,data)
}
const getchitietsanpham = (id) =>
{
    return axios.get(`/api/get_detail_sp?id=${id}`)
}
const getgiohang = (idUser) =>
{
    return axios.get(`/api/lay_ds_giohang?idUser=${idUser}`)
}
const getAllGioHang = (idUser) =>
{
    return axios.get(`/api/GetAllGioHang?idUser=${idUser}`)
}
const deleteGioHang = (data) =>
{
    console.log("check data bên sản phẩm Service",data)
    return axios.post(`/api/delete-giohang`,data)
}
const createThanhToan = (data) =>
{
    return axios.post('/api/bulk-create-thanhtoan',data)
}

const createDonHang = (data) =>
{
    return axios.post('/api/bulk-create-donhang',data)
}

const getTrangThaiDonHang = () =>
{
    return axios.get('/api/get_trangthai_allcode')
}

const getAllDonHang = () =>
{
    return axios.get('/api/get_ALL_DonHang')
}
const getDonHangtheoid_donhang = (id_donhang) =>
{
    return axios.get(`/api/get_chitiet_donhang?id_donhang=${id_donhang}`)
}

//yêu thích
const CreateNewYeuThich = (data) =>
{
    return axios.post(`/api/create-new-yeuthich`,data)
}

const getAllYeuThich = () =>
{
    return axios.get(`/api/get_ALL_YeuThich`)
}

const deleteYeuThichSerVice = (data) =>
{
    return axios.post(`/api/create-delete-yeuthich`,data)
}


const getTTdonhangService = (id) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.get(`/api/get_TrangThai_DonHang?id=${id}`)
}

const saveTTDH = (data) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.put(`/api/save_TrangThaiDonHang`,data)
}

const getDiaChiFromUserSerVice = (idUser) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.get(`/api/get_ALL_DiaChi?idUser=${idUser}`)
}

const getAllMarkdownSerVice = (data) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.post(`/api/get_ALL_markdown`,data)
}

const searchSanPhamtheoLoaiSerVice = (idLoai) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.get(`api/search-sanphamtheoloai?idLoai=${idLoai}`)
}

const  getAllSanPhamTheoCuaHangService = (idCuaHang) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.get(`/api/getAllSanPhamTheoCuaHang?idCuaHang=${idCuaHang}`)
}



const  TimsanphamtheoloaiThuocCuaHangService = (data) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.post(`/api/search-sanphamtheoloaiThuocCuaHang`, data)
}

const  TimKiemSanPham = (key) =>
{
    // console.log("check id getTTdonhang", id)
    return axios.get(`/api/TimKiemSanPham/${key}`)
}

///////////////////// gửi mail
const postChidinhAppointment = (data) => {
    return axios.post(`/api/patient-chidinh-appointment`, data);
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
    getdsloaidm,
    create_new_giohang,
    getchitietsanpham,
    getgiohang,
    getAllGioHang,
    deleteGioHang,
    createThanhToan,
    createDonHang,
    getTrangThaiDonHang,
    getAllDonHang,
    getDonHangtheoid_donhang,
    CreateNewYeuThich,
    getAllYeuThich,
    deleteYeuThichSerVice,
    getTTdonhangService,
    saveTTDH,
    getDiaChiFromUserSerVice,
    getAllMarkdownSerVice,
    searchSanPhamtheoLoaiSerVice,
    getAllSanPhamTheoCuaHangService,
    TimsanphamtheoloaiThuocCuaHangService,
    TimKiemSanPham,
    postChidinhAppointment

}