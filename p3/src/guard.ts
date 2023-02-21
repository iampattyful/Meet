import express from "express";
import { errorHandler } from "./error";

export const isLoggedInAPI = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    try {
        if (req.session.isLogin) {
            next();
        }else{
            // console.log(req.route.path)
            throw new Error('No permission to access this API')
        }    
    } catch (err) {
        // res.json({
        //     data:null,
        //     isErr:true,
        //     errMess:err.message
        // })
        errorHandler(err,req,res)
    }
    
  };