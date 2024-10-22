import {Router} from "express";
import { messagesController } from "../controllers/messages.controller";
import {getStorage} from "firebase/storage";
import multer from "multer";

const router= Router()
const storage = getStorage()
const upload = multer({storage: multer.memoryStorage()})

router.post('/send-message',  upload.array('files', 10), messagesController.send, )
router.get('/messages',  messagesController.getMessages, )
router.put("/edit-message/:chatId/:messageId", messagesController.edit);
router.delete("/delete-message/:chatId/:messageId", messagesController.delete);
router.post("/upload-files", messagesController.uploadFiles);

export const messagesRouter = router;
