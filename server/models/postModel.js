const baseModel = require('./baseModel');

const Post = {
    getAll: () => baseModel.getAll('posts'),
    getByUserId: (userId) => baseModel.getByColumn('posts', 'userId', userId),
    getById: (id) => baseModel.getById('posts', id),
    create: (postData) => baseModel.create('posts', postData)
};

module.exports = Post;