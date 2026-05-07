const Todo = require('../../database/models/todoModel');
const baseController = require('./baseController');

module.exports = {
    getAllTodos: baseController.getAll(Todo),
    getTodoById: baseController.getById(Todo, 'Todo'),
    getTodoByUser: baseController.getByUserId(Todo),
    createTodo: baseController.createOne(Todo),
    updateTodo: baseController.updateOne(Todo),
    deleteTodo: baseController.deleteOne(Todo)
};