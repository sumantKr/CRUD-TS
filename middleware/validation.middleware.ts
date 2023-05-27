import { plainToClassFromExist } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "../exceptions/HttpException";
import { HttpStatusCode } from "axios";


function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClassFromExist(new type(), req.body), { skipMissingProperties })
    .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) =>
            JSON.stringify(error.constraints)
            ).join(', ');
          next(new HttpException(HttpStatusCode.BadRequest, message));
        } else {
          next();
        }
      });
  };
}

export default validationMiddleware

