const Post = require('../models/postModel');
const baseController = require('./baseController');

module.exports = {
    getAllPosts: baseController.getAll(Post),
    createPost: baseController.createOne(Post)
};
