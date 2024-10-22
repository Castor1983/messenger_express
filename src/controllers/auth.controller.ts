import {authService} from "../services/auth.service";
import {NextFunction, Request, Response} from "express";
import {IToken} from "../models/tokenModel";


class AuthController {
    public async register(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<void>> {
        try {
            const dto =req.body;
            await authService.register(dto);

            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
    public async login (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response<IToken>> {
        try {
            const dto =req.body;
            const token = await authService.login(dto);

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    public async logout(
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


export const authController = new AuthController();
