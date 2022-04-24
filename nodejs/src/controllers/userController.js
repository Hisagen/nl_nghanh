import res from "express/lib/response";
import userService from "../services/userServic";
let handleLogin = async (req, res) =>
{
    let email = req.body.email;
    console.log('email:' + email);
    let password = req.body.password;
    if(!email || !password)
    {
        return res.status(500).json({
            errCode : 1,
            message: 'nhập chưa đủ thông tin'
        })
    }
    let userData = await userService.handleUserLogin(email,password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) =>
{
    let id = req.query.id; //all, single
    console.log("id", id)
    if(!id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong co id nay",
            users: [],
        })
    }
    
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
    
}

let handleCreateNewUser = async (req, res) =>
{
    let message = await userService.CreateNewUser(req.body);
    console.log("check message", message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) =>
{
    let data = req.body;
    console.log(data);
    let message =  await userService.updateUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) =>
{
    if(!req.body.id)
    {
        return res.status(200).json({
            errCode: 1,
            errMessage: "khong"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCode = async(req, res) =>
{
    try{
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    }catch(e)
    {
        console.log("Get all code error:" ,e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}


module.exports={
    handleLogin:handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    //getDetailSP:getDetailSP
}