import Post from '../DAL/models/postModel.js';
import baseController from './baseController.js';

const postController = {
    getAllPosts: baseController.getAll(Post),
    getPostById: baseController.getById(Post, 'Post'),
    getPostByUser: baseController.getByUserId(Post),
    createPost: baseController.createOne(Post),
    updatePost: baseController.updateOne(Post),
    deletePost: baseController.deleteOne(Post)
};
export default postController;