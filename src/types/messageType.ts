import { ParamsDictionary } from 'express-serve-static-core';

export interface IMessage<T> {
    senderId: string,
    receiverId: string,
    message: string,
    files?:  T[]


}
export interface IMessageFormData {
    senderId: string;
    receiverId: string;
    message: string;
    files?: Express.Multer.File[];


}
export type TextMessage = IMessage<string>;
export type FormDataMessage = IMessage<FormData>;

export interface IUpdateMessage  {
    message: string,
    files?: string []
}
export interface IMessageParams extends ParamsDictionary {
    chatId: string,
    messageId: string

}
export interface IChatMessages {
    messages: TextMessage[]

}
