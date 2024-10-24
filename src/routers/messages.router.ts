import {Router} from "express";
import { messagesController } from "../controllers/messages.controller";
import {upload} from "../firebase"

const router= Router()

router.post('/send-message',  upload.array('files', 10), messagesController.send, )
router.get('/messages/:chatId',  messagesController.getMessagesByChatId, )
router.put("/edit-message/:chatId/:messageId", messagesController.edit);
router.delete("/delete-message/:chatId/:messageId", messagesController.delete);


export const messagesRouter = router;
