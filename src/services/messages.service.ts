import { ApiError } from "../errors/api.error";
import { IMessage, IMessageParams, IUpdateMessage } from "../models/messageModel";
import {firebase} from "../firebase";
import {collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";


class MessagesService {
    public async send (dto: IMessage,  ): Promise<void> {

        const {senderId, receiverId} = dto;
        const chatId = [senderId, receiverId].sort().join('_');
        try {
            const messageId = doc(collection(firebase, `chats/${chatId}/messages`)).id;
            const messageRef = doc(firebase, `chats/${chatId}/messages`, messageId);
            await setDoc(messageRef, { ...dto, create: new Date(),});
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
    }public async delete ( params: IMessageParams): Promise<void> {
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
