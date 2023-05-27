import { HttpStatusCode } from "axios";
import HttpException from "../../../exceptions/HttpException";

class PostNotFoundException extends HttpException{
    constructor(id:string){
        super(HttpStatusCode.NotFound,`Post with id: ${id} not found`)
    }
}
export class PostWithIdAlreadyExists extends HttpException{
    constructor(id:number){
        super(HttpStatusCode.Conflict,`Post with id: ${id} already exists!`)
    }
}

export default PostNotFoundException;