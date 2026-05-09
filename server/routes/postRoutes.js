import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js';

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.get('/users/:userId', postController.getPostByUser);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;