const Post = require('../../database/models/postModel');
const baseController = require('./baseController');

module.exports = {
    getAllPosts: baseController.getAll(Post),
    getPostById: baseController.getById(Post, 'Post'),
    getPostByUser: baseController.getByUserId(Post),
    createPost: baseController.createOne(Post),
    updatePost: baseController.updateOne(Post),
    deletePost: baseController.deleteOne(Post)
};
