const Todo = require('../DAL/models/todoModel');
const baseController = require('./baseController');

module.exports = {
    getAllTodos: baseController.getAll(Todo),
    getTodoById: baseController.getById(Todo, 'Todo'),
    getByUserId: baseController.getByUserId(Todo),
    createTodo: baseController.createOne(Todo),
    updateTodo: baseController.updateOne(Todo),
    deleteTodo: baseController.deleteOne(Todo)
};