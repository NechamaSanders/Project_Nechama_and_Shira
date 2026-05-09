import baseModel from './baseModel.js';

const Todo = {
    getAll: () => baseModel.getAll('todos'),
    getByUserId: (userId) => baseModel.getByColumn('todos', 'userId', userId),
    getById: (id) => baseModel.getById('todos', id),
    create: (todoData) => baseModel.create('todos', todoData),
    update: (id, data) => baseModel.update('todos', id, data),
    remove: (id) => baseModel.remove('todos', id)
};

export default Todo;
