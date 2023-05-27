import bcrypt from "bcrypt";
import { Router, Request, Response, request, response } from "express";
import catchAsync from "../../middleware/catchAsync";
import validationMiddleware from "../../middleware/validation.middleware";
import IController from "../../types/Controller.type";
import CreateUserDto from "../User/model/User.dto";
import jwt from "jsonwebtoken";
import { NoUserFoundException, UserAlreadyExistsException, WrongCredentialsException } from "../User/exceptions/User.exceptions";
import { JWT_SECRET } from "../../constants/constants";
import IUserRequest, { User } from "../User/User.interface";
import { IDataStoredInToken, IRefreshToken, ITokenData } from "./token.interface";
import AuthService from "./service/authentication.service";
import authMiddleware from "../../middleware/auth.middleware";
import { WrongAuthenticationTokenException } from "./exceptions/auth.exceptions";
import HttpException from "../../exceptions/HttpException";
import { StatusCodes } from "http-status-codes";
import userModel from "../User/model/User.model";
class AuthenticationController implements IController {
    public path: string = "/auth";
    public router = Router();
    private user = userModel;
    private authenticationService = new AuthService();
    constructor() {
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto), catchAsync(this.login.bind(this)))
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), catchAsync(this.registration.bind(this)))
        this.router.post(`${this.path}/logout`, this.loggingOut.bind(this));
        // this.router.post(`${this.path}/2fa/generate`, catchAsync(authMiddleware), catchAsync(this.generateTwoFACode.bind(this)));
        // this.router.post(`${this.path}/2fa/verify`, catchAsync(authMiddleware), catchAsync(this.turnOnTwoFA.bind(this)));
        // this.router.post(`${this.path}/2fa/authenticate`, catchAsync(authMiddleware)), catchAsync(this.secondFactorAuthentication.bind(this));

    }
    private async registration(request: Request, response: Response) {
        const userData: User = request.body;
        const userExists = await this.user.findOne({ email: userData.email })
        if (userExists) {
            throw new UserAlreadyExistsException(userData.email);
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10)
            const user = await this.user.create({
                ...userData,
                password: hashedPassword,
            });
            user.password = "SACRED";
            
            return response.send(user);
        }
    }
    private async login(request: Request, response: Response) {
        const logInData: any = request.body;
        const user = await this.user.findOne({ email: logInData.email });
        console.log(request.cookies)
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                user.password = "PASSWORD";
                const tokenData = this.authenticationService.createToken(user);
                
                const refreshTokenData = await this.authenticationService.createRefreshToken(user);
                response.setHeader('Set-Cookie', [this.authenticationService.createCookie("Authorization", tokenData), this.authenticationService.createCookie("AccessToken", refreshTokenData)]);
                return response.send(user);
            } else {
                throw new WrongCredentialsException()
            }
        } else {
            throw new NoUserFoundException(logInData.email)
        }
    }
    private loggingOut = (request: Request, response: Response) => {
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0;Path=/;SameSite=None;Secure=true;','AccessToken=;Max-age=0;Path=/;SameSite=None;Secure=true;']);
        return response.status(200).send({success:"successfully Logged out"});
    }



    // private generateTwoFACode = async (request: UserRequest, response: Response) => {
    //     const user = request.user;
    //     const { otpAuthUrl, base32 } = this.authenticationService.getTwoFA()
    //     await this.user.findByIdAndUpdate(user?._id, { twoFactorAuthenticationCode: base32 })
    //     this.authenticationService.getQRCode(otpAuthUrl, response);
    // }
    // private async turnOnTwoFA(request: UserRequest, response: Response) {
    //     const user = request.user;
    //     const { twoFactorAuthenticationCode } = request.body;
    //     const isCodeValid = await this.authenticationService.verifyTwoFAAuthCode(twoFactorAuthenticationCode, user!);
    //     if (true) {
    //         await this.user.findByIdAndUpdate(user?._id!, {
    //             isTwoFactorAuthenticationEnabled: true,
    //         });
    //         response.sendStatus(StatusCodes.OK);
    //     } else {
    //         throw new HttpException(StatusCodes.UNAUTHORIZED, "Unauthorized");
    //     }
    // }

    // private secondFactorAuthentication = async (request: UserRequest, response: Response) => {
    //     const { twoFactorAuthenticationCode } = request.body;
    //     const { user } = request

    //     const isCodeValid = await this.authenticationService.verifyTwoFAAuthCode(twoFactorAuthenticationCode, user!);
    //     if (isCodeValid) {
    //         const tokenData = this.authenticationService.createToken(user!, true);
    //         response.setHeader("Set-Cookie", [this.createCookie(tokenData)])
    //         response.send({
    //             ...user,
    //             password: undefined,
    //             twoFactorAuthenticationCode: undefined
    //         })
    //     } else {
    //         throw new WrongAuthenticationTokenException();
    //     }
    // }

}

export default AuthenticationController