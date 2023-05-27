import { StatusCodes, getReasonPhrase } from "http-status-codes";
export class ErrorResponse extends Error {
  statusCode: StatusCodes;
  redirectUrl: null | string;
  constructor(
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    redirectUrl = null
  ) {
    super();
    this.statusCode = statusCode
    this.message = message
    this.redirectUrl = redirectUrl
  }

  getCode() {
    if (this instanceof BadRequest) {
      return StatusCodes.BAD_REQUEST;
    }
    //Can Add Multiple cases for Different Error Codes!
    return this.statusCode;
  }
}


export class BadRequest extends ErrorResponse { }

