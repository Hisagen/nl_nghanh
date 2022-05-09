const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

///////////////////////////////////////////////////////////////////////////////////// trạng thái đơn hàng
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
let getTrangThaiDonHang = (id) =>
{
    return new Promise(async (resolve, reject) => {
        try {
            
            let donhang = await db.donhangs.findOne({
                where : {id : id}
            });
            //console.log("avt", sp.avt)

            resolve({
                errCode: 0,
                data: donhang.trangthai,
            });
            
        } catch (e) {
            reject(e);
        }
    })
}

let saveTTDH = (data) =>
{
    return new Promise(async(resolve, reject) =>
    {
        console.log("check data đơn hàng",data);
        try{
            if(!data.id)
            {
                //console.log(data);
                resolve({
                    errCode: 2,
                    errMessage: "khong nhan duoc id"
                })
            }
           
             let donhang = await db.donhangs.findOne({
                where: {id: data.id},
                //raw: false
                })
                // console.log("check donhang",donhang);
                if(donhang)
                {
                    donhang.trangthai = data.tt;
                    await donhang.save();
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


module.exports={
    // trạng thái đơn hàng
    getTrangThai: getTrangThai,
    saveTTDH:saveTTDH,
    getTrangThaiDonHang:getTrangThaiDonHang

}