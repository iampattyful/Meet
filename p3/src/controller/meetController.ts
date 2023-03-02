import express from "express";
import { errorHandler } from "../error";
import { MeetRouters } from "../routes/routes";
import { meetService } from "../service/meetService";

export class MeetController extends MeetRouters {
  constructor() {
    super();
  }

  // async mainPageImage(req: express.Request, res: express.Response) {
  //   try {
  //     let minAge = Date(req.params.date_of_birth);
  //     let maxAge = Date(req.params.date_of_birth)
  //     let homePageImage = await meetService.mainPageImage(minAge,maxAge);
  //     res.status(200).json({ homePageImage: homePageImage });
  //   } catch (err: any) {
  //     errorHandler(err, req, res);
  //   }
  // }

  async likeUser(req: express.Request, res: express.Response) {
    console.log(2);
    try {
      let fromUserId: any = req.session.userId;
      let toUserId: any = req.params.id;
      let liked = await meetService.likeUser(fromUserId, toUserId);
      res.status(200).json({
        data: liked,
        isErr: false,
        errMess: null,
      });
    } catch (err: any) {
      errorHandler(err, req, res);
    }
  }
  async userInformation(req: express.Request, res: express.Response) {
    try {
      // let fromUserId = Number(req.session.userId);
      let toUserId = Number(req.params.id);

      let result = await meetService.userInformation(/*fromUserId,*/ toUserId);
      res.status(200).json({
        data: result,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
}
