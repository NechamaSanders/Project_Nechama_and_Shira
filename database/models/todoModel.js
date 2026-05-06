const baseModel = require('./baseModel');

const Todo = {
    getAll: () => baseModel.getAll('todos'),
    getByUserId: (userId) => baseModel.getByColumn('todos', 'userId', userId),
    getById: (id) => baseModel.getById('todos', id),
    create: (todoData) => baseModel.create('todos', todoData)
};

module.exports = Todo;
