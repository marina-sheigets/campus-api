import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api-error';
import { ObjectId } from 'mongodb';
import Specialty from '../models/Specialty';

class SpecialtyController {
	async createSpecialty(req: Request, res: Response, next: NextFunction) {
		try {
			const { number, name } = req.body;

			let candidate = await Specialty.findOne({ name });
			if (candidate) {
				throw ApiError.BadRequest('Such specialty exists');
			}
			candidate = await Specialty.findOne({ number });
			if (candidate) {
				throw ApiError.BadRequest('Such specialty exists');
			}
			const specialty = await Specialty.create({ number, name });
			return res.json({ specialty });
		} catch (e) {
			next(e);
		}
	}

	async getSpecialties(req: Request, res: Response, next: NextFunction) {
		try {
			const specialties = await Specialty.find();
			return res.json({ specialties });
		} catch (e) {
			next(e);
		}
	}

	async deleteSpecialty(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const specialty = await Specialty.findById(id);
			if (!specialty) {
				throw ApiError.BadRequest('Such specialty does not exist');
			}
			await Specialty.deleteOne({ _id: new ObjectId(id) });
			return res.json({ specialty });
		} catch (e) {
			next(e);
		}
	}
}

export default new SpecialtyController();
