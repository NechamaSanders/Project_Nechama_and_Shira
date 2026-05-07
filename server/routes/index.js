const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const todoRoutes = require('./todoRoutes');
const commentRoutes = require('./commentRoutes');
const loginRoutes=require('./authRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/todos', todoRoutes);
router.use('/comments', commentRoutes);
router.use('/login', loginRoutes);

module.exports = router;
