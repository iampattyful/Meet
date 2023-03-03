import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
let AWS_REGION_NAME = "us-west-1";

const config = {
  region: AWS_REGION_NAME,
};

const s3Client = new S3Client(config);
export { s3Client };



export async function uploadFace(params: any): Promise<any> {
  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log(
      "successfully created " +
        params.Key +
        " and uploaded to " +
        params.Bucket +
        "/" +
        params.Key
    );
    return;
  } catch (err) {
    throw new Error('upload S3 fail')
  }
}

export const findMimeType = (ext: string) => {
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


