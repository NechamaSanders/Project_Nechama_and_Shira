const baseModel = require('./baseModel');

const Comment = {
    getAll: () => baseModel.getAll('comments'),
    getByUserId: (userId) => baseModel.getByColumn('comments', 'userId', userId),
    getById: (id) => baseModel.getById('comments', id),
    create: (commentData) => baseModel.create('comments', commentData),
    update: (id, data) => baseModel.update('comments', id, data),
    remove: (id) => baseModel.remove('comments', id)
};

module.exports = Comment;