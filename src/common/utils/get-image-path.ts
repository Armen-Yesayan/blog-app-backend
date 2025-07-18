import {AuthRequest} from "../../modules/posts/post.controller";
import path from "path";

export function getImagePath(req: AuthRequest): string | undefined {
    if (!req.file) return undefined;

    const fileName = path.basename(req.file.path);

    const imagePath = `uploads/${fileName}`;

    return `${req.protocol}://${req.get("host")}/${imagePath}`;
}