const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

let getTopDTHomeService = (limitInput) =>
{
    return new Promise(async(resolve, reject) =>
    {
        try
        {
            let dts = await db.sanphams.findAll({
                limit: limitInput,
                //where: { ma_dm: '1'},
                order:  [['createdAt','DESC']],
                include: [
                    {   
                        model: db.hinhsps, attributes: ['image1', 'image2', 'image3']
                    }
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: dts
            })
        }catch(e)
        {
            reject(e);
        }
    })
}

let getAllSP = () => {
    return new Promise(async (resolve, reject) => {
            try {
                let sp = await db.User.findAll(
                    {
                        where: {typeRole: "R1"},
                        attributes:{
                            exclude: ['password']
                        },
                    }
                );
                resolve({
                    errCode: 0,
                    data: sp
                });
            } catch (e) {
                reject(e);
            }
        })
}

let saveSP = (data) => {
    //console.log("check contentMarkdown", data.contentMarkdown);
    return new Promise(async (resolve, reject) => {
    console.log("check contentHTML", data.contentHTML);
    console.log("check lisp", data);
            try {
                    if(!data.contentHTML || !data.action)
                    {
                        console.log("check Data", data)
                        resolve({
                            errCode: 1,
                            errMessage: "thiếu"
                        })
                    }
                    else
                    {
                        if(data.action === 'CREATE')
                        {
                            await db.Markdown.create({
                                contentHTML: data.contentHTML,
                                contentMarkdown: data.contentMarkdown,
                                description: data.description,
                                SPId: data.SPId,
                                // LSPId: 	data.LSPId,
                            }) 
                        }
                        else if(data.action === 'EDIT')
                        {
                            let doctorMarkdown = await db.Markdown.findOne({
                                where: {SPId: data.SPId},
                                raw : false
                            })

                            if(doctorMarkdown)
                            {
                                doctorMarkdown.contentHTML = data.contentHTML,
                                doctorMarkdown.contentMarkdown = data.contentMarkdown,
                                doctorMarkdown.description = data.description,
                                doctorMarkdown.updatedAt = new Date()
                                //doctorMarkdown.SPId: data.SPId,
                                await doctorMarkdown.save();
                            }
                            
                        }
                        resolve({
                            errCode: 0,
                            errMessage: 'thành công'
                        });
                    }
                
               
            } catch (e) {
                reject(e);
            }
        })
}


let getChitietSP = (id) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",id)
        if(!id)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.sanphams.findOne({
                where:{id:id},
            })
            
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}
let getDetailSanPham = (id) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",id)
        if(!id)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.sanphams.findOne({
                where:{id:id},
                include: [
                    {   
                        model: db.hinhsps, attributes: ['image1', 'image2', 'image3']
                    },
                    {   
                        model: db.loaisps, attributes: ['id','ten_loaisp']
                    }
                ],
                raw: false,
                nest: true
            })
            if(data && data.avt)
            {
                data.avt = new Buffer(data.avt, 'base64').toString('binary');
                data.hinhsp.image1 = new Buffer(data.hinhsp.image1, 'base64').toString('binary');
                data.hinhsp.image2 = new Buffer(data.hinhsp.image2, 'base64').toString('binary');
                data.hinhsp.image3 = new Buffer(data.hinhsp.image3, 'base64').toString('binary');
            }
            //console.log("check data.image1",)
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}

let getAllSanPham = () => {
    return new Promise(async (resolve, reject) => {
            try {
                
                let sp = await db.sanphams.findAll({
                    include: [
                        {   
                            model: db.hinhsps, attributes: ['image1', 'image2', 'image3']
                        },
                        {   
                            model: db.loaisps, attributes: ['id','ten_loaisp']
                        }
                    ],
                    raw: false,
                    nest: true
                });
                //console.log("avt", sp.avt)
                resolve({
                    errCode: 0,
                    data: sp,
                });
                
            } catch (e) {
                reject(e);
            }
        })
}

