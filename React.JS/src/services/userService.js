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
}