import { Router } from 'express';
import facultyController from '../controllers/facultyController';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

router.post('/add/faculty', authMiddleware, facultyController.createFaculty);
router.get('/list/faculties', authMiddleware, facultyController.getFaculties);
router.delete('/faculty/:id', authMiddleware, facultyController.deleteFaculty);

export default router;
