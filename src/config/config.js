import  dotenv from "dotenv";

dotenv.config({
  path: `.env`,
});
const DB_URL=process.env.DB_URL
const DB_NAME=process.env.DB_NAME
const GITHUB_CLIENT_ID =process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const PORT = process.env.PORT
const GITHUB_CALLBACK_URL= process.env.GITHUB_CALLBACK_URL
const EMAIL= process.env.EMAIL
const PSW_EMAIL= process.env.PSW_EMAIL
export {DB_URL, DB_NAME,GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PORT, GITHUB_CALLBACK_URL, EMAIL, PSW_EMAIL}