import {NextFunction, Request, Response} from 'express';
import {ApiError} from "../errors/api.error";
import {Post} from "../models/post.model";

interface AuthRequest extends Request {
    user?: { id: string };
}

export const canEditPostMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;

        if (!userId) {
            return next(new ApiError(401, 'User not authenticated'));
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            return next(new ApiError(404, 'Post not found'));
        }

        if (post.userId.toString() !== userId) {
            return next(new ApiError(403, 'You are not authorized to modify this post'));
        }

        next();
    } catch (error) {
        next(error);
    }
};
