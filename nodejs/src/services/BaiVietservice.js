const { reject, promise } = require("bcrypt/promises");
import bcrypt from "bcryptjs";
import { request } from "express";
import db from "../models/index"

const salt = bcrypt.genSaltSync(10);



///////////////////////////////////////////////////////////////////////////////// bài viết
let getALLMarkdown = (id) =>
{   
    return new Promise(async (resolve, reject) => {
        try {
            if(id == "ALL")
            {
                let Markdown = await db.Markdown.findAll();
                resolve({
                    errCode: 0,
                    data: Markdown,
                });
            }
            else
            {
                let Markdown = await db.Markdown.findOne({
                    where : {SPId: id}
                });
                //console.log("avt", sp.avt)
    
                resolve({
                    errCode: 0,
                    data: Markdown,
                });
            }
            resolve({
                errCode: 1,
                codeMessage: "chưa có id",
            }); 
        } catch (e) {
            reject(e);
        }
    })
}

module.exports={
// bài viết
getALLMarkdown:getALLMarkdown,

}