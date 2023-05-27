import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import catchAsync from "../../middleware/catchAsync";
import IController from "../../types/Controller.type";
import IUserRequest from "./User.interface";
import postModel from "../Post/model/Post.model";
import { StatusCodes } from "http-status-codes";
import HttpException from "../../exceptions/HttpException";
import AuthMiddleware from "../../middleware/auth.middleware";



export class UserController implements IController{
    public path: string="/user";
    public router: Router =Router();
    private post = postModel;
    
    constructor(){
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.get(`${this.path}/:id/posts`,catchAsync(authMiddleware),catchAsync(this.getAllPostsOfUser.bind(this)))
    }
    private async getAllPostsOfUser(request : IUserRequest , response : Response,next: NextFunction){
        const userId =request.params.id;
        if(userId === request.user?._id.toString()){
            const posts = await this.post.find({author:userId});
            response.status(StatusCodes.OK).send(posts);
        }
        else{
            throw new HttpException(StatusCodes.UNAUTHORIZED,"Unauthorized");
        }
    }
}