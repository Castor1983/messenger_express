import {NextFunction, Request, Response} from "express";

import { messagesService } from "../services/messages.service";
import {IChatMessages, IMessageFormData, IMessageParams, TextMessage } from "../types/messageType";

class MessagesController {
    public async send(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {
        try {
            const dto =req.body as IMessageFormData;
            const files = req.files as Express.Multer.File[];
                await messagesService.send(dto, files);
            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }

    public async getMessagesByChatId (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<IChatMessages>> {
        try {
            const params = req.params;
            const chatMessages = await messagesService.getMessagesByChatId(params);
            return  res.send (chatMessages);
        } catch (e) {
            next(e);
        }
    }
    
    public async getMessageById (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<TextMessage>> {
        try {
            const params = req.params as IMessageParams;
            const message = await messagesService.getMessageById(params);
            return  res.send (message);
        } catch (e) {
            next(e);
        }
    }

    public async edit(
        req: Request<IMessageParams>,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {
        const params = req.params;
        const dto = req.body;
        try {
          await messagesService.edit(dto, params);
            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async delete(
        req: Request<IMessageParams>,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {
        const params = req.params;
        try {
            await messagesService.delete(params);

            return res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}

export const messagesController = new MessagesController();
