const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);


///////////////////////////////////////////////////////////////////////////////////// đơn hàng
let bulkCreateThanhToan = (data) =>  ////////////// tạo đơn hàng và chi tiết đơn hàng
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
                    trangthai: "DH2",
                    dc_gh: data.addressNew
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
let getAllDonHang = () =>
{
    return new Promise(async (resolve, reject) => {
        try {
            
            let donhang = await db.donhangs.findAll({
                include: [
                    { model: db.allCode, as: 'trangthaiData', attributes: ['valueEn', 'valueVi'] },
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
    // bài viết
    bulkCreateThanhToan:bulkCreateThanhToan,
    getAllDonHang:getAllDonHang
    }