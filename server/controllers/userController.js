const User = require('../../database/models/userModel');
const baseController = require('./baseController');

module.exports = {
    getAllUsers: baseController.getAll(User),
    getUserById: baseController.getById(User, 'User'),
    createUser: baseController.createOne(User),
    updateUser: baseController.updateOne(User),
    deleteUser: baseController.deleteOne(User)
};