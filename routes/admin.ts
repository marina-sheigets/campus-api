import { Router } from 'express';
import articleController from '../controllers/articleController';
import cathedraController from '../controllers/cathedraController';
import facultyController from '../controllers/facultyController';
import specialtyController from '../controllers/specialtyController';
import authMiddleware from '../middleware/auth-middleware';
import studentController from '../controllers/studentController';

const router = Router();

router.get('/list/students', authMiddleware, studentController.getAllStudents);
router.delete('/student/:id', authMiddleware, studentController.deleteStudentById);

router.post('/add/faculty', authMiddleware, facultyController.createFaculty);
router.get('/list/faculties', authMiddleware, facultyController.getFaculties);
router.delete('/faculty/:id', authMiddleware, facultyController.deleteFaculty);

router.post('/add/cathedra', authMiddleware, cathedraController.createCathedra);
router.get('/list/cathedras', authMiddleware, cathedraController.getCathedras);
router.delete('/cathedra/:id', authMiddleware, cathedraController.deleteCathedra);

router.post('/add/specialty', authMiddleware, specialtyController.createSpecialty);
router.get('/list/specialties', authMiddleware, specialtyController.getSpecialties);
router.delete('/specialty/:id', authMiddleware, specialtyController.deleteSpecialty);

router.post('/add/article', authMiddleware, articleController.createArticle);
router.patch('/edit/article/:id', authMiddleware, articleController.editArticle);
router.get('/list/articles', authMiddleware, articleController.getArticles);
router.delete('/article/:id', authMiddleware, articleController.deleteArticle);

export default router;
