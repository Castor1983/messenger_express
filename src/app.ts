import express from 'express';
import {configs} from "./configs/configs";
import {authRouter} from "./routers/auth.router";
import {NextFunction, Request, Response} from "express";
import {ApiError} from "./errors/api.error";
import { messagesRouter } from './routers/messages.router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use ('/auth', authRouter);
app.use ('/chat', messagesRouter);
app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;

    res.status(status).json({
        message: error.message,
        status: error.status,
    });
});


app.listen(configs.PORT,  () => {
    console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
