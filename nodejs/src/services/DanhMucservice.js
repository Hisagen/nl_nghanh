const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);


//////////////////////////////////////////////////////////////////////////////// Danh Mục
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



module.exports={
    

    // danh mục sản phẩm
    checkNameDMSanPham:checkNameDMSanPham,
    CreateNewDMSanPham:CreateNewDMSanPham,
    GetAllDanhMuc:GetAllDanhMuc,
    updateDanhMuc:updateDanhMuc,
    deleteDanhMuc:deleteDanhMuc,
    getDetailDanhMuc:getDetailDanhMuc,
    getdsloaidm:getdsloaidm,

}