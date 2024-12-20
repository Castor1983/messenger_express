import {Router} from "express";

import {authController} from "../controllers/auth.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {userMiddleware} from "../middlewares/user.middleware";
import {UserValidator} from "../validators/user.validator";
import { authMiddleware } from "../middlewares/auth.middleware";


const router= Router()

router.post('/register', commonMiddleware.isBodyValid(UserValidator.register),
    userMiddleware.isPhoneUniq, authController.register, )
router.post('/login', commonMiddleware.isBodyValid(UserValidator.login), authController.login, )
router.delete("/logout",  authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
