import speakeasy from "speakeasy";
import { JWT_REFRESH_SECRET, JWT_SECRET, TWO_FA_APP_NAME } from "../../../constants/constants";
import { Response } from "express";
import QRCode from "qrcode";
import { IDataStoredInToken, IRefreshToken, ITokenData } from "../token.interface";
import jwt from "jsonwebtoken";
import RefreshTokenModel from "../model/RefreshToken.model";
import { User } from "../../User/User.interface";
import { v4 as uuidv4 } from "uuid";

export default class AuthService {

    constructor() { };

    // getTwoFA() {
    //     const secretCode = speakeasy.generateSecret({
    //         name: TWO_FA_APP_NAME
    //     });
    //     return {
    //         otpAuthUrl: secretCode.otpauth_url,
    //         base32: secretCode.base32
    //     }
    // }

    // getQRCode(data: any, response: Response) {
    //     QRCode.toFileStream(response, data);
    // }

    // public async verifyTwoFAAuthCode(twoFAAuthCode: string, user: User) {
    //     const ans = speakeasy.totp.verify({
    //         secret:user.twoFactorAuthenticationCode,
    //         encoding: "base32",
    //         token: "151590"
    //     })
    //     console.log(`🌋 | file: authentication.service.ts:34 | AuthService | verifyTwoFAAuthCode | ans:`, ans)
    //     return ans;
    // }
    public createCookie(type:string,tokenData: ITokenData | IRefreshToken) {
        
        return `${type}=${tokenData.token}; Max-Age=${tokenData.expiresIn}; Path=/;SameSite=None;Secure=true;`;
    }

    public createToken(user: User, isSecondFactorAuthenticated = false): ITokenData {
        const expiresIn = 60*60;
        const secret: string = JWT_SECRET;
        const dataStoredInToken: IDataStoredInToken = {
            isSecondFactorAuthenticated,
            _id: user._id
        }
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        }
    }
    public async createRefreshToken(user: User, isSecondFactorAuthenticated = false): Promise<IRefreshToken> {
        let expiresIn = 86400;
        const refreshSecret: string = JWT_REFRESH_SECRET;

        let _token = uuidv4();
        const dataStoredInToken: IDataStoredInToken = {
            isSecondFactorAuthenticated,
            _id: user._id
        }
        const response = {
            expiresIn,
            user,
            token: jwt.sign(dataStoredInToken, refreshSecret, { expiresIn })
        }


        const updatedRefreshToken = await RefreshTokenModel.findOneAndReplace({ user: user._id }, response, { upsert: true })

        return response;
    }
}