//const { reject, promise } = require("bcrypt/promises");
 import  db from "../models/index";
 import bcrypt from "bcryptjs";
 
 const { reject, promise } = require("bcrypt/promises")

 const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) =>
{
    return new Promise(async(resolve, reject) =>{
        try{
            let userData = {}
            let isExit = await checkUsername(email);
            if(isExit)
            {
                
                let user = await db.User.findOne({
                    where: {email:email},
                    attributes: ['id','email', 'password', 'firstName', 'lastName','gender','typeRole'],
                    raw: true,
                })
                if(user)
                {
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check)
                    {
                        userData.errCode = 0;
                        userData.errMessage = `thanh công`; 
                        delete user.password;
                        userData.user = user;
                    }
                    else
                    {
                        userData.errCode = 3;
                        userData.errMessage = `password không dung`; 
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `email không tồn tại`
                }
            }
            else
            {    
                 userData.errCode = 1;
                 userData.errMessage = `Your's Email isn't exist in your system`
            }
            resolve(userData);
        }catch(e)
        {
            reject(e)
        }
    })
}

let checkUsername = (email1) =>
{
    return new Promise(async(resolve, reject) => {
        try
        {   
            let user = await db.User.findOne({
                where: {email: email1}
            })
            if(user)
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

let getAllUsers = (usersId) =>
{
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
            if(usersId === 'ALL')
            {
                users = await db.User.findAll({
                    attributes:{
                        exclude: 'password',
                    }
                })
            }
            if(usersId !== 'ALL')
            {
                users = await db.User.findOne({
                    where: {id:usersId},
                    attributes:{
                        exclude: 'password',
                    }
                })
            }
            resolve(users);
        }catch(e)
        {
            reject(e);
        }
    })
}


 let CreateNewUser =  (data) =>
{
    return new Promise( async(resolve, reject) =>
    {
        try{
            
            let check = await checkUsername(data.email);
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
                await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashPasswordFromBcrypt,
                email: data.email,
                address: data.address,
                sdt: data.sdt,
                gender: data.gender,
                typeRole: data.typeRole,
                avt: data.avt
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
let deleteUser = (id) =>
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

let updateUser = (data) =>
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
let getAllCodeService = (typeInput) =>
{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!typeInput)
            {
                resolve({
                    errCode: 1,
                    errMessage: "Missing"
                })
            }
            else{
                let res = {};
                let allCode = await db.allCode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0,
                res.data = allCode;
                resolve(res);
            }
            
        }catch(e)
        {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin:handleUserLogin,
    //compareUserPassword:compareUserPassword,
    getAllUsers:getAllUsers,
    CreateNewUser:CreateNewUser,
    //createNewUser:createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getAllCodeService:getAllCodeService,
}