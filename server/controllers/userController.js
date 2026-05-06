const User = require('../../database/models/userModel');
const baseController = require('./baseController');

module.exports = {
    getAllUsers: baseController.getAll(User),
    createUser: baseController.createOne(User)
};