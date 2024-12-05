import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";

import { ApiError } from "../errors/api.error";


class CommonMiddleware {

  public isBodyValid<T>(validator: ObjectSchema<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {

        const value = await validator.validateAsync(req.body);
        req.body = value;
        next();
      } catch (e) {
        if (e instanceof ValidationError) {
          next(new ApiError(e.message, 400));
        } else {
          next(e);
        }
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
