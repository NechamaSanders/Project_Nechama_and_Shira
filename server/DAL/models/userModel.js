import baseModel from './baseModel.js';

const User = {
    getAll: () => baseModel.getAll('users'),
    getById: (id) => baseModel.getById('users', id),
    getByUsername: (username) => baseModel.getByColumn('users', 'username', username),
    getUserPassword: (id) => baseModel.getUserPassword(id),
    create: (userData) => baseModel.create('users', userData),
    createPassword: (userData) => baseModel.create('passwords', userData),
    update: (id, data) => baseModel.update('users', id, data),
    remove: (id) => baseModel.remove('users', id)
};

export default User;