import {Router} from "express";

import { messagesController } from "../controllers/messages.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { userMiddleware } from "../middlewares/user.middleware";

const router= Router()

router.post('/send-message',   userMiddleware.isReceiver, commonMiddleware.isBodyValid(UserValidator.send), authMiddleware.checkAccessToken, messagesController.send);
router.get('/messages/:chatId', authMiddleware.checkAccessToken, messagesController.getMessagesByChatId);
router.get('/messages/:chatId/:messageId', authMiddleware.checkAccessToken, messagesController.getMessageById);
router.put("/edit-message/:chatId/:messageId", commonMiddleware.isBodyValid(UserValidator.edit), authMiddleware.checkAccessToken, messagesController.edit);
router.delete("/delete-message/:chatId/:messageId", authMiddleware.checkAccessToken, messagesController.delete);

export const messagesRouter = router;
