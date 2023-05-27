import { HttpStatusCode } from "axios";
import { Response, Router } from "express";
import HttpException from "../../exceptions/HttpException";
import authMiddleware from "../../middleware/auth.middleware";
import catchAsync from "../../middleware/catchAsync";
import validationMiddleware from "../../middleware/validation.middleware";
import IController from "../../types/Controller.type";
import IUserRequest from "../User/User.interface";
import CreatePostDto from "./model/Post.dto";
import { Post } from "./Post.interface";
import postModel from "./model/Post.model";
import PostNotFoundException, { PostWithIdAlreadyExists } from "./exceptions/Post.exceptions";
class PostController implements IController {
    public path = "/post";
    public router = Router();
    private post = postModel;
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .get(this.path, catchAsync(authMiddleware), catchAsync(this.getAllPosts.bind(this)))
            // .get(`${this.path}/:id`, catchAsync(this.getPostById.bind(this)))
            .get(`${this.path}/postttt`, catchAsync(authMiddleware), catchAsync(this.getPostOfCurrentUser.bind(this)))
            .patch(`${this.path}/:id`, catchAsync(authMiddleware), validationMiddleware(CreatePostDto, true), catchAsync(this.updatePost.bind(this)))
            .delete(`${this.path}/`, catchAsync(authMiddleware), catchAsync(this.deleteAllPosts.bind(this)))
            .delete(`${this.path}/:id`, catchAsync(authMiddleware), catchAsync(this.deletePost.bind(this)))
            .post(`${this.path}`, catchAsync(authMiddleware), validationMiddleware(CreatePostDto), catchAsync(this.createPost.bind(this)))
    }
    private async createPost(request: IUserRequest, response: Response) {
        const postData: Post = request.body;
        const foundPost = await this.post.findOne({ postId: postData.postId })
        if (foundPost) {
            throw new PostWithIdAlreadyExists(foundPost.postId)
        }
        const createdPost = await new this.post({ ...postData, authors: [request.user?._id] }).save();
        return response.status(HttpStatusCode.Ok).send({
            message: "Saved Post Successfully!",
            data: createdPost
        })

    }
    private async deleteAllPosts(request: IUserRequest, response: Response) {
        const deletedPost = await this.post.findOneAndDelete({});

        response.status(HttpStatusCode.Ok).send({
            message: "Saved Post Successfully!",
            data: deletedPost
        })
    }
    private async deletePost(request: IUserRequest, response: Response) {
        const id = request.params.id;
        const deletedPost = await this.post.findOneAndDelete({ postId: id });
        if (!deletedPost) {
            throw new PostNotFoundException(id)
        }
        response.status(HttpStatusCode.Ok).send({
            message: "Saved Post Successfully!",
            data: deletedPost
        })
    }
    private async updatePost(request: IUserRequest, response: Response) {
        const id = request.params.id;
        const postData: Post = request.body;
        const updatedPost = await this.post.findOneAndUpdate({ postId: id }, postData);
        if (!updatedPost) {
            throw new PostNotFoundException(id)
        }
        response.status(HttpStatusCode.Ok).send({
            message: "Saved Post Successfully!",
            data: updatedPost
        })
    }
    private async getPostById(request: IUserRequest, response: Response) {
        const id = request.params.id;
        const post = await this.post.findOne({ postId: id })
        if (post === null) {
            throw new PostNotFoundException(id)
        }
        return response.status(HttpStatusCode.Ok).json(post);
    }
    private async getPostOfCurrentUser(request: IUserRequest, response: Response) {
        console.log(request.user);
        const id = request.user?._id;
        const allUserPosts = await this.post.aggregate(
            [
                {
                    $project: {
                        "is my  post": {
                            $in: [id, "$authors"]
                        }
                    }
                }
            ]
        )
        response.status(HttpStatusCode.Ok).send("All Found!");
    }
    private async getAllPosts(request: IUserRequest, response: Response) {
        const allPosts = await this.post.find({});
        if (allPosts.length == 0) {
            throw new HttpException(HttpStatusCode.BadRequest, "No Posts Added!");
        }
        response.status(HttpStatusCode.Ok).json(allPosts)
    }

}

export default PostController;