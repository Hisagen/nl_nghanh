const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

 /////////////////////////////////////////////////////////////// sản phẩm yêu thích
 let checkNameSPYeuThich = (id_sp) =>
 {
     return new Promise(async(resolve, reject) => {
         try
         {   
             let name = await db.yeuthichs.findOne({
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
 let getAllYeuThich = () =>
 {
     return new Promise(async (resolve, reject) => {
         try {
             
             let yeuthich = await db.yeuthichs.findAll({
                 include: [
                     { model: db.hinhsps, as: 'hinhsp', attributes: ['image1', 'image2','image3'] },
                     
                 ],
                 raw: false,
                 nest: true
             });
             //console.log("avt", sp.avt)
 
             resolve({
                 errCode: 0,
                 data: yeuthich,
             });
             
         } catch (e) {
             reject(e);
         }
     })
 }
 
 let CreateNewYeuThich = (data) =>
 {
     // console.log('check data',data)
     
     return new Promise( async(resolve, reject) =>
     {
         // if(data.detailSP.data.id)
         // {}
         let check = await checkNameSPYeuThich(data.sp.id)
         // console.log("check check", check)
         try{   
                 if(check === true)
                 {
                     resolve({
                         errCode: 1,
                         errMessage: "đã có",
                     })  
                 }
                 else
                 {
                     let createGH = await db.yeuthichs.create({
                         avt:data.sp.avt, 
                         ten_sp:data.sp.ten_sp,
                         gia_sp:data.sp.gia,
                         id_sp:data.sp.id,
                         id_nguoidung: data.idUser
                     })
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
 
 let deleteYeuThich = (data) =>
 {
     console.log(" check data ",data)
     return new Promise(async(resolve, reject) =>{
         
         let yeuthich = await db.yeuthichs.findOne({
              where: {id_nguoidung: data.id_nguoidung}
          })
         //  console.log("check id",data);
              if(!yeuthich)
              {
                  resolve({
                      errCode: 1,
                      errMessage: "yêu thích trống"
                  })
              }else{
                 await yeuthich.destroy({
                     where: {id_sp: data.id_sp}
                  });
                     resolve({
                         errCode: 0,
                         errMessage: "thành công",
                         data
                     })
              }
               
              
     })
 }


 module.exports={
    // bài viết
    getAllYeuThich:getAllYeuThich,
    checkNameSPYeuThich:checkNameSPYeuThich,
    CreateNewYeuThich:CreateNewYeuThich,
    deleteYeuThich:deleteYeuThich,
    }