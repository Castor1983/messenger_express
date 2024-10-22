import {authService} from "../services/auth.service";
import {NextFunction, Request, Response} from "express";
import {IToken} from "../models/tokenModel";
import { messagesService } from "../services/messages.service";
import { IMessageParams } from "../models/messageModel";

class MessagesController {
    public async send(

        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {

        try {
            const dto =req.body;
            const files = req.files;
            await messagesService.send(dto);

            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
    public async getMessages (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<IToken>> {
        try {
            const dto =req.body;
            const tokensPair = await authService.login(dto);

            return res.json(tokensPair);
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
    }public async uploadFiles(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {
        try {
            const accessToken = req.res.locals.accessToken as string;

            await authService.logout(accessToken);

            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}


export const messagesController = new MessagesController();
