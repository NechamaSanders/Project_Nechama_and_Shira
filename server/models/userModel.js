const baseModel = require('./baseModel');

const User = {
    getAll: () => baseModel.getAll('users'),
    getById: (id) => baseModel.getById('users', id),
    create: (userData) => baseModel.create('users', userData)
};

module.exports = User;