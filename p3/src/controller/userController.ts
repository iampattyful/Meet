import express from "express";
import { errorHandler } from "../error";
import { hashPassword } from "../hash";
import { formidablePromise } from "../helper/helper";
import { User } from "../model";
import { UserRoutes } from "../routes/routes";
import { userService } from "../service/userService";

// import fetch from "node-fetch";
import axios from "axios";
import fs from "fs";
import path from "path";
import { findMimeType, uploadFace } from "../aws";

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
      console.log(user);

      //fetch python server
      const filename = path.join(
        process.cwd() /*, "..", ".."*/,
        "uploads",
        user.user_icon!
      );
      const mimeType: string = findMimeType(filename.split(".")[1]);
      const fileContent = fs.readFileSync(filename);
      console.log(fileContent, "fileContent");
      // s3 logic below
      let BUCKET_NAME = "meet-tecky";
      const params = {
        Bucket: BUCKET_NAME,
        Key: user.user_icon,
        Body: fileContent,
        ContentType: mimeType,
      };
      await uploadFace(params);

      // node fetch python
      // let py_res = await fetch("http://localhost:8000", {
      //   method: "POST",
      //   body: JSON.stringify(filename),
      //   headers: { "Content-Type": "application/json" },
      // });
      // let py_res_json = await py_res.json();
      // console.log(py_res_json, "py_res_json");

      let py_res = await axios.post("https://ai.clsfei.link/face_detection", {
        filename: user.user_icon,
      });

      let py_res_json = py_res.data;

      console.log({py_res_json})

      if (!(py_res_json as  { isFace : boolean}).isFace) {
        throw new Error("Face not detected");
      }

      let userId = await userService.enroll(user);
      req.session.isLogin = true;
      req.session.userId = Number(userId);

      res.status(200).json({
        data: { isLogin: true, userId: userId},
        isErr: false,
        errMess: null,
      });
    } catch (err) {
      errorHandler(err, req, res);
    }
  }
}
<<<<<<< HEAD

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

console.log(params);

// async function uploadFace(/* params: paramsType */): Promise<any> {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(params));
//     console.log(
//       "successfully created " +
//         params.Key +
//         " and uploaded to " +
//         params.Bucket +
//         "/" +
//         params.Key
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// }

// uploadFace();
=======
>>>>>>> 8cac2fa34b68815e2bb107be964e46619b04a02d
