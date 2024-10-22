import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  static nickName = joi.string().min(2).max(50).trim();
  static email = joi.string().regex(regexConstant.EMAIL).trim();
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static phone = joi.string();



  static register = joi.object({
    nickName: this.nickName.required(),
    password: this.password.required(),
    phone: this.phone.required(),
  });

  static login = joi.object({
    phone: this.phone.required(),
    password: this.password.required(),
  });

  static forgotPassword = joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = joi.object({
    newPassword: this.password.required(),
  });

  static setNewPassword = joi.object({
    password: this.password.required(),
    newPassword: this.password.required(),
  });
}
