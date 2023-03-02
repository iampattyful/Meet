import express from "express";
import { errorHandler } from "../error";
// import { hashPassword } from "../hash";
import { formidablePromise } from "../helper/helper";
import { User } from "../model";
import { UserRoutes } from "../routes/routes";
import { userService } from "../service/userService";
// import { env_config } from "../env";
// import AWS from "aws-sdk";
// import * as fs from "fs";
<<<<<<< HEAD
import * as path from "path";
=======
// import * as path from "path";
>>>>>>> 4036f34a24fdcd8ba484256f8822b05526301f35

export class UserController extends UserRoutes {
  constructor() {
    super();
  }
  async getCurrentUser(req: express.Request, res: express.Response) {
    try {
      let id = req.session.userId!;
      console.log(id);
      let user = await userService.getCurrentUser(id);
      let obj = { ...user, isLogin: true };
      res.status(200).json({
        data: obj,
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
  async login(req: express.Request, res: express.Response) {
    try {
      let formResult = (await formidablePromise(req)) as User;
      let usersRows = await userService.login(formResult);
      req.session.isLogin = true;
      req.session.userId = usersRows.id;

      res.status(200).json({
        data: { isLogin: true, userId: usersRows.id },
        isErr: false,
        errMess: null,
      });
      // res.status(200).redirect("/index.html");
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
  async logout(req: express.Request, res: express.Response) {
    try {
      delete req.session.isLogin;
      delete req.session.userId;
      res.status(200).json({
        data: { isLogin: false },
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }

  async enroll(req: express.Request, res: express.Response) {
    try {
      // let user = (await formidablePromise(req)) as User;
      // user.password = await hashPassword(user.password!);
      // console.log(user);
      req.session.isLogin = true;
      // req.session.userId = user.id;
      // s3 logic below
<<<<<<< HEAD
      // const s3 = new AWS
      // .S3({
      //   accessKeyId: env_config.AWS_S3_ACCESS_KEY_ID,
      //   secretAccessKey: env_config.AWS_S3_SECRET_ACCESS_KEY,
      // });
      // const filename = user.user_icon as string;
      let imagePath = path.join(__dirname, "..", "..", "uploads", "test.jpg");
      console.log(imagePath);
      // const blob = fs.readFileSync(imagePath);
      // const uploadedImage = await s3
      // .upload({
      //   Bucket: env_config.AWS_S3_BUCKET_NAME,
      //   Key: "test.jpg",
      //   Body: blob,
      // })
=======
      // const s3 = new AWS.S3({
      //   accessKeyId: env_config.AWS_S3_ACCESS_KEY_ID,
      //   secretAccessKey: env_config.AWS_S3_SECRET_ACCESS_KEY,
      // });
      // // const filename = user.user_icon as string;
      // let imagePath = path.join(__dirname, "..", "..", "uploads", "test.jpg");
      // console.log(imagePath);
      // const blob = fs.readFileSync(imagePath);
      // const uploadedImage = await s3
      //   .upload({
      //     Bucket: env_config.AWS_S3_BUCKET_NAME,
      //     Key: "test.jpg",
      //     Body: blob,
      //   })
>>>>>>> 4036f34a24fdcd8ba484256f8822b05526301f35
      //   .promise();
      // console.log(uploadedImage.Location);
      res.status(200).json({
        data: { isLogin: true },
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
}
