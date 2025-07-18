import { Router } from 'express';
import { PostController } from './post.controller';
import {authMiddleware} from "../../common/middlewares/auth.middleware";
import {canEditPostMiddleware} from "../../common/middlewares/canEditPost.middleware";

const router = Router();
const controller = new PostController();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, canEditPostMiddleware, controller.update);
router.delete('/:id', authMiddleware, canEditPostMiddleware, controller.delete);

export default router;