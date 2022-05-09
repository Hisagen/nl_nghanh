const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);



////////////////////////////////////////////////////////////////////////////////// địa chỉ user
let getDiaChiFromUser = (idUser) =>
{
    return new Promise(async (resolve, reject) => {
        try {
            if(idUser == "ALL")
            {
                let diachi = await db.diachis.findAll();
                resolve({
                    errCode: 0,
                    data: diachi,
                });
            }
            else
            {
                let diachi = await db.diachis.findAll({
                    where : {ma_kh: idUser}
                });
                //console.log("avt", sp.avt)
    
                resolve({
                    errCode: 0,
                    data: diachi,
                });
            }
            resolve({
                errCode: 1,
                codeMessage: "chưa có id",
            });

            
            
        } catch (e) {
            reject(e);
        }
    })
}


module.exports={
    // địa chỉ
    getDiaChiFromUser:getDiaChiFromUser,
    }