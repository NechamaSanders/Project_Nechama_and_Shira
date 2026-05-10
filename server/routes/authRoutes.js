import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';

router.post('/', authController.login);
router.post('/register', authController.register);
router.put('/profile/:id', authController.updateProfile);
router.put('/password/:id', authController.changePassword);

export default router;