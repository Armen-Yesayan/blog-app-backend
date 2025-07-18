import {AuthRequest} from "../../modules/posts/post.controller";

export function getImagePath(req: AuthRequest): string | undefined {
    if (!req.file) return undefined;

    const cleanedPath = req.file.path
        .replace(/^src[\\/]/, '')
        .replace(/\\/g, '/');

    return `${req.protocol}://${req.get('host')}/${cleanedPath}`;
}