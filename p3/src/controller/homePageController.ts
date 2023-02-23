import express from "express";
import { errorHandler } from "../error";
import { HomeRoutes } from "../routes/routes";
import { homeService } from "../service/homeService"

export class HomePageController extends HomeRoutes {
  homeService: any;
  constructor() {
    super();
  }
  async homePageImage(req: express.Request, res: express.Response) {
    try {
      const homePageImage = await homeService.homePageImage();
      res.status(200).json({ homePageImage: homePageImage });
    } catch (err: any) {
      errorHandler(err, req, res);
    }
  }
  async likeUser(req:express.Request,res:express.Response){
    try{
        const likeUser = await this.

    }catch(err:any){
        errorHandler(err,req,res)
    }
  }
}
