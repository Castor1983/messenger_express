
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenService.checkToken(accessToken);

      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }

}

export const authMiddleware = new AuthMiddleware();

