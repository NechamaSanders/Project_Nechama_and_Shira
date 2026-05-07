const Comment = require('../DAL/models/commentModel');
const baseController = require('./baseController');

module.exports = {
    getAllComments: baseController.getAll(Comment),
    getCommentById: baseController.getById(Comment, 'Comment'),
    getCommentByUser: baseController.getByUserId(Comment),
    createComment: baseController.createOne(Comment),
    updateComment: baseController.updateOne(Comment),
    deleteComment: baseController.deleteOne(Comment)
};