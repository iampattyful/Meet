import express from "express"
import { errorHandler } from "../error"
import { formidable_promise , transfer_formidable_into_obj } from "../helper/helper"
import { formResult } from "../model"
import { UserRoutes } from "../routes/route"
import { userService } from "../service/userService"



export class UserController extends UserRoutes{
    constructor(){
        super()
    }
    async login(req:express.Request,res:express.Response){
        try{
            let obj= await formidable_promise(req) as formResult
            obj = await transfer_formidable_into_obj(obj)
            let usersRows = await userService.login(obj)

            if (usersRows){
                req.session.isLogin = true
                req.session.userId = usersRows[0].id
                res.json({
                    data:req.session,
                    isErr:false,
                    errMess:null
                })
            }
        }catch(err){
            errorHandler(err,req,res)
        }
    }
}