let GetAllLoaiSanPham = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let loaisp = '';
            if(inputId === 'ALL')
            {
                loaisp = await db.loaisps.findAll()
            }
            if(inputId !== 'ALL')
            {
                loaisp = await db.loaisps.findOne({
                    where: {id:inputId},
                })
            }
            resolve(loaisp);
        }catch(e)
        {
            reject(e);
        }
    })
}

let checkNameSanPham = (nameSP) =>
{
    return new Promise(async(resolve, reject) => {
        try
        {   
            let name = await db.sanphams.findOne({
                where: {ten_sp: nameSP}
            })
            if(name)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}
let checkNameLoaiSanPham = (nameLSP) =>
{
    return new Promise(async(resolve, reject) => {
        try
        {   
            let name = await db.loaisps.findOne({
                where: {ten_loaisp: nameLSP}
            })
            if(name)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}
// let checkNameGioHang = (nameLSP) =>
// {
//     return new Promise(async(resolve, reject) => {
//         try
//         {   
//             let name = await db.giohangs.findOne({
//                 where: {ten_sp: nameLSP}
//             })
//             if(name)
//             {
//                 resolve(true);
//             }
//             else
//             {
//                 resolve(false);
//             }
//         }catch(e)
//         {
//             reject(e);
//         }
//     })
// }
let checkNameDMSanPham = (nameDM) =>
{
    return new Promise(async(resolve, reject) => {
        try
        {   
            let name = await db.danhmucs.findOne({
                where: {ten_dm: nameDM}
            })
            console.log("check danh sách danh mục",name)
            if(name)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}
let CreateNewSanPham = (data) =>
{
    return new Promise( async(resolve, reject) =>
    {
        try{
            
            let check = await checkNameSanPham(data.ten_sp);
            console.log(check);
            if(check === true)
            {
                resolve({
                    errCode: 1,
                    errMessage: "sản phẩm da ton tai! vui long nhap sản phẩm khac"
                })
            }
            else
            {
               let createSP = await db.sanphams.create({
                    ten_sp: data.ten_sp,
                    qc_spHTML: data.qc_spHTML,
                    qc_spMarkdown: data.qc_spMarkdown,
                    sl_sp: data.sl_sp,
                    trangthai: data.trangthai,
                    msadmin: data.msadmin,
                    ma_loaisp: data.ma_loaisp,
                    avt: data.avt,
                    manhinh: data.manhinh,
                    HDH: data.HDH,
                    cameraSau: data.cameraSau,
                    cameraTruoc: data.cameraTruoc,
                    chip: data.chip,
                    ram: data.ram,
                    bonho: data.bonho,
                    pin: data.pin,
                    gia: data.gia,
                })
                // db.query(createSP, function (err, results, fields){
                    //  console.log("check id mới tạo", createSP.id)
                // })
                await db.hinhsps.create({
                    image1: data.avt1,
                    image2: data.avt2,
                    image3: data.avt3,
                    ma_sp: createSP.id
                })
                resolve({
                    errCode: 0,
                    errMessage: "thanh cong",
                    
                })
            }
            
        }catch(e)
            {
                reject(e)
            }
    })
}
let CreateNewLoaiSanPham = (data) =>
{
    return new Promise( async(resolve, reject) =>
    {
        try{
            
            let check = await checkNameLoaiSanPham(data.ten_loaisp);
            console.log(check);
            if(check === true)
            {
                resolve({
                    errCode: 1,
                    errMessage: "Loại sản phẩm đã tồn tại! vui lòng nhập loại sản phẩm khác"
                })
            }
            else
            {
               let createSP = await db.loaisps.create({
                    ten_loaisp: data.ten_loaisp,
                    ma_dm: data.ma_dm,
                    
                })
                // // db.query(createSP, function (err, results, fields){
                //      console.log("check id mới tạo", createSP.id)
                // // })
                resolve({
                    errCode: 0,
                    errMessage: "thành công",
                    
                })
            }
            
        }catch(e)
            {
                reject(e)
            }
    })
}
let CreateNewDMSanPham = (data) =>
{
    return new Promise( async(resolve, reject) =>
    {
        try{
            
            let check = await checkNameDMSanPham(data.ten_dm);
            console.log("check tên danh mục",check);
            if(check === true)
            {
                resolve({
                    errCode: 1,
                    errMessage: "Loại danh mục đã tồn tại! vui lòng nhập danh mục khác"
                })
            }
            else
            {
               let createSP = await db.danhmucs.create({
                    ten_dm: data.ten_dm,
                    
                })
                // // db.query(createSP, function (err, results, fields){
                //      console.log("check id mới tạo", createSP.id)
                // // })
                resolve({
                    errCode: 0,
                    errMessage: "thành công",
                    
                })
            }
            
        }catch(e)
            {
                reject(e)
            }
    })
}
let updateSanPham = (data) =>
{
    return new Promise(async(resolve, reject) =>
    {
        //data.id = 6;
        // console.log("check data",data);
        try{
            if(!data.id)
            {
                //console.log(data);
                resolve({
                    errCode: 2,
                    errMessage: "khong nhan duoc id"
                })
            }
           
             let sanpham = await db.sanphams.findOne({
                where: {id: data.id},
                //raw: false
                })
                console.log("check sanpham",sanpham);
                if(sanpham)
                {
                    sanpham.ten_sp = data.ten_sp;
                    sanpham.qc_spHTML = data.qc_spHTML;
                    sanpham.qc_spMarkdown = data.qc_spMarkdown;
                    sanpham.sl_sp = data.sl_sp;
                    sanpham.trangthai = data.trangthai;
                    sanpham.msadmin = data.msadmin;
                    sanpham.ma_loaisp = data.ma_loaisp;
                    sanpham.manhinh= data.manhinh;
                    sanpham.HDH= data.HDH;
                    sanpham.cameraSau= data.cameraSau;
                    sanpham.cameraTruoc= data.cameraTruoc;
                    sanpham.chip= data.chip;
                    sanpham.ram= data.ram;
                    sanpham.bonho= data.bonho
                    sanpham.pin= data.pin;
                    sanpham.gia= data.gia;
                    //sanpham.avt = data.avt;

                    if(data.avt){
                        sanpham.avt = data.avt;
                    }
                    await sanpham.save();
                    let hinhsp = await db.hinhsps.findOne({
                        where: {ma_sp: data.id}
                    })
                    if(hinhsp)
                    {
                        if(data.avt1){
                            hinhsp.image1 = data.avt1;
                        }
                        await hinhsp.save();
                        if(data.avt2){
                            hinhsp.image2 = data.avt2;
                        }
                        await hinhsp.save();
                        if(data.avt3){
                            hinhsp.image3 = data.avt3;
                        }
                        await hinhsp.save();
                
                    }
                    resolve({
                        errCode: 0,
                        errMessage: "update thanh cong"
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage: "chua update"
                    });
                }
        }catch(e)
        {
            reject(e);
        }
    })
}
let deleteSanPham = (id) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundSanPham = await db.sanphams.findOne({
            where: {id: id}
        })
        // console.log("check id",id);
            if(!foundSanPham)
            {
                resolve({
                    errCode: 2,
                    errMessage: "không có người dùng này"
                })
            }
             
            await db.sanphams.destroy({
                where: {id: id}
            });
            await db.hinhsps.destroy({
                where: {ma_sp: id}
            });
            resolve({
                errCode: 0,
                    errMessage: "thành công"
            })
    })
}
let GetAllDanhMuc = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let danhmuc = '';
            if(inputId === 'ALL')
            {
                danhmuc = await db.danhmucs.findAll()
            }
            if(inputId !== 'ALL')
            {
                danhmuc = await db.danhmucs.findOne({
                    where: {id:inputId},
                })
            }
            resolve(danhmuc);
        }catch(e)
        {
            reject(e);
        }
    })
}
let updateDanhMuc = (data) =>
{
    return new Promise(async(resolve, reject) =>
    {
        //data.id = 6;
        // console.log("check data",data);
        try{
            if(!data.id)
            {
                //console.log(data);
                resolve({
                    errCode: 2,
                    errMessage: "khong nhan duoc id"
                })
            }
           
             let DanhMuc = await db.danhmucs.findOne({
                where: {id: data.id},
                //raw: false
                })
                console.log("check DanhMuc",DanhMuc);
                if(DanhMuc)
                {

                    DanhMuc.ten_dm = data.ten_dm;
                    await DanhMuc.save();
                    resolve({
                        errCode: 0,
                        errMessage: "update thanh cong"
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage: "chua update"
                    });
                }
        }catch(e)
        {
            reject(e);
        }
    })
}
let deleteDanhMuc = (id) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundDanhMuc = await db.danhmucs.findOne({
            where: {id: id}
        })
        // console.log("check id",id);
            if(!foundDanhMuc)
            {
                resolve({
                    errCode: 2,
                    errMessage: "không có người dùng này"
                })
            }
             
            await db.danhmucs.destroy({
                where: {id: id}
            });
            resolve({
                errCode: 0,
                    errMessage: "thành công"
            })
    })
}
let getDetailDanhMuc = (id) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",id)
        if(!id)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.danhmucs.findAll({
                where:{id:id},
                include: [
                    {   
                        model: db.loaisps, attributes: ['id', 'ten_loaisp', 'ma_dm']
                    },
                ],
                raw: true,
                nest: true
            })
            //console.log("check data.image1",)
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}

