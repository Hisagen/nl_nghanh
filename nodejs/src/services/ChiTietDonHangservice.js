
const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);



///////////////////////////////////////////////////////////////////////////////////// chi tiết đơn hàng
let getChiTietDonHang = (id_donhang) =>
{
    // console.log("check id_donhang", id_donhang)
    return new Promise(async (resolve, reject) => {   
        // console.log("check id",idUser)
        if(!id_donhang)
        {
            resolve({
                errCode: 1,
                errMessage: "missing require!"
            })
        }
        else
        {
            let data = await db.chitietdonhangs.findAll({
                where:{ma_donhang:id_donhang},
            })
            // console.log("check data.avt",data.avt)
            // if(data.avt)
            // {
            //     data.avt = new Buffer(data.avt, 'base64').toString('binary');
            // }
            resolve({
                errCode: 0,
                data: data
            });
        }

    })
}


module.exports={
    // chi tiết đơn hàng
    getChiTietDonHang:getChiTietDonHang
}