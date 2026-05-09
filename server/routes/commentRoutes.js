import express from 'express';
const router = express.Router();
import commentController from '../controllers/commentController.js';

router.get('/', commentController.getAllComments);
router.get('/users/:userId', commentController.getCommentByUser);
router.get('/post/:postId', commentController.getCommentByPost);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

export default router;