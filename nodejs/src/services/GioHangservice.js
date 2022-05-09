const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

/////////////////////////////////////////////////////////////////////////////// Giỏ Hàng (bảng tạm)
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




module.exports={
   
    // Giỏ hàng (bảng tạm)
    CreateNewGioHang:CreateNewGioHang,
    getGioHang:getGioHang,
    checkNameSPGioHang:checkNameSPGioHang,
    getAllGioHang:getAllGioHang,
    deletgiohang:deletgiohang,
}