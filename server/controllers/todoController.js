const Todo = require('../../database/models/todoModel');
const baseController = require('./baseController');

module.exports = {
    getAllTodos: baseController.getAll(Todo),
    createTodo: baseController.createOne(Todo)
};