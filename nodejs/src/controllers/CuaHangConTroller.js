import res from "express/lib/response";
import CuaHangservice from "../services/CuaHangservice"

let CreateNewCuaHang = async (req, res) =>
{
    try {
        
        let response = await CuaHangservice.CreateNewCuaHang(req.body);
        //console.log('sin', response);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getAllCuaHang = async (req, res) =>
{
    try {
        
        let response = await CuaHangservice.getAllCuaHang(req.query.idCuaHang);
        console.log('sin', response);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}



let updateCuaHang = async (req, res) =>
{
    try {
        
        let response = await CuaHangservice.updateCuaHang(req.body);
        console.log('sin', response);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}



module.exports={
    CreateNewCuaHang:CreateNewCuaHang,
    getAllCuaHang:getAllCuaHang,
    updateCuaHang:updateCuaHang,
}