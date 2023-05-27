import { NextFunction,Request,Response } from "express";
import HttpException from "../exceptions/HttpException";
import { HttpStatusCode, } from "axios";


function errorMiddleware(error: HttpException,request: Request, response:Response,next:NextFunction){
    const status = error.status ||  HttpStatusCode.InternalServerError;
    const message = error.message || "Something went wrong";
    return response
    .status(status)
    .send({
        status,message
    })
}


export default errorMiddleware;