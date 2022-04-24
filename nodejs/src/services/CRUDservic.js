const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) =>
{
    return new Promise( async (resolve, reject) =>{
        try{
            let hashPasswordFromBcrypt =  await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.ten,
                lastName: data.ho,
                password: hashPasswordFromBcrypt,
                email: data.email,
                address: data.diachi,
                gender: data.gioitinh === '1' ? true : false,
                typeRole: data.chucvu,
                // keyRole: DataTypes.STRING,
            })

            resolve("thành công");
        }catch(e)
        {
            reject(e);
        }
    }
    )
    
    // console.log("data from service");
    // console.log(data);
    // console.log(hashPasswordFromBcrypt);
}

let hashUserPassword = (password) =>
{
    return new Promise( async (resolve, reject) =>
    {
        try{
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e) {
            reject(e);
        }
    })
}

let getAllUser = () =>
{
    return new Promise( async (resolve, reject) => {
        try{
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        }catch(e)
        {
            reject(e);
        }
    })
}

let getUserInfoById = (userID) =>
{
    return new Promise(async(resolve, request) => {
        try{
            let user = await db.User.findOne({
                where: {id: userID},
                raw : true,
            })

            if(user)
            {
                resolve(user);
            }else
            {
                resolve([]);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}

let updateUserData = (data) =>{
    return new Promise( async (resolve, reject) =>
    {
        try{
            let user = await db.User.findOne({
                where: {id: data.id}
                
            })
            //await db.User.update({
                //console.log(user)
          //  })
            if(user)
            {
                user.lastName = data.ho;
                user.firstName = data.ten;
                user.address = data.diachi;

                await user.save();

                let allUser = await db.User.findAll();
                resolve(allUser);
            }else{
                resolve();
            }
        }catch(e)
        {
            console.log(e);
        }

    })
}   
let deleteUserById = (userID) =>
{
    return new Promise(async(resolve, reject) => {
        try{

            let user = await db.User.findOne({
                where: {id : userID}
                //raw : true,
            })

            if(user)
            {
                //console.log(user)
                await user.destroy();   
               //   let allUser = await db.User.findAll();
            }
            resolve(); // giup thoat ham
        }catch(e)
        {
            reject(e);
        }
    })
}

module.exports={
    createNewUser : createNewUser,
    getAllUser : getAllUser,
    getUserInfoById : getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}