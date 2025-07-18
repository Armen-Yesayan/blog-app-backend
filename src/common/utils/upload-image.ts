import {Response} from 'express';
import {AuthRequest} from "../../modules/posts/post.controller";
import upload from "../middlewares/upload.middleware";

export const uploadImage = (req: AuthRequest, res: Response): Promise<void> => {
    return new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};