import { cleanEnv,str } from "envalid";
import { port } from "envalid/dist/validators";



export function validateEnv():void{
    cleanEnv(process.env,{
        API_ENDPOINT:str(),
        PORT:port(),
        MONGO_PATH:str(),
        JWT_SECRET:str(),
        JWT_REFRESH_SECRET:str(),
        TWO_FA_APP_NAME:str()
    })
}