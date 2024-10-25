import { ParamsDictionary } from 'express-serve-static-core';

export interface IMessage {
    senderId: string,
    receiverId: string,
    message: string,
    files?:  string[]


}
export interface IUpdateMessage  {
    message: string,
    files?: string []
}
export interface IMessageParams extends ParamsDictionary {
    chatId: string,
    messageId: string

}
export interface IChatMessages {
    messages: IMessage[]

}
