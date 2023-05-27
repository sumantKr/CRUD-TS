import { HttpStatusCode } from "axios";
import HttpException from "../../../exceptions/HttpException";


export class UserAlreadyExistsException extends HttpException{
    constructor(email:string){
        super(HttpStatusCode.NotFound,`User with email: ${email} already exists!`)
    }
}
export class NoUserFoundException extends HttpException{
    constructor(email:string){
        super(HttpStatusCode.NotFound,`User with email: ${email} does not exists! Please Register`)
    }
}
export class WrongCredentialsException extends HttpException{
    constructor(){
        super(HttpStatusCode.NotFound,`Incorrect Credentials. Please Try Again!`)
    }
}

