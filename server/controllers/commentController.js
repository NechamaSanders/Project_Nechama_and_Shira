import Comment from '../DAL/models/commentModel.js';
import baseController from './baseController.js';

const commentController={
    getAllComments: baseController.getAll(Comment),
    getCommentById: baseController.getById(Comment, 'Comment'),
    getCommentByUser: baseController.getByUserId(Comment),
    getCommentByPost: baseController.getByPostId(Comment),
    createComment: baseController.createOne(Comment),
    updateComment: baseController.updateOne(Comment),
    deleteComment: baseController.deleteOne(Comment)
};
export default commentController;