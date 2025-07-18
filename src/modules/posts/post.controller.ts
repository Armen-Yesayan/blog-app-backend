import {Request, Response, NextFunction} from 'express';
import {PostService} from './post.service';
import {validateOrReject} from 'class-validator';
import {CreatePostDto, UpdatePostDto} from "./dto/post.dto";
import {uploadImage} from "../../common/utils/upload-image";
import {ApiError} from "../../common/errors/api.error";
import {getImagePath} from "../../common/utils/get-image-path";

const postService = new PostService();

export interface AuthRequest extends Request {
    user?: { id: string };
}

export class PostController {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await uploadImage(req, res);

            const dto = Object.assign(new CreatePostDto(), req.body);
            const userId = req.user?.id;
            if (!userId) {
                return next(new ApiError(401, 'User not authenticated'));
            }

            dto.userId = userId;

            await validateOrReject(dto);

            const imagePath = getImagePath(req);

            const post = await postService.createPost(dto, imagePath);

            res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 6;

            const posts = await postService.getAllPosts(page, limit);
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postService.getPostById(req.params.id);
            res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async update(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await uploadImage(req, res);

            const dto = Object.assign(new UpdatePostDto(), req.body);
            await validateOrReject(dto);

            const imagePath = getImagePath(req);

            const post = await postService.updatePost(req.params.id, dto, imagePath);

            res.json(post);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const result = await postService.deletePost(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}