// danh mục

let updateLoaiSP = (data) =>
{
    return new Promise(async(resolve, reject) =>
    {
        //data.id = 6;
        // console.log("check data",data);
        try{
            if(!data.id)
            {
                //console.log(data);
                resolve({
                    errCode: 2,
                    errMessage: "khong nhan duoc id"
                })
            }
           
             let Loaisp = await db.loaisps.findOne({
                where: {id: data.id},
                //raw: false
                })
                //console.log("check Loaisp",Loaisp);
                if(Loaisp)
                {

                    Loaisp.ten_loaisp = data.ten_loaisp;
                    Loaisp.ma_dm = data.ma_dm
                    await Loaisp.save();
                    resolve({
                        errCode: 0,
                        errMessage: "update thanh cong"
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage: "chua update"
                    });
                }
        }catch(e)
        {
            reject(e);
        }
    })
}
let deleteLoaiSP = (id) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundLoaisp = await db.loaisps.findOne({
            where: {id: id}
        })
        // console.log("check id",id);
            if(!foundLoaisp)
            {
                resolve({
                    errCode: 2,
                    errMessage: "không có người dùng này"
                })
            }
             
            await db.loaisps.destroy({
                where: {id: id}
            });
            resolve({
                errCode: 0,
                    errMessage: "thành công"
            })
    })
}
let getDetailLoaiSP = (id) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",id)
        if(!id)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.danhmucs.findOne({
                where:{id:id},
            })
            //console.log("check data.image1",)
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}

