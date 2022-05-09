import express, { Router } from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import dtController from "../controllers/dtController";
let route = express.Router(); 

let initWebRoute = (app) =>
{
    route.get('/',homeController.getHomePage);

    route.get('/test',homeController.getTest);

    route.get('/crud',homeController.getCRUD);

    route.post('/post-crud',homeController.postCRUD);

    route.get("/get-crud", homeController.displayGetCRUD);
    route.get("/edit-crud", homeController.getEditCRUD);
    route.post("/put-crud", homeController.putCRUD);
    route.get("/delete-crud", homeController.deleteCRUD);

    route.post("/api/login", userController.handleLogin);
    route.get("/api/get-all-users", userController.handleGetAllUsers);
    route.post("/api/create-new-user", userController.handleCreateNewUser);
    route.put("/api/edit-user", userController.handleEditUser);
    route.delete("/api/delete-user", userController.handleDeleteUser);

    //route.post("/api/delete-user", userController.);

    route.get("/api/allCode", userController.getAllCode);
    route.get("/api/top_dt_home", dtController.getTopDTHome);
    route.get("/api/get_all_sp", dtController.getAllSP);
    route.post("/api/save_sp", dtController.saveSP);
    route.get("/api/get_detail_sp", dtController.getDetailSP);

    //sanpham
    route.get("/api/get_all_sanpham", dtController.getAllSanPham);
    route.post("/api/create-new-sanpham", dtController.handleCreateNewSanPham);
    route.get("/api/get_detail_sanpham", dtController.getDetailSanPham);
    route.put("/api/edit-sanpham", dtController.handleEditSanPham);
    route.delete("/api/delete-sanpham", dtController.handleDeleteSanPham);
    
    route.get("/api/search-sanphamtheoloai", dtController.searchSPtheoLoai)

    //loaisp
    route.get("/api/GetAllLoaiSanPham", dtController.GetAllLoaiSanPham);
    route.post("/api/create-new-loaisanpham", dtController.handleCreateNewLoaiSanPham);
    route.put("/api/update-DMsanpham", dtController.updateLoaiSP);
    route.delete("/api/delete-loaisanpham", dtController.deleteLoaiSP);

    // danh mục
    route.get("/api/GetAllDanhMuc", dtController.GetAllDanhMuc);
    route.post("/api/create-new-DMsanpham", dtController.handleCreateNewDMSanPham);
    route.put("/api/edit-danhmuc", dtController.hanldeEditdanhmuc);
    route.delete("/api/delete-danhmuc", dtController.handleDeletedanhmuc);
    route.get("/api/get_detail_danhmuc", dtController.getDetailDanhMuc);

    //route.get("/api/GetAllLoaiSanPham", dtController.GetAllLoaiSanPham);

    // tìm
    route.get("/api/tim_loaisp_danhmuc", dtController.search_loaisp);
    route.get("/api/lay_ds_loaisp_dm", dtController.getdsloaidm);

    // giỏ hàng
    route.get("/api/GetAllGioHang", dtController.getAllGioHang);
    route.get("/api/lay_ds_giohang", dtController.hanldegetGioHang);
    route.post("/api/create-new-giohang", dtController.handleCreateNewGioHang);
    route.post("/api/delete-giohang", dtController.hanldeDeleteGioHang);
    route.post("/api/bulk-create-thanhtoan", dtController.handleCreateThanhToan);
    // route.post("/api/bulk-create-donhang", dtController.handlecreateDonHang);

    // chi tiết đơn hàng

    route.get("/api/get_trangthai_allcode", dtController.handleGetTrangThai);
    route.get("/api/get_chitiet_donhang", dtController.getChiTietDonHang);
    //đơn hàng
    route.get("/api/get_ALL_DonHang", dtController.getAllDonHang);
    route.get("/api/get_TrangThai_DonHang", dtController.getTrangThaiDonHang);
    route.put("/api/save_TrangThaiDonHang", dtController.saveTTDH)

    // yêu thích
    route.get("/api/get_ALL_YeuThich", dtController.getAllYeuThich);
    route.post("/api/create-new-yeuthich", dtController.CreateNewYeuThich);
    route.post("/api/create-delete-yeuthich", dtController.deleteYeuThich);   


    // địa chỉ 
    route.get("/api/get_ALL_DiaChi", dtController.getDiaChiFromUser);

    // markdown
    route.get("/api/get_ALL_markdown", dtController.getALLMarkdown);

    //ứng dụng
    route.get("/api/get_ALL_ungdung", dtController.getALLUngDung);
    ////////////////////////////////////////////////////
    route.get('/nlnghanh',(req, res) => 
    {
        return res.send('Hello Ra Sin');
    });


    return app.use("/",route);
}

module.exports = initWebRoute;