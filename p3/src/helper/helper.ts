import fs from "fs";
// import {db} from '../db'
import express from "express";
import formidable from "formidable";

type resultType = {
  sql_params: string;
  sql_values: any[];
  sql_field: string;
};

const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 25000000000, // the default limit is 200KB
  filter: (part) => true,
});
export function rm_last(str: string): string {
  return str.slice(0, -1);
}

export let transformer: (data: unknown[], method: string) => resultType = (
  data: unknown[],
  method: string
) => {
  let result: resultType = {
    sql_params: "",
    sql_values: [],
    sql_field: "",
  };

  let counter = 1;
  data.forEach((obj: any) => {
    let len = Object.keys(obj).length;

    for (let val of Object.values(obj)) {
      result.sql_values.push(val);
    }
    if (method === "insert") {
      result.sql_params =
        result.sql_params + `${add_param_insert(counter, len)}` + ",";
    } else if (method === "update") {
      result.sql_params =
        result.sql_params +
        `${add_param_update(counter, Object.keys(obj))}` +
        ",";
    }

    if (counter === 1) {
      result.sql_field = Object.keys(obj).reduce(
        (acc, cur) => acc + cur + ",",
        ""
      );
    }

    counter = counter + 1;
  });

  result.sql_params = rm_last(result.sql_params);
  result.sql_field = rm_last(result.sql_field);
  return result;
};

export let formidable_promise = (req: express.Request) => {
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
        resolve(transfer_formidable_into_obj({ fields, files }));
      } else if (JSON.stringify({ fields }.fields) !== "{}") {
        // formidable does not exist file but exist fields
        resolve(transfer_formidable_into_obj({ fields }));
      } else if (JSON.stringify({ files }.files) !== "{}") {
        // formidable does not exist fields but exist file
        resolve(transfer_formidable_into_obj({ files }));
      }
    });
  });
};
type formResult = {
  fields?: any;
  files?: any;
};
export function transfer_formidable_into_obj(form_result: formResult) {
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

function add_param_insert(counter: number, len: number): string {
  let str = "";
  str += "(";
  for (let i = 0; i < len; i++) {
    str = str + `$${counter}` + ",";
    counter = counter + 1;
  }
  str = rm_last(str);
  str += ")";
  return str;
}
function add_param_update(counter: number, arr: string[]): string {
  let str = "";

  for (let k of arr) {
    str = str + `${k}=$${counter}` + ",";
    counter = counter + 1;
  }
  str = rm_last(str);

  return str;
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
