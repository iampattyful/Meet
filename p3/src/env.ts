import { config } from "dotenv";
import populateEnv from "populate-env";
import path from "path";
let p = path.join(__dirname, "..", ".env");
// const p = `C:\\Users\\Patty\\Documents\\tecky\\p3\\p3\.env`;
config({ path: p });

export const env_config = {
  PORT:8080,

  POSTGRES_DB: "",
  POSTGRES_USER: "",
  POSTGRES_PASSWORD: "",
  DB_HOST: "",
  DB_PORT: 5432,
  KNEX_ENV: "",
  POSTGRES_DB_TEST: "",
  POSTGRES_USER_TEST: "",
  POSTGRES_PASSWORD_TEST: "",
  AWS_S3_ACCESS_KEY_ID: "",
  AWS_S3_SECRET_ACCESS_KEY: "",
  AWS_S3_BUCKET_NAME: "",
};

populateEnv(env_config, { mode: "halt" });
console.log(env_config);
