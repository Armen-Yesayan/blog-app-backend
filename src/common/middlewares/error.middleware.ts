import { Request, Response, NextFunction } from 'express';
import {ApiError} from "../errors/api.error";
import {ValidationError} from "class-validator";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    if (Array.isArray(err) && err[0] instanceof ValidationError) {
        const messages = err
            .map((e) => e.constraints ? Object.values(e.constraints).join(', ') : 'Validation failed')
            .join('; ');

        return res.status(400).json({ error: messages });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
}