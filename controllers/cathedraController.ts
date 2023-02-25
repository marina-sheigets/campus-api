import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api-error';
import Faculty from '../models/Faculty';
import { ObjectId } from 'mongodb';
import Cathedra from '../models/Cathedra';
import { FacultyBody } from '../types/faculty';

class CathedraController {
	async createCathedra(req: Request, res: Response, next: NextFunction) {
		try {
			const { abbreviation, name, facultyName } = req.body;
			const faculty: FacultyBody | null = await Faculty.findOne({ name: facultyName });
			if (!faculty) {
				throw ApiError.BadRequest('Faculty was not found !');
			}
			let candidate = await Cathedra.findOne({ name });
			if (candidate) {
				throw ApiError.BadRequest('Such cathedra exists');
			}
			candidate = await Cathedra.findOne({ abbreviation });
			if (candidate) {
				throw ApiError.BadRequest('Such cathedra exists');
			}
			const cathedra = await Cathedra.create({ abbreviation, name, faculty: faculty.name });
			return res.json({ cathedra });
		} catch (e) {
			next(e);
		}
	}

	async getCathedras(req: Request, res: Response, next: NextFunction) {
		try {
			const cathedras = await Cathedra.find();
			return res.json({ cathedras });
		} catch (e) {
			next(e);
		}
	}

	async deleteCathedra(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const cathedra = await Cathedra.findById(id);
			if (!cathedra) {
				throw ApiError.BadRequest('Such cathedra does not exist');
			}
			await Cathedra.deleteOne({ _id: new ObjectId(id) });
			return res.json({ cathedra });
		} catch (e) {
			next(e);
		}
	}
}

export default new CathedraController();
