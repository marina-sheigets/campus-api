import { NextFunction, Request, Response } from 'express';
import Student from '../models/Student';
import { StudentBody } from '../types/users';
import ApiError from '../exceptions/api-error';
import { ObjectId } from 'mongodb';

class StudentController {
	async getAllStudents(req: Request, res: Response, next: NextFunction) {
		try {
			let students: any = await Student.find();
			students = students.map(
				({
					_id,
					name,
					email,
					phoneNumber,
					yearOfAdmission,
					faculty,
					cathedra,
					specialty,
					group,
					type,
				}: StudentBody) => ({
					id: _id,
					name,
					email,
					phoneNumber,
					yearOfAdmission,
					faculty,
					cathedra,
					specialty,
					group,
					type,
				})
			);
			return res.json({ students });
		} catch (e) {
			next(e);
		}
	}

	async deleteStudentById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const student = await Student.findById(id);
			if (!student) {
				throw ApiError.BadRequest('Such student does not exist');
			}
			await Student.deleteOne({ _id: new ObjectId(id) });
			return res.json({ student });
		} catch (e) {
			next(e);
		}
	}
}

export default new StudentController();
