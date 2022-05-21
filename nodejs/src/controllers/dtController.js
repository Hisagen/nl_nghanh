import DTService from "../services/DTservice"
import db from "../models/index"
import DonHangservice from '../services/DonHangservice'
let getTopDTHome = async (req, res) => {
    let limit = req.query.limit;
    if(!limit)
    {
        limit = 10
    }
    try{
        let response = await DTService.getTopDTHomeService(+limit);
        return res.status(200).json(response)
    }catch(e)
    {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server..."
        })
    }  
} 

let getAllSP = async (req, res) =>
{
    try{
        let sp = await DTService.getAllSP(req.body);
        return res.status(200).json(sp);
    }catch(e)
    {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}



let saveSP = async (req, res) => {
    try {
        let response = await DTService.saveSP(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getDetailSP = async (req, res) =>
{
    try {
        
        let response = await DTService.getChitietSP(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getDetailSanPham = async (req, res) =>
{
    try {
        
        let data = await DTService.getDetailSanPham(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
let getAllSanPham = async (req, res) =>
{
    try{
        let sp = await DTService.getAllSanPham(req.body);
        return res.status(200).json(sp);
    }catch(e)
    {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}

let getAllGioHang = async (req, res) =>
{
    try{
        let sp = await DTService.getAllGioHang(req.query.idUser);
        return res.status(200).json(sp);
    }catch(e)
    {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}

let GetAllLoaiSanPham = async (req, res) =>
{
    let id = req.query.id
    if(!id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong co id nay",
            loaisp: [],
        })
    }
    
    let loaisp = await DTService.GetAllLoaiSanPham(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        loaisp
    })
}

let handleCreateNewSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewSanPham(req.body);
    return res.status(200).json(message);
}

let handleCreateNewLoaiSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewLoaiSanPham(req.body);
    return res.status(200).json(message);
}

let handleCreateNewDMSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewDMSanPham(req.body);
    return res.status(200).json(message);
}

let handleEditSanPham = async (req, res) =>
{
    let data = req.body;
    let message =  await DTService.updateSanPham(data);
    return res.status(200).json(message);
}

let handleDeleteSanPham = async (req, res) =>
{
    if(!req.query.id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong nhận được id sản phẩm"
        })
    }
    let message = await DTService.deleteSanPham(req.query.id);
    return res.status(200).json(message);
}
let GetAllDanhMuc = async (req, res) =>
{
    let id = req.query.id
    if(!id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong co id nay",
            danhmuc: [],
        })
    }
    
    let danhmuc = await DTService.GetAllDanhMuc(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        danhmuc
    })
}
let hanldeEditdanhmuc = async (req, res) =>
{

    let data = req.body;
    let message =  await DTService.updateDanhMuc(data)
    return res.status(200).json(message);
}
let handleDeletedanhmuc = async (req, res) =>
{
    if(!req.query.id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong nhận được id sản phẩm"
        })
    }
    let message = await DTService.deleteDanhMuc(req.query.id);
    return res.status(200).json(message);
}
let getDetailDanhMuc = async (req, res) =>
{
    try {
        
        let data = await DTService.getDetailDanhMuc(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
let updateLoaiSP = async (req, res) =>
{
    let data = req.body;
    let message =  await DTService.updateLoaiSP(data);
    return res.status(200).json(message);
}
let deleteLoaiSP = async (req, res) =>
{
    if(!req.query.id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong nhận được id loại sản phẩm"
        })
    }
    let message = await DTService.deleteLoaiSP(req.query.id);
    return res.status(200).json(message);
}

let search_loaisp =  async (req, res) =>
{
    try {
        
        let data = await DTService.search_loaispService(req.query.id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
}
}
let getdsloaidm =  async (req, res) =>
{
    try {
        
        let data = await DTService.getdsloaidm(req.query.idDM);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
}
}

let handleCreateNewGioHang = async (req, res) =>
{
    let message = await DTService.CreateNewGioHang(req.body);
    return res.status(200).json(message);
}
let hanldegetGioHang = async (req, res) =>
{
    let message = await DTService.getGioHang(req.query.idUser);
    return res.status(200).json(message);
}
let hanldeDeleteGioHang = async (req, res) =>
{
    let message = await DTService.deletgiohang(req.body);
    return res.status(200).json(message);
}

let handleCreateThanhToan = async (req, res) =>
{
    let message = await DTService.bulkCreateThanhToan(req.body);
    return res.status(200).json(message);
}

let handleGetTrangThai = async (req, res) =>
{
    let message = await DTService.getTrangThai(req.body);
    return res.status(200).json(message);
}

let getAllDonHang = async (req, res) =>
{
    let message = await DTService.getAllDonHang(req.body);
    return res.status(200).json(message);
}
let getChiTietDonHang = async (req, res) =>
{
    let message = await DTService.getChiTietDonHang(req.query.id_donhang);
    return res.status(200).json(message);
}
let getAllYeuThich = async (req, res) =>
{
    let message = await DTService.getAllYeuThich(req.body);
    return res.status(200).json(message);
}
let CreateNewYeuThich = async (req, res) =>
{
    let message = await DTService.CreateNewYeuThich(req.body);
    return res.status(200).json(message);
}

let deleteYeuThich = async (req, res) =>
{
    let message = await DTService.deleteYeuThich(req.body);
    return res.status(200).json(message);
}
let getTrangThaiDonHang = async (req, res) =>
{
    let message = await DTService.getTrangThaiDonHang(req.query.id);
    return res.status(200).json(message);
}

let saveTTDH = async (req, res) =>
{
    let message = await DTService.saveTTDH(req.body);
    return res.status(200).json(message);
}

let getDiaChiFromUser = async (req, res) =>
{
    let message = await DTService.getDiaChiFromUser(req.query.idUser);
    return res.status(200).json(message);
}

let getALLMarkdown  = async (req, res) =>
{
    let message = await DTService.getALLMarkdown(req.body);
    return res.status(200).json(message);
}
// ứng dụng
let getALLUngDung  = async (req, res) =>
{
    let message = await DTService.getALLUngDung(req.query.id);
    return res.status(200).json(message);
}
let searchSPtheoLoai  = async (req, res) =>
{
    let message = await DTService.searchSPtheoLoai(req.query.idLoai);
    return res.status(200).json(message);
}

let sanphamtheoloaiThuocCuaHang  = async (req, res) =>
{
    let message = await DTService.sanphamtheoloaiThuocCuaHang(req.body);
    return res.status(200).json(message);
}

let TimKiemSanPham  = async (req, res) =>
{
    const { Op } = require("sequelize");
    // let message = await DTService.TimKiemSanPham(req.query.data);
    let sanpham =  await db.sanphams.findAll({
            //    "$or":[
            //        {ten_sp:req.params.key}
            //    ]
                where: {
                    ten_sp: {
                    [Op.like]: `%${req.params.key}%`
                    }
              },
            })
    return res.status(200).json(sanpham);
}
let getAllSanPhamTheoCuaHang = async (req, res) =>
{
    let message = await DTService.getAllSanPhamTheoCuaHang(req.query.idCuaHang);
    return res.status(200).json(message);
}


///////////////////////////////////// gửi mail
let postChidinhAppointment = async (req, res) => {
    try {
        let infor = await DonHangservice.postChidinhAppointment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
let handleSaveBinhLuan = async (req, res) => {
    let message = await DTService.SaveBinhLuan(req.body);
    return res.status(200).json(message);
}

let handleGetAllBinhLuan = async (req, res) => {
    let message = await DTService.GetAllBinhLuan(req.query.id);
    return res.status(200).json(message);
}

let handleEditActionCMT = async (req, res) => {
    let message = await DTService.EditActionCMT(req.body);
    return res.status(200).json(message);
}

let handleGetAllBinhLuanAdmin = async (req, res) => {
    let message = await DTService.GetAllBinhLuanAdmin(req.query.id);
    return res.status(200).json(message);
}

let handleSaveTraLoi = async (req, res) => {
    let message = await DTService.SaveTraLoi(req.body);
    return res.status(200).json(message);
}

let handleGetAllTraLoi = async (req, res) => {
    let message = await DTService.GetAllTraLoi(req.query.id, req.query.MaBL);
    return res.status(200).json(message);
}

let handleGetAllTraLoiAdmin = async (req, res) => {
    let message = await DTService.GetAllTraLoiAdmin(req.query.id, req.query.MaBL);
    return res.status(200).json(message);
}

let thongkesanphamtheocuahang = async (req, res) => {
    let message = await DTService.thongkesanphamtheocuahang(req.query.idCuaHang);
    return res.status(200).json(message);
}

let thongkesanphamtheochitiet = async (req, res) => {
    let message = await DTService.thongkesanphamtheochitiet(req.query.idSp,req.query.idCuaHang);
    return res.status(200).json(message);
}
module.exports = {


    ////////////////////////////// sản phẩm
    getTopDTHome:getTopDTHome,
    getAllSP:getAllSP,
    thongkesanphamtheochitiet:thongkesanphamtheochitiet,
    thongkesanphamtheocuahang:thongkesanphamtheocuahang,
    //savechitietSP:savechitietSP,
    saveSP:saveSP,
    getDetailSP:getDetailSP,
    getAllSanPham:getAllSanPham,
    handleCreateNewSanPham:handleCreateNewSanPham,
    getDetailSanPham:getDetailSanPham,
    handleDeleteSanPham:handleDeleteSanPham,
    handleEditSanPham:handleEditSanPham,
    getAllSanPhamTheoCuaHang:getAllSanPhamTheoCuaHang,
    sanphamtheoloaiThuocCuaHang:sanphamtheoloaiThuocCuaHang,

    ////////////////////////////// loại sản phẩm
    GetAllLoaiSanPham:GetAllLoaiSanPham,
    handleCreateNewLoaiSanPham:handleCreateNewLoaiSanPham,
    updateLoaiSP:updateLoaiSP,
    deleteLoaiSP:deleteLoaiSP,
    search_loaisp:search_loaisp,


    ///////////////////////////////// danh mục
    handleCreateNewDMSanPham:handleCreateNewDMSanPham,
    GetAllDanhMuc:GetAllDanhMuc,
    handleDeletedanhmuc:handleDeletedanhmuc,
    hanldeEditdanhmuc:hanldeEditdanhmuc,
    getDetailDanhMuc:getDetailDanhMuc,
    getdsloaidm:getdsloaidm,


    ////////////////////////////////// giỏ hàng
    handleCreateNewGioHang:handleCreateNewGioHang,
    hanldegetGioHang:hanldegetGioHang,
    getAllGioHang:getAllGioHang,
    hanldeDeleteGioHang:hanldeDeleteGioHang,

    ////////////////////////////////// 
    handleCreateThanhToan:handleCreateThanhToan,
    handleGetTrangThai:handleGetTrangThai,
    getAllDonHang:getAllDonHang,
    getChiTietDonHang:getChiTietDonHang,
    getAllYeuThich:getAllYeuThich,
    CreateNewYeuThich:CreateNewYeuThich,
    deleteYeuThich:deleteYeuThich,
    getTrangThaiDonHang:getTrangThaiDonHang,
    saveTTDH:saveTTDH,
    getDiaChiFromUser:getDiaChiFromUser,
    getALLMarkdown:getALLMarkdown,
    searchSPtheoLoai:searchSPtheoLoai,
    getALLUngDung:getALLUngDung,
    TimKiemSanPham:TimKiemSanPham,

    //////////////////////// gửi mail
    postChidinhAppointment:postChidinhAppointment,
    
    // bình luận
    handleSaveBinhLuan: handleSaveBinhLuan,
    handleGetAllBinhLuan: handleGetAllBinhLuan,
    handleEditActionCMT: handleEditActionCMT,
    handleGetAllBinhLuanAdmin: handleGetAllBinhLuanAdmin,

    //Trả lời
    handleSaveTraLoi: handleSaveTraLoi,
    handleGetAllTraLoi: handleGetAllTraLoi,
    handleGetAllTraLoiAdmin: handleGetAllTraLoiAdmin
}