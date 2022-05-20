import axios from "../axios";
 

const createNewCuaHangService = (data) =>
{
    return axios.post('/api/create-cuahang', data);
}

const getAllCuaHangService = (idCuaHang) =>
{
    return axios.get(`/api/get-all-cuahang?idCuaHang=${idCuaHang}`)
}


const getUpdateCuaHangService = (data) =>
{
    return axios.post(`/api/update-cuahang`, data)
}


export {
    createNewCuaHangService,
    getAllCuaHangService,
    getUpdateCuaHangService
}