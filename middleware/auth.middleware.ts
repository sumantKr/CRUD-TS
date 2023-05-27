import { Request, NextFunction, Response } from "express";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/constants";
import jwt from "jsonwebtoken";
import IUserRequest from "../controllers/User/User.interface";
import { TokenExpiredException, WrongAuthenticationTokenException } from "../controllers/authentication/exceptions/auth.exceptions";
import userModel from "../controllers/User/model/User.model";
import RefreshTokenModel from "../controllers/authentication/model/RefreshToken.model";
import AuthService from "../controllers/authentication/service/authentication.service";



async function authMiddleware(request: IUserRequest, response: Response, next: NextFunction) {
    const cookie = request.cookies;
    console.log(`🌋 | file: auth.middleware.ts:14 | authMiddleware | cookie:`, request)
    const authenticationService = new AuthService();

    if (cookie && cookie.Authorization) {
        const secret: any = JWT_SECRET;
        const verificationResponse: any = jwt.verify(cookie.Authorization, secret);
        const { _id } = verificationResponse;
        const user = await userModel.findById(_id);
        if (user) {
            // if ( user.isTwoFactorAuthenticationEnabled && !isSecondFactorAuthenticated) {
            //     throw new WrongAuthenticationTokenException();
            // }
            request.user = user;
            next();
        }
        else {
            throw new WrongAuthenticationTokenException();
        }

    }

    else {
        const refreshToken = cookie.AccessToken
        const refreshTokenExists = await RefreshTokenModel.findOne({ token: refreshToken });
        if (refreshTokenExists) {
            const secret: any = JWT_REFRESH_SECRET;
            const verificationResponse: any = jwt.verify(refreshToken, secret);
            const { _id } = verificationResponse;
            const user = await userModel.findById(_id)

            if (user) {
                const tokenData = authenticationService.createToken(user);
                const refreshTokenData = await authenticationService.createRefreshToken(user);
                response.setHeader('Set-Cookie', [authenticationService.createCookie("Authorization", tokenData), authenticationService.createCookie("AccessToken", refreshTokenData)]);
                request.user = user;
                next();
            }
            else {
                throw new WrongAuthenticationTokenException();
            }
        }
        else {
            throw new TokenExpiredException();
        }
    }

}


export default authMiddleware