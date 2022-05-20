import DTService from "../services/DTservice"
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
        console.log(e)
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
        console.log(sp);
        return res.status(200).json(sp);
    }catch(e)
    {
        console.log("check lỗi",e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}



let saveSP = async (req, res) => {
    try {
        console.log('trai dua', req.body);
        let response = await DTService.saveSP(req.body);
        console.log('sin', response);
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
        //console.log('sin', response);
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
        console.log('data', data);
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
        console.log(sp);
        return res.status(200).json(sp);
    }catch(e)
    {
        console.log("check lỗi",e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}
let getAllGioHang = async (req, res) =>
{
    try{
        let sp = await DTService.getAllGioHang(req.body);
        console.log(sp);
        return res.status(200).json(sp);
    }catch(e)
    {
        console.log("check lỗi",e);
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
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleCreateNewLoaiSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewLoaiSanPham(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleCreateNewDMSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewDMSanPham(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleEditSanPham = async (req, res) =>
{
    let data = req.body;
    console.log(data);
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
    //console.log("check req.body",req.body)
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
        console.log('data', data);
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
    console.log(data);
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
        console.log('data', data);
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
        console.log('data', data);
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
    // console.log("check message", message);
    return res.status(200).json(message);
}
let hanldegetGioHang = async (req, res) =>
{
    let message = await DTService.getGioHang(req.query.idUser);
    // console.log("check message", message);
    return res.status(200).json(message);
}
let hanldeDeleteGioHang = async (req, res) =>
{
    let message = await DTService.deletgiohang(req.body);
    // console.log("check req.body", req.body);
    return res.status(200).json(message);
}

let handleCreateThanhToan = async (req, res) =>
{
    let message = await DTService.bulkCreateThanhToan(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleGetTrangThai = async (req, res) =>
{
    let message = await DTService.getTrangThai(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let getAllDonHang = async (req, res) =>
{
    let message = await DTService.getAllDonHang(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}
let getChiTietDonHang = async (req, res) =>
{
    let message = await DTService.getChiTietDonHang(req.query.id_donhang);
    // console.log("check message", message);
    return res.status(200).json(message);
}
let getAllYeuThich = async (req, res) =>
{
    let message = await DTService.getAllYeuThich(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}
let CreateNewYeuThich = async (req, res) =>
{
    let message = await DTService.CreateNewYeuThich(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let deleteYeuThich = async (req, res) =>
{
    let message = await DTService.deleteYeuThich(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}
let getTrangThaiDonHang = async (req, res) =>
{
    let message = await DTService.getTrangThaiDonHang(req.query.id);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let saveTTDH = async (req, res) =>
{
    let message = await DTService.saveTTDH(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let getDiaChiFromUser = async (req, res) =>
{
    let message = await DTService.getDiaChiFromUser(req.query.idUser);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let getALLMarkdown  = async (req, res) =>
{
    let message = await DTService.getALLMarkdown(req.query.id);
    // console.log("check message", message);
    return res.status(200).json(message);
}
// ứng dụng
let getALLUngDung  = async (req, res) =>
{
    let message = await DTService.getALLUngDung(req.query.id);
    // console.log("check message", message);
    return res.status(200).json(message);
}
let searchSPtheoLoai  = async (req, res) =>
{
    let message = await DTService.searchSPtheoLoai(req.query.idLoai);
    // console.log("check message", message);
    return res.status(200).json(message);
}


//Bình Luận
let handleSaveBinhLuan = async (req, res) => {
    let message = await DTService.SaveBinhLuan(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleGetAllBinhLuan = async (req, res) => {
    let message = await DTService.GetAllBinhLuan(req.query.id);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleEditActionCMT = async (req, res) => {
    let message = await DTService.EditActionCMT(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleGetAllBinhLuanAdmin = async (req, res) => {
    let message = await DTService.GetAllBinhLuanAdmin(req.query.id);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleSaveTraLoi = async (req, res) => {
    let message = await DTService.SaveTraLoi(req.body);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleGetAllTraLoi = async (req, res) => {
    let message = await DTService.GetAllTraLoi(req.query.id, req.query.MaBL);
    // console.log("check message", message);
    return res.status(200).json(message);
}

let handleGetAllTraLoiAdmin = async (req, res) => {
    let message = await DTService.GetAllTraLoiAdmin(req.query.id, req.query.MaBL);
    // console.log("check message", message);
    return res.status(200).json(message);
}

module.exports = {


    ////////////////////////////// sản phẩm
    getTopDTHome:getTopDTHome,
    getAllSP:getAllSP,
    //savechitietSP:savechitietSP,
    saveSP:saveSP,
    getDetailSP:getDetailSP,
    getAllSanPham:getAllSanPham,
    handleCreateNewSanPham:handleCreateNewSanPham,
    getDetailSanPham:getDetailSanPham,
    handleDeleteSanPham:handleDeleteSanPham,
    handleEditSanPham:handleEditSanPham,


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
    getALLUngDung: getALLUngDung,
    
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