import {MemoRoutes} from '../routes/routes'
import express from "express";
import { formidable_promise, transfer_formidable_into_obj } from '../helper/helper';
import { errorHandler } from '../error';

import { memoService } from '../service/memoService';

export class MemoController extends MemoRoutes{
    constructor(){
        super()
    }    
    async addMemo (req:express.Request,res:express.Response){
        try {
            
            let obj: any = await formidable_promise(req)
            obj = await transfer_formidable_into_obj(obj)
            let userId = req.session.userId!
            let query_result = await memoService.addMemo(obj,userId)            
        
            if (query_result.length > 0) {
        
              res.json({
                data:query_result,
                isErr:false,
                errMess:null
              })    
              
        
            } else {
              
              throw new Error("cannot add memo")
            }
        
          } catch (err) {
            
            errorHandler(err,req,res)
          }
        
    }
    async delMemo(req:express.Request,res:express.Response){
        try{
            let id = parseInt(req.params.id)
            let userId = req.session.userId!
            await memoService.delMemo(id,userId)
        
        
        
            res.json({
              isErr:false,
              data:null,
              errMess:null
            })
          }catch(err){
            errorHandler(err,req,res)
          }
    }
    async likeMemo(req:express.Request,res:express.Response){
        try{
            let id = parseInt(req.params.id)
            let userId = req.session.userId!
            await memoService.likeMemo(id,userId)
            
            res.json({
                isErr:false,
                data:null,
                errMess:null
            })
            
        
        
          }catch(err){
            
            errorHandler(err,req,res)
          }
    }
    async editMemo(req:express.Request,res:express.Response){
        try {
            
            let obj: any = await formidable_promise(req)
            obj = await transfer_formidable_into_obj(obj)
            
            
            let id = parseInt(req.params.id)
            let userId = req.session.userId!

            await memoService.editMemo(obj,id,userId)
            // db.query(`UPDATE memo SET ${sql_params} WHERE id=$1 AND users_id!=$3 AND id NOT IN (SELECT memo_id FROM like_memo WHERE users_id = $4)`,sql_values)
            // # sql_params = content=$1,image=$2
        
            
            res.json({
              isErr:false,
              data:null,
              errMess:null
            })
          } catch (err) {
            errorHandler(err,req,res)
          }
    }
    async getMemo (req:express.Request,res:express.Response){
      
        try {
          
            let query_result = await memoService.getMemo()
            if (query_result.length > 0) {
              res.json({
                isErr:false,
                data:query_result,
                errMess:null,
              })
            } else {
              throw new Error("no memos found")
            }
          } catch (err) {
            errorHandler(err,req,res)
          }
          
    }


}    