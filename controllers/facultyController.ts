import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api-error';
import Faculty from '../models/Faculty';
import { ObjectId } from 'mongodb';

class FacultyController {
	async createFaculty(req: Request, res: Response, next: NextFunction) {
		try {
			const { abbreviation, name } = req.body;

			let candidate = await Faculty.findOne({ name });
			if (candidate) {
				throw ApiError.BadRequest('Such faculty exists');
			}
			candidate = await Faculty.findOne({ abbreviation });
			if (candidate) {
				throw ApiError.BadRequest('Such faculty exists');
			}
			const faculty = await Faculty.create({ abbreviation, name });
			return res.json({ faculty });
		} catch (e) {
			next(e);
		}
	}

	async getFaculties(req: Request, res: Response, next: NextFunction) {
		try {
			const faculties = await Faculty.find();
			return res.json({ faculties });
		} catch (e) {
			next(e);
		}
	}

	async deleteFaculty(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const faculty = await Faculty.findById(id);
			if (!faculty) {
				throw ApiError.BadRequest('Such faculty does not exist');
			}
			await Faculty.deleteOne({ _id: new ObjectId(id) });
			return res.json({ faculty });
		} catch (e) {
			next(e);
		}
	}
}

export default new FacultyController();
