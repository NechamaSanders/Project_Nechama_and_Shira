import express from 'express';
const router = express.Router();

import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import todoRoutes from './todoRoutes.js';
import commentRoutes from './commentRoutes.js';
import loginRoutes from './authRoutes.js';

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/todos', todoRoutes);
router.use('/comments', commentRoutes);
router.use('/login', loginRoutes);

export default router;
