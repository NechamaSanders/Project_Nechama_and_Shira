import express from'express';
const router = express.Router();
import todoController from '../controllers/todoController.js';

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.get('/users/:userId', todoController.getByUserId);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;