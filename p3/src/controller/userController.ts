import {UserRoutes} from '../routes/routes'
import express from "express";
import { del_onlineUsers, formidable_promise, set_onlineUsers, transfer_formidable_into_obj } from '../helper/helper';
import { errorHandler } from '../error';

import {userService} from '../service/userService'
export class UserController extends UserRoutes{
    constructor(){
        super()
    }    
    async logout(req:express.Request,res:express.Response){
        try {
    
            if(req.session.userId){
              del_onlineUsers(req.session.userId)
            }
            delete req.session.isLogin
            delete req.session.userId
            
            res.json({
              isErr:false,
              errMess:null,
              data:{isLogin:false}
            })
          }catch(err){
            errorHandler(err,req,res)
          }
    }
    async login(req:express.Request,res:express.Response){
        try {
    
            let obj: any = await formidable_promise(req)
            obj = await transfer_formidable_into_obj(obj)
            let query_result = await userService.login(obj)
            
            
            
            
            if (query_result.length > 0) {
              req.session.isLogin = true
              req.session.userId = query_result[0].id
              
              set_onlineUsers(query_result[0].id,query_result[0].username)
              // onlineUsers.set(result.data.userId,result.data)
              
              res.json({
                data:{
                  isLogin:true,
                  userId:query_result[0].id,
                  username:query_result[0].username
                },
                isErr:false,
                errMess:null
              })    
            } else {
              throw new Error('Not existing this user')
            }
            
        
          } catch (err) {
            
            errorHandler(err,req,res)
          }
    }
    
    async getCurrentUser(req:express.Request,res:express.Response){
        try {
            let userId = req.session.userId!
            let query_result = await userService.getCurrentUser(userId)
            
            
            if (query_result.length > 0) {
              res.json({
                isErr:false,
                errMess:null,
                data:Object.assign(req.session, { 'username': query_result[0].username })
              })
            }else{
              throw new Error('Not exist this user')
            }
            
        
          } catch (err) {
            
            errorHandler(err,req,res)
            
        
          }
    }
}