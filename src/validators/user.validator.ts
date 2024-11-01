import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import {FormDataMessage, IUpdateMessage, TextMessage } from "../types/messageType";
import { IUser } from "../types/userType";

export class UserValidator {
  static nickName = joi.string().min(2).max(50).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static phone = joi.string().regex(regexConstant.PHONENUMBER);
  static message = joi.string().max(200);

  static register = joi.object<IUser>({
    nickName: this.nickName.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  static login = joi.object<IUser>({
    phone: this.phone.required(),
    password: this.password.required(),
  });

  static edit = joi.object<IUpdateMessage>({
    receiverId: this.phone.required(),
    message: this.message.required()
  });

  static send = joi.object<FormDataMessage>({
    senderId: this.phone.required(),
    receiverId: this.phone.required(),
    message: this.message.required(),

  });
}
