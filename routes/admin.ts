import { Router } from 'express';
import cathedraController from '../controllers/cathedraController';
import facultyController from '../controllers/facultyController';
import specialtyController from '../controllers/specialtyController';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

router.post('/add/faculty', authMiddleware, facultyController.createFaculty);
router.get('/list/faculties', authMiddleware, facultyController.getFaculties);
router.delete('/faculty/:id', authMiddleware, facultyController.deleteFaculty);

router.post('/add/cathedra', authMiddleware, cathedraController.createCathedra);
router.get('/list/cathedras', authMiddleware, cathedraController.getCathedras);
router.delete('/cathedra/:id', authMiddleware, cathedraController.deleteCathedra);

router.post('/add/specialty', authMiddleware, specialtyController.createSpecialty);
router.get('/list/specialties', authMiddleware, specialtyController.getSpecialties);
router.delete('/specialty/:id', authMiddleware, specialtyController.deleteSpecialty);

export default router;
