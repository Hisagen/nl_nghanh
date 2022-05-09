const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

////////////////////////////////////////////////////////////////////////////// Loại Sản Phẩm
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




module.exports={
    //loại sản phẩm
    GetAllLoaiSanPham:GetAllLoaiSanPham,
    CreateNewLoaiSanPham:CreateNewLoaiSanPham,
    updateLoaiSP:updateLoaiSP,
    deleteLoaiSP:deleteLoaiSP,
    getDetailLoaiSP:getDetailLoaiSP,
    search_loaispService:search_loaispService,
}