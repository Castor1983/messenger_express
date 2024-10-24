import { ApiError } from "../errors/api.error";
import { IMessage, IMessageParams, IUpdateMessage } from "../types/messageType";
import {firebase, storage} from "../firebase";
import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


class MessagesService {
    public async send (dto: IMessage, files: Express.Multer.File[] ): Promise<void> {
        const {senderId, receiverId} = dto;
        const chatId = [senderId, receiverId].sort().join('_');
        const fileUrls: string[] = [];
        try {
            const messageId = doc(collection(firebase, `chats/${chatId}/messages`)).id;
            const messageRef = doc(firebase, `chats/${chatId}/messages`, messageId);
            if (files)
            {
                try {
                    for (const file of files) {
                        const storageRef = ref(storage, `uploads/${file.originalname}-${Date.now()}`);
                        await uploadBytes(storageRef, file.buffer);
                        const fileUrl = await getDownloadURL(storageRef);
                        fileUrls.push(fileUrl);
                    }
                } catch (e) {
                    const status = e.status || 500;
                    throw new ApiError(e.message, status);
                }}
            await setDoc(messageRef, { ...dto, files: fileUrls, create: new Date(),});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
    public async edit (dto: IUpdateMessage, params: IMessageParams): Promise<void> {
        const {chatId, messageId} = params

        try {
            const messageRef = doc(firebase, `chats/${chatId}/messages/${messageId}`);
            await updateDoc(messageRef, { ...dto, update: new Date(),});
        } catch (e) {
            const status = e.status || 500;
            throw new ApiError(e.message, status);
        }
    }
    public async getMessagesByChatId ( params: Partial <IMessageParams>): Promise<IMessage[]> {
        const {chatId} = params
        try {
            const messagesRef = collection(firebase, 'chats', chatId, 'messages'); // Путь к подколлекции
            const snapshot = await getDocs(messagesRef);
            const messages = snapshot.docs.map(doc =>({
                messageId: doc.id,
                ...doc.data() as IMessage
            }));
            return messages
        } catch (e) {
            const status = e.status || 500;
            throw new ApiError(e.message, status);
        }

    }
    public async delete ( params: IMessageParams): Promise<void> {
        const {chatId, messageId} = params

        try {
            const messageRef = doc(firebase, `chats/${chatId}/messages/${messageId}`);
            await deleteDoc(messageRef);
        } catch (e) {
            const status = e.status || 500;
            throw new ApiError(e.message, status);
        }
    }
    }

export const messagesService = new MessagesService();