let search_loaispService = (id) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",id)
        if(!id)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.loaisps.findAll({
                where:{ma_dm:id},
                //raw: false,
                //nest: true
            })
            //console.log("check data.image1",)
            resolve({
                errCode: 0,
                data: data,
            });
        }

    })
}

let getdsloaidm = (idDM) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",idDM)
        if(!idDM)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.loaisps.findAll({
                where:{ma_dm:idDM},
                // include: [
                //     {   
                //         model: db.hinhsps, attributes: ['image1', 'image2', 'image3']
                //     },
                //     {   
                //         model: db.loaisps, attributes: ['id','ten_loaisp']
                //     }
                // ],
                raw: false,
                nest: true
            })
            // if(data && data.avt)
            // {
            //     data.avt = new Buffer(data.avt, 'base64').toString('binary');
            //     data.hinhsp.image1 = new Buffer(data.hinhsp.image1, 'base64').toString('binary');
            //     data.hinhsp.image2 = new Buffer(data.hinhsp.image2, 'base64').toString('binary');
            //     data.hinhsp.image3 = new Buffer(data.hinhsp.image3, 'base64').toString('binary');
            // }
            //console.log("check data.image1",)
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}

let CreateNewGioHang = (data) =>
{
    // console.log('check data',data)
    
    return new Promise( async(resolve, reject) =>
    {
        // if(data.detailSP.data.id)
        // {}
        let check = await checkNameSPGioHang(data.detailSP.id)
        // console.log("check check", check)
        try{   
                if(check === true)
                {
                    let giohang = await db.giohangs.findOne(
                    {
                        where : { id_sp:data.detailSP.id}
                    })  
                    // console.log("check giỏ hàng",giohang)

                    let sp = await db.sanphams.findOne({
                        where: {id:data.detailSP.id}
                    }) 

                    if(sp)
                    {
                        
                        let temp = sp.sl_sp*1 - data.quantity*1  
                        if(temp > 0 )
                        {
                            sp.sl_sp = temp
                            await sp.save()

                        }
                        else
                        {
                            sp.sl_sp = 0
                            await sp.save()
                        }
                    }
                    
                    let tong = 0
                    if(tong > sp.slg_sp)
                    {
                        tong = giohang.soluong_sp
                    }
                    else
                    {
                        tong = giohang.soluong_sp*1 + data.quantity*1
                    }
                    console.log("tổng",tong)
                    if(giohang)
                    {
                        giohang.soluong_sp = tong
                        giohang.thanhtien = sp.gia * giohang.soluong_sp
                        await giohang.save();
                    } 
                    

                }
                else
                {
                    let createGH = await db.giohangs.create({
                        avt:data.detailSP.avt, 
                        ten_sp:data.detailSP.ten_sp,
                        gia_sp:data.detailSP.gia,
                        soluong_sp: data.quantity,
                        thanhtien: data.quantity * data.detailSP.gia,
                        id_sp:data.detailSP.id,
                        id_nguoidung: data.idUser
                    })
                    let sp = await db.sanphams.findOne({
                        where: {id:data.detailSP.id}
                    }) 
                    if(sp)
                    {
                        
                        let temp = sp.sl_sp*1 - data.quantity*1  
                        if(temp > 0 )
                        {
                            sp.sl_sp = temp
                            await sp.save()

                        }
                        else
                        {
                            sp.sl_sp = 0
                            await sp.save()
                        }
                    }

                     
                }
                resolve({
                    errCode: 0,
                    errMessage: "thành công",
                })   
            }catch(e)
            {
                reject(e)
            }
    })
}
let getGioHang = (idUser) =>
{
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",idUser)
        if(!idUser)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.giohangs.findAll({
                where:{id_nguoidung:idUser},
            })
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}


