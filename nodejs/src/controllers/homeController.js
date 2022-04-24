import { reject } from "bcrypt/promises";
import db from "../models/index"
import CRUDservic from "../services/CRUDservic"
let getHomePage = async (req, res) => {

    try{
        let data = await db.Sanphams.findAll();
        console.log("-------------------");
        console.log(data);
        console.log("-------------------");
         return res.render('homePage.ejs', {
             data: JSON.stringify(data)
         });
    }catch(e)
    {
        console.log(e)
    }
    
} 

let getTest = (req ,res) => {
    return res.render('./test/about.ejs');
}

let getCRUD = async (req, res) =>
{
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) =>
{
    let message =  await CRUDservic.createNewUser(req.body);
    console.log(message);
    return res.send("post crud form server")
}

let displayGetCRUD  = async (req, res) =>
{
    let data = await CRUDservic.getAllUser();
    console.log("-------------------");
    console.log(data);
    console.log("-------------------");
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    })
}

let getEditCRUD = async (req, res) =>
{
    let userID = req.query.id
    console.log(userID);
    if(userID)
    {
        let userData = await CRUDservic.getUserInfoById(userID);
        
        //let userData
        return res.render('editCRUD.ejs', {
            userData: userData
        });
        
    }
    else
    {
        return res.send("User not found!");
    }
}
let putCRUD = async (req, res) =>
{
    let data = req.body;
    let allUser =  await CRUDservic.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUser,
    })
}

let deleteCRUD = async (req, res) =>
{
    let id = req.query.id
    //console.log(id);
    if(id)
    {
        await CRUDservic.deleteUserById(id);
        return res.send('thanh cong');
    }  
    else
    {
        return res.send('không');
    }
}
module.exports = {
    getHomePage: getHomePage,
    getTest: getTest,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}