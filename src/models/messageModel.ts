export interface IMessage {
    senderId: string,
    receiverId: string,
    message: string,
    files?: string[]


}
export interface IUpdateMessage  {
    message: string,
    files?: string[]
}
export interface IMessageParams {
    chatId: string,
    messageId: string

}
export interface IChatMessages {
    messages: IMessage[]

}
