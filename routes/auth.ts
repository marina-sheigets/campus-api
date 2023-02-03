import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

// student
router.post('/student/registration', usersController.studentRegistration);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/refresh', usersController.refresh);

export default router;
