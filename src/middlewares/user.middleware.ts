import { NextFunction, Request, Response } from "express";
import {firebase} from "../firebase";

import { ApiError } from "../errors/api.error";
import {doc, getDoc} from "firebase/firestore";

class UserMiddleware {

  public async isPhoneUniq(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      const docRef = doc(firebase, 'users', phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        throw new ApiError("Phone already exist", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  
  public async isReceiver(req: Request, res: Response, next: NextFunction) {
    try {
      const {senderId, receiverId } = req.body;
      if (senderId==receiverId) {
        throw new ApiError("You can not send a message to yourself", 409);
      }
      const docRef = doc(firebase, 'users', receiverId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new ApiError("Receiver not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
