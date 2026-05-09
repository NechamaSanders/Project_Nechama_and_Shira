import User from '../DAL/models/userModel.js';
import baseController from './baseController.js';

const userController = {
    getAllUsers: baseController.getAll(User),
    getUserById: baseController.getById(User, 'User'),
    createUser: baseController.createOne(User),
    updateUser: baseController.updateOne(User),
    deleteUser: baseController.deleteOne(User)
};
export default userController;