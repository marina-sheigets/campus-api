import { Router } from 'express';
import usersController from '../controllers/usersController';
import authMiddleware from '../middleware/auth-middleware';
const router = Router();

router.post('/admin/registration', usersController.adminRegistration);

router.post('/student/registration', authMiddleware, usersController.studentRegistration);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/refresh', usersController.refresh);

export default router;
