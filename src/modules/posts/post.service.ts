import {CreatePostDto, UpdatePostDto} from "./dto/post.dto";
import {Post} from "../../common/models/post.model";
import {ApiError} from "../../common/errors/api.error";
import {User} from "../../common/models/user.model";

export class PostService {
    async createPost(data: CreatePostDto, imagePath?: string) {
        try {
            const postData = {
                ...data,
                image: imagePath,
            };

            return await Post.create(postData);
        } catch (error) {
            throw new ApiError(400, 'Failed to create post');
        }
    }

    async getAllPosts(page: number, limit: number) {
        try {
            const offset = (page - 1) * limit;

            const { rows: posts, count: total } = await Post.findAndCountAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
            });

            const totalPages = Math.ceil(total / limit);

            return {
                posts,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                },
            };
        } catch (error) {
            throw new ApiError(400, 'Failed to fetch posts');
        }
    }

    async getPostById(id: string) {
        try {
            const post = await Post.findByPk(id, { include: ['user'], attributes: { exclude: ['password'] } });
            if (!post) {
                throw new ApiError(404, 'Post not found');
            }
            return post;
        } catch (error) {
            throw new ApiError(400, 'Failed to fetch post');
        }
    }

    async updatePost(id: string, data: UpdatePostDto, imagePath?: string) {
        try {
            const post = await Post.findByPk(id);
            if (!post) {
                throw new ApiError(404, 'Post not found');
            }

            await post.update({...data, ...(imagePath && {image: imagePath}) });
            return post;
        } catch (error) {
            throw new ApiError(400, 'Failed to update post');
        }
    }

    async deletePost(id: string) {
        try {
            const post = await Post.findByPk(id);
            if (!post) {
                throw new ApiError(404, 'Post not found');
            }
            await post.destroy();
            return { message: 'Post deleted successfully' };
        } catch (error) {
            throw new ApiError(400, 'Failed to delete post');
        }
    }
}