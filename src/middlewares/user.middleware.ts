import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import {doc, getDoc} from "firebase/firestore";
import {firebase} from "../firebase";

class UserMiddleware {

  public async isPhoneUniq(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      const data = doc(firebase, 'users', phone);
      const docSnap = await getDoc(data);
      if (docSnap.exists()) {
        throw new ApiError("Phone already exist", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }


}

export const userMiddleware = new UserMiddleware();
