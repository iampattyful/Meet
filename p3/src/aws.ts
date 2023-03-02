import { S3Client } from "@aws-sdk/client-s3";

let AWS_REGION_NAME = "us-west-1";

const config = {
  region: AWS_REGION_NAME,
};

const s3Client = new S3Client(config);
export { s3Client };
