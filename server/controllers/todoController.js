import Todo from '../DAL/models/todoModel.js';
import baseController from './baseController.js';

const todoController = {
    getAllTodos: baseController.getAll(Todo),
    getTodoById: baseController.getById(Todo, 'Todo'),
    getByUserId: baseController.getByUserId(Todo),
    createTodo: baseController.createOne(Todo),
    updateTodo: baseController.updateOne(Todo),
    deleteTodo: baseController.deleteOne(Todo)
};
export default todoController;