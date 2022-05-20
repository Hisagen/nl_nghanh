const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"
import emailService from './emailService'

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

let postChidinhAppointment = (data) => {
    console.log('dataa',data)
    return new Promise(async (resolve, reject) => {
        try {
            // if (!data.khunggio || !data.tenbacsi || !data.email || !data.phong || !data.chuyenkhoa
            //     || !data.ngay || !data.tenbenhnhan || !data.sdtbacsi || !data.ngay) {
            //     resolve({
            //         errCode: 1,
            //         errMessage: 'Missing parameter'
            //     });
            // } else {
            // let token = uuidv4();
            await emailService.sendSimpleEmail({
                reciverEmail: data.email,
                iddonhang: data. iddonhang,
                tongtien:data.tongtien,
                nguoidung:data.nguoidung,
                diachi:data.diachi,
                ten_sp:data.ten_sp,
                sdt: data.sdt,
                gia_sp:data.gia_sp,
                soluong_sp:data.soluong_sp,
                thanhtien:data.thanhtien,
                ten_sp1:data.ten_sp1,
                gia_sp1:data.gia_sp1,
                soluong_sp1:data.soluong_sp1,
                thanhtien1:data.thanhtien1,
                ngay:data.ngay,
                })
            // }
            resolve({
                errCode: 0,
                errMessage: 'save infor doctor succeed!'
            })
            // }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports={
    // bài viết
    bulkCreateThanhToan:bulkCreateThanhToan,
    getAllDonHang:getAllDonHang,
    postChidinhAppointment:postChidinhAppointment
    }