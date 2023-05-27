import dotenv from "dotenv";
import { validateEnv } from "../utils/validateEnv";
dotenv.config();
validateEnv();
export const PORT: string = process.env.PORT || "";
export const API_ENDPOINT: string = process.env.API_ENDPOINT || ""
export const MONGO_URL: string = process.env.MONGO_PATH || ""
export const JWT_SECRET: string = process.env.JWT_SECRET || ""
export const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || ""
export const TWO_FA_APP_NAME: string = process.env.TWO_FA_APP_NAME || "" 
