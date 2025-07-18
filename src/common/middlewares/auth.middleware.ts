import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {ApiError} from "../errors/api.error";

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Unauthorized: Token not provided'));
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            return next(new ApiError(401, 'Invalid token payload'));
        }

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return next(new ApiError(401, 'Invalid or expired token'));
    }
};