let checkNameSPGioHang = (id_sp) =>
{
    return new Promise(async(resolve, reject) => {
        try
        {   
            let name = await db.giohangs.findOne({
                where: {id_sp: id_sp}
            })
            // console.log("check danh sách giỏ hàng",name)
            if(name)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}
let getAllGioHang = () =>
{
    return new Promise(async (resolve, reject) => {
        try {
            
            let giohang = await db.giohangs.findAll();
            //console.log("avt", sp.avt)

            resolve({
                errCode: 0,
                data: giohang,
            });
            
        } catch (e) {
            reject(e);
        }
    })
}

let deletgiohang = (data) =>
{
    console.log(" check data ",data)
    return new Promise(async(resolve, reject) =>{
        
        let giohang = await db.giohangs.findOne({
             where: {id_sp: data.id_sp}
         })
        //  console.log("check id",data);
             if(!giohang)
             {
                 resolve({
                     errCode: 2,
                     errMessage: "không có sản phẩm này"
                 })
             }else{
                await db.giohangs.destroy({
                    where: {id_sp: data.id_sp}
                 });
                let sanpham = await db.sanphams.findOne({
                    where: {id: data.id_sp}
                })
    
                if(sanpham)
                {
                    sanpham.sl_sp = sanpham.sl_sp*1 + data.soluong_sp*1 
                    await sanpham.save()
                }
                    resolve({
                        errCode: 0,
                        errMessage: "thành công",
                        data
                    })
             }
              
             
    })
}

let bulkCreateThanhToan = (data) =>
{
    // console.log("check data",data)
    return new Promise ( async (resolve, reject)=>
    {
        try{
            if(!data)
            {
                resolve({
                    errCode: 1,
                    errMessage: "Chưa truyền tham số"
                })
            }
            else
            {
                let thanhtoan = await db.donhangs.create({
                    ngaydathang: Date.now(),
                    // ngaygiaohang:ngaygiaohang,
                    // dc_gh:dc_gh,
                    ma_nguoidung:data.ma_nguoidung,
                    tongtien:data.tongtien,
                    trangthai: "DH1",
                    // ma_nhanvien:data.ma_nhanvien
                })     
                let temp = data.giohang;
                console.log('check temp đầu',temp)
                if(temp && temp.length>0)
                {
                        temp = temp.map(item =>{
                        item.avt = new Buffer(item.avt, 'base64').toString('binary');
                        item.ma_donhang = thanhtoan.id
                        return item;
                    })
                    console.log("check data don hang",temp)

                    await db.chitietdonhangs.bulkCreate(temp);
                    resolve({
                        errCode: 0,
                        errMessage: "Thành Công"
                    })
                }
                await db.giohangs.destroy({
                    where: {id_nguoidung: data.idUser}
                });
            }
            
        }catch(e)
        {
            reject(e)
        }
    })
}
let getTrangThai = () =>
{
    return new Promise(async (resolve, reject) => {
        try {
            
            let trangthai = await db.allCode.findAll({
                where : {type : "ORDERS"}
            });
            //console.log("avt", sp.avt)

            resolve({
                errCode: 0,
                data: trangthai,
            });
            
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDonHang = () =>
{
    return new Promise(async (resolve, reject) => {
        try {
            
            let donhang = await db.donhangs.findAll({
                include: [
                        {   
                            model: db.allCode, attributes: ['keyMap']
                        },
                ],   
                raw: false,
                nest: true     
            });
            //console.log("avt", sp.avt)

            resolve({
                errCode: 0,
                data: donhang,
            });
            
        } catch (e) {
            reject(e);
        }
    })
}
module.exports={
    getTopDTHomeService:getTopDTHomeService,
    getAllSP:getAllSP,
    saveSP:saveSP,
    getChitietSP:getChitietSP,
    getAllSanPham:getAllSanPham,
    GetAllLoaiSanPham:GetAllLoaiSanPham,
    CreateNewSanPham:CreateNewSanPham,
    getDetailSanPham:getDetailSanPham,
    CreateNewLoaiSanPham:CreateNewLoaiSanPham,
    checkNameDMSanPham:checkNameDMSanPham,
    CreateNewDMSanPham:CreateNewDMSanPham,
    updateSanPham:updateSanPham,
    deleteSanPham:deleteSanPham,
    GetAllDanhMuc:GetAllDanhMuc,
    updateDanhMuc:updateDanhMuc,
    deleteDanhMuc:deleteDanhMuc,
    getDetailDanhMuc:getDetailDanhMuc,
    updateLoaiSP:updateLoaiSP,
    deleteLoaiSP:deleteLoaiSP,
    getDetailLoaiSP:getDetailLoaiSP,
    search_loaispService:search_loaispService,
    getdsloaidm:getdsloaidm,
    CreateNewGioHang:CreateNewGioHang,
    getGioHang:getGioHang,
    checkNameSPGioHang:checkNameSPGioHang,
    getAllGioHang:getAllGioHang,
    deletgiohang:deletgiohang,
    bulkCreateThanhToan:bulkCreateThanhToan,
    getTrangThai: getTrangThai,
    getAllDonHang:getAllDonHang
}