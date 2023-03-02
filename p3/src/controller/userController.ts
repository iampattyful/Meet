import express from "express";
import { errorHandler } from "../error";
import { hashPassword } from "../hash";
import { formidablePromise } from "../helper/helper";
import { User } from "../model";
import { UserRoutes } from "../routes/routes";
import { userService } from "../service/userService";
import { s3Client } from "../aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

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
      let user = (await formidablePromise(req)) as User;
      user.password = await hashPassword(user.password!);
      // console.log(user);
      req.session.isLogin = true;
      let result = await userService.enroll(user);
      // req.session.userId = user.id;

      //fetch python server

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

// s3 logic below
let BUCKET_NAME = "meet-tecky";
const findMimeType = (ext: string) => {
  if (ext === "jpeg") {
    return "image/jpeg";
  } else if (ext === "jpg") {
    return "image/jpg";
  } else if (ext === "png") {
    return "image/png";
  } else if (ext === "gif") {
    return "image/gif";
  } else if (ext === "svg") {
    return "image/svg+xml";
  } else {
    return "";
  }
};
const filename = path.join(
  process.cwd() /*, "..", ".."*/,
  "uploads",
  "test.jpg"
);
const ext: string = findMimeType(filename.split(".")[1]);
const fileContent = fs.readFileSync(filename);
console.log(fileContent, "fileContent");

const params = {
  Bucket: BUCKET_NAME,
  Key: "test.jpg",
  Body: fileContent,
  ContentType: ext,
};

async function uploadFace(/* params: paramsType */): Promise<any> {
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "successfully created " +
        params.Key +
        " and uploaded to " +
        params.Bucket +
        "/" +
        params.Key
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

uploadFace();
