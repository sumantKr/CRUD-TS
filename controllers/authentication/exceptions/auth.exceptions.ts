import { HttpStatusCode } from "axios";
import HttpException from "../../../exceptions/HttpException";

export class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(HttpStatusCode.Unauthorized, `Unauthorized`)
    }
}
export class AuthTokenMissingException extends HttpException {
    constructor() {
        super(HttpStatusCode.Unauthorized, `Unauthorized`)
    }
}
export class TokenExpiredException extends HttpException {
    constructor() {
        super(HttpStatusCode.Unauthorized, `Session has Expired! Please login again`)
    }
}