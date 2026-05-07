const baseModel = require('./baseModel');

const User = {
    getAll: () => baseModel.getAll('users'),
    getById: (id) => baseModel.getById('users', id),
    getByUsername: (username) => baseModel.getByAttribute('users','username', username),
    getUserPassword: (id)=>baseModel.getUserPassword(id),
    create: (userData) => baseModel.create('users', userData),
    update: (id, data) => baseModel.update('users', id, data),
    remove: (id) => baseModel.remove('users', id)
};

module.exports = User;