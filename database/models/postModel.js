const baseModel = require('./baseModel');

const Post = {
    getAll: () => baseModel.getAll('posts'),
    getByUserId: (userId) => baseModel.getByColumn('posts', 'userId', userId),
    getById: (id) => baseModel.getById('posts', id),
    create: (postData) => baseModel.create('posts', postData),
    update: (id, data) => baseModel.update('posts', id, data),
    remove: (id) => baseModel.remove('posts', id)
};

module.exports = Post;