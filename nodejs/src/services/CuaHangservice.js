const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);

let checkname = (email1) =>
{
    return new Promise(async(resolve, reject) => {
        try
        {   
            let cuahang = await db.User.findOne({
                where: {email: email1}
            })
            if(cuahang)
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

let getAllCuaHang = (idCuaHang) =>
{
    console.log("check idCuaHang", idCuaHang)
    return new Promise(async(resolve, reject) => {
        try{
            if(idCuaHang === 'ALL')
            {
                let cuahang = await db.User.findAll({
                    where: {typeRole: "R3"},
                    attributes:{
                        exclude: 'password',
                    },
                    include: [
                        {   
                            model: db.cuahangs, attributes: ['storeName']
                        },
                    ],
                    raw: false,
                    nest: true
                })
            resolve(
                cuahang = cuahang
            );

            }
            if(idCuaHang !== 'ALL')
            {
                let cuahang = await db.User.findOne({
                    where: {id:idCuaHang},
                    attributes:{
                        exclude: 'password',
                    },
                    include: [
                        {   
                            model: db.cuahangs, attributes: ['storeName']
                        },
                    ],
                })
            resolve(
                    // errCode =0,
                    cuahang = cuahang
                    );
            }
        }catch(e)
        {
            reject(e);
        }
    })
}


 let CreateNewCuaHang =  (data) =>
{
    return new Promise( async(resolve, reject) =>
    {
        try{
            
            let check = await checkname(data.email);
            console.log(check);
            if(check === true)
            {
                resolve({
                    errCode: 1,
                    errMessage: "email da ton tai! vui long nhap email khac"
                })
            }
            else
            {
                let hashPasswordFromBcrypt =  await hashUserPassword(data.password);
                console.log("check hash",hashPasswordFromBcrypt)
                let user = await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashPasswordFromBcrypt,
                email: data.email,
                address: data.address,
                sdt: data.sdt,
                gender: data.gender,
                typeRole: "R3",
                avt: data.avt
                })
                await db.diachicuahangs.create({
                    address: data.address,
                    ma_ch: user.id
                })
                await db.cuahangs.create({
                    storeName: data.storeName,
                    idCuahang: user.id
                })
                resolve({
                    errCode: 0,
                    errMessage: "thanh cong"
                })
            }
            
        }catch(e)
            {
                reject(e)
            }
    })
}



let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            console.log('hash password', hashPassword)
            resolve(hashPassword);
        }catch(e) {
            reject(e);
        }
    })
}
let deleteCuaHang = (id) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundUser = await db.User.findOne({
            where: {id: id}
        })
        console.log(foundUser);
            if(!foundUser)
            {
                resolve({
                    errCode: 2,
                        errMessage: "không có người dùng này"
                })
            }
             
            await db.User.destroy({
                where: {id: id}
            });
            resolve({
                errCode: 0,
                    errMessage: "thành công"
            })
    })
}

let updateCuaHang = (data) =>
{
    return new Promise(async(resolve, reject) =>
    {
        //console.log("check data",data);
        try{
            if(!data.id || !data.typeRole || !data.gender)
            {
                //console.log(data);
                resolve({
                    errCode: 2,
                    errMessage: "khong nhan duoc id"
                })
            }
           
             let user = await db.User.findOne({
                where: {id: data.id},
                //raw: false
                })
                console.log(user);
                if(user)
                {
                    user.lastName = data.lastName,
                    user.firstName = data.firstName,
                    user.address = data.address,
                    user.email = data.email,
                    user.sdt = data.sdt,
                    user.typeRole = data.typeRole,
                    user.gender = data.gender;
                    if(data.avt){
                        user.avt = data.avt;
                    }
                    await user.save();
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
// bài viết
    checkname:checkname,
    getAllCuaHang:getAllCuaHang,
    CreateNewCuaHang:CreateNewCuaHang,
    // deleteCuaHang:deleteCuaHang,
    updateCuaHang:updateCuaHang,
}