import {Router} from "express";
import { messagesController } from "../controllers/messages.controller";
import {upload} from "../firebase"
import { authMiddleware } from "../middlewares/auth.middleware";

const router= Router()

router.post('/send-message',  authMiddleware.checkAccessToken, upload.array('files', 10), messagesController.send);
router.get('/messages/:chatId', authMiddleware.checkAccessToken, messagesController.getMessagesByChatId);
router.put("/edit-message/:chatId/:messageId", authMiddleware.checkAccessToken, messagesController.edit);
router.delete("/delete-message/:chatId/:messageId", authMiddleware.checkAccessToken, messagesController.delete);


export const messagesRouter = router;
