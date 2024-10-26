import { ApiError } from "../errors/api.error";
import { IMessage, IMessageParams, IUpdateMessage } from "../types/messageType";
import {firebase, storage} from "../firebase";
import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, DocumentSnapshot, QuerySnapshot, DocumentData} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

class MessagesService {
    public async send (dto: IMessage, files: Express.Multer.File[] ): Promise<void> {
        const {senderId, receiverId} = dto;
        const chatId = [senderId, receiverId].sort().join('_');
        const fileUrls: string[] = [];
        try {
            const messageId = doc(collection(firebase, `chats/${chatId}/messages`)).id;
            const messageRef = doc(firebase, `chats/${chatId}/messages`, messageId);
            if (files) {
                for (const file of files) {
                    const storageRef = ref(storage, `uploads/${file.originalname}-${Date.now()}`);
                    await uploadBytes(storageRef, file.buffer);
                    const fileUrl = await getDownloadURL(storageRef);
                    fileUrls.push(fileUrl);
                }
            }
            await setDoc(messageRef, { ...dto, files: fileUrls, create: new Date(),});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
    public async edit (dto: IUpdateMessage, params: IMessageParams): Promise<void> {
        const {chatId, messageId} = params

        try {
            const messageRef = doc(firebase, `chats/${chatId}/messages/${messageId}`);
             const updateMessage: DocumentSnapshot = await getDoc(messageRef);
            if (!updateMessage.exists())
            {
                throw new ApiError("message not found", 404);
            }
                 await updateDoc(messageRef, { ...dto, update: new Date(),});

        } catch (e) {
            const status = e.status || 500;
            throw new ApiError(e.message, status);
        }
    }
    public async getMessagesByChatId ( params: Partial <IMessageParams>): Promise<IMessage[]> {
        const {chatId} = params
        try {
            const messagesRef = collection(firebase, 'chats', chatId, 'messages');
            const snapshot: QuerySnapshot<DocumentData> = await getDocs(messagesRef);
            const messages = snapshot.docs.map(doc =>({
                messageId: doc.id,
                ...doc.data() as IMessage
            }));
            if (messages.length == 0)
            {
                throw new ApiError( 'Messages not found', 404);
            }

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
            const message: DocumentSnapshot =  await getDoc (messageRef)
            if (!message.exists())
            {
                throw new ApiError("message not found", 404);
            }
            await deleteDoc(messageRef);
        } catch (e: any) {
            const status = e.status || 500;
            throw new ApiError(e.message, status);
        }
    }
    }

export const messagesService = new MessagesService();
