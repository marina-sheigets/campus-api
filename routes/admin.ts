import { Router } from 'express';
import AdminController from '../controllers/adminController';

const router = Router();

router.post('/add/student', AdminController.createStudent);
// router.post('/login', AuthController.login);
// router.post('/logout', AuthController.logout);

export default router;
