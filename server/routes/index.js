const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const todoRoutes = require('./todoRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/todos', todoRoutes);

module.exports = router;
