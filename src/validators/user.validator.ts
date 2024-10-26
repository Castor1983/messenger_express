import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  static nickName = joi.string().min(2).max(50).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static phone = joi.string().regex(regexConstant.PHONENUMBER);
  static message = joi.string().max(200).regex(regexConstant.PROFANITY);



  static register = joi.object({
    nickName: this.nickName.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  static login = joi.object({
    phone: this.phone.required(),
    password: this.password.required(),
  });
  static edit = joi.object({
    message: this.message.required()
  });
  static send = joi.object({
    senderId: this.phone.required(),
    receiverId: this.phone.required(),
    message: this.message.required()
  });
}
