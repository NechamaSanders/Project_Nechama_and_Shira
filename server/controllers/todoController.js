const Todo = require('../models/todoModel');
const baseController = require('./baseController');

module.exports = {
    getAllTodos: baseController.getAll(Todo),
    createTodo: baseController.createOne(Todo)
};