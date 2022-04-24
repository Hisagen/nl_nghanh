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

// let savechitietSP = async (req, res) =>
// {
//     try{
       
//         console.log("check req.body", req.body);
//         let message = await DTService.saveSP(req.body);
//         console.log("check :response", message)
//         return res.status(200).json(message)
//      }catch(e)
//      {
//         console.log("check lỗi",e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: "Error from Server"
//         })
//      }
// }

let postInforDoctor = async (req, res) => {
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
        console.log('sin', response);
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
    console.log("check message", message);
    return res.status(200).json(message);
}

let handleCreateNewLoaiSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewLoaiSanPham(req.body);
    console.log("check message", message);
    return res.status(200).json(message);
}

let handleCreateNewDMSanPham = async (req, res) =>
{
    let message = await DTService.CreateNewDMSanPham(req.body);
    console.log("check message", message);
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

module.exports = {
    getTopDTHome:getTopDTHome,
    getAllSP:getAllSP,
    //savechitietSP:savechitietSP,
    postInforDoctor:postInforDoctor,
    getDetailSP:getDetailSP,
    getAllSanPham:getAllSanPham,
    GetAllLoaiSanPham:GetAllLoaiSanPham,
    handleCreateNewSanPham:handleCreateNewSanPham,
    getDetailSanPham:getDetailSanPham,
    handleCreateNewLoaiSanPham:handleCreateNewLoaiSanPham,
    handleCreateNewDMSanPham:handleCreateNewDMSanPham,
    handleDeleteSanPham:handleDeleteSanPham,
    handleEditSanPham:handleEditSanPham,
    GetAllDanhMuc:GetAllDanhMuc,
    handleDeletedanhmuc:handleDeletedanhmuc,
    hanldeEditdanhmuc:hanldeEditdanhmuc,
    getDetailDanhMuc:getDetailDanhMuc,
    updateLoaiSP:updateLoaiSP,
    deleteLoaiSP:deleteLoaiSP,
    search_loaisp:search_loaisp,
    getdsloaidm:getdsloaidm
}