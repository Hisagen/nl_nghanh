import axios from "../axios";
 

const handelLoginApi = (email, password) =>
{
    return axios.post('/api/login', {email: email, password: password});
}

const getAllUser = (inputId) =>
{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) =>
{
    console.log("check data", data)
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (userId) =>
{
    // return axios.delete(`/api/delete-user`, {id: userId})
    return axios.delete("/api/delete-user", {
        // headers: {

        // }
        data: {
            id: userId
        }
    })

}

const editUserService = (inputData) =>
{
    return axios.put("/api/edit-user", inputData)
}

const getAllCodeService = (inputType) =>
{
    return axios.get(`/api/allCode?type=${inputType}`)
}

const getTopDTHomeService = (limit) =>
{
    return axios.get(`/api/top_dt_home?limit=${limit}`)
}

const getAllSP = (data) =>
{
    return axios.get(`/api/get_all_sp`,data)
}

const saveInForSP = (data) =>
{
    return axios.post(`/api/save_sp`,data)
}

const getInfoDetailSP = (id) =>
{
    return axios.get(`/api/get_detail_sp?id=${id}`)
}

const createBinhLuan = (data) => {
    return axios.post(`/api/save-binh-luan`, data)
}

const getAllBinhLuan = (idSP) => {
    return axios.get(`/api/get_all_binhluan?id=${idSP}`)
}

const getAllBinhLuanAdmin = (idSP) => {
    return axios.get(`/api/get_all_binhluan_admin?id=${idSP}`)
}

const editActionBinhLuan = (Data) =>
{
    return axios.put("/api/edit-action-cmt", Data)
}

const createTraLoi = (data) => {
    return axios.post(`/api/save-tra-loi`, data)
}

const getAllTraLoi = (idSP, ma) => {
    return axios.get(`/api/get_all_TraLoi?id=${idSP}&MaBL=${ma}`)
}

const getAllTraLoiAdmin = (idSP, ma) => {
    return axios.get(`/api/get_all_TraLoi_admin?id=${idSP}&MaBL=${ma}`)
}
export {handelLoginApi, 
    getAllUser, 
    createNewUserService, 
    deleteUserService, 
    editUserService, 
    getAllCodeService, 
    getTopDTHomeService,
    getAllSP,
    saveInForSP,
    getInfoDetailSP,
    
    createBinhLuan,
    getAllBinhLuan,
    getAllBinhLuanAdmin,
    editActionBinhLuan,
    createTraLoi,
    getAllTraLoi,
    getAllTraLoiAdmin
}