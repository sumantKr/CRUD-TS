import { Request } from "express";

export interface User {
    _id:string
    name: string
    email: string
    password: string,
    twoFactorAuthenticationCode:string,
    isTwoFactorAuthenticationEnabled:boolean
}
interface IUserRequest extends Request{
    user:User,
} 

export default IUserRequest;

