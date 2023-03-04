import fs from "fs";
// import {db} from '../db'
import express from "express";
import formidable from "formidable";
import { FormResult } from "../model";

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 10 * 1024 * 1024,
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});

export function formidablePromise(req: express.Request) {
  return new Promise((resolve, reject) => {
    form.on("error", (err) => {
      console.log(err.message);
    });
    form.parse(req, (err, fields, files) => {
      if ({ err }.err !== null) {
        reject({ err });
      }
      if (
        JSON.stringify({ files }.files) !== "{}" &&
        JSON.stringify({ fields }.fields) !== "{}"
      ) {
        // formidable exist file && formidable exist fields
        resolve(transferFormidableIntoObj({ fields, files }));
      } else if (JSON.stringify({ fields }.fields) !== "{}") {
        // formidable does not exist file but exist fields
        resolve(transferFormidableIntoObj({ fields }));
      } else if (JSON.stringify({ files }.files) !== "{}") {
        // formidable does not exist fields but exist file
        resolve(transferFormidableIntoObj({ files }));
      }
    });
  });
}

function transferFormidableIntoObj(form_result: FormResult) {
  let result = {};

  if (form_result.hasOwnProperty("fields")) {
    result = Object.assign(result, form_result.fields);
  }
  if (form_result.hasOwnProperty("files")) {
    let obj = {};
    let files = form_result.files;
    for (let k in files) {
      // console.log(files[k].newFilename)
      // console.log(k)
      Object.assign(obj, { [`${k}`]: files[k].newFilename });
    }
    result = Object.assign(result, obj);
  }
  return result;
}

export function checkExt(filename: string) {
  let ext = filename.split(".")[1].toLowerCase();

  switch (ext) {
    case "jpg":
      return "image";
    case "jpeg":
      return "image";
    case "gif":
      return "image";
    case "bmp":
      return "image";
    case "png":
      return "image";
    case "m4v":
      return "video";
    case "avi":
      return "video";
    case "mpg":
      return "video";
    case "mp4":
      return "video";

    default:
      throw new Error("file extension not correct");
  }
}
