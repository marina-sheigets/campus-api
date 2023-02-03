import bcrypt from 'bcryptjs';
import Student from '../models/Student';

class AdminController {
	async createStudent(req: any, res: any, next: any) {
		try {
			const {
				name,
				email,
				phoneNumber,
				yearOfAdmission,
				group,
				faculty,
				cathedra,
				specialty,
				type,
				password,
			} = req.body;

			const candidate = await Student.findOne({ email });
			if (candidate) {
				return res.status(409).json({ message: 'User already exists' });
			}
			const hashPassword = await bcrypt.hash(password, 4);
			const student = await Student.create({
				fullName: name,
				password: hashPassword,
				email,
				phoneNumber,
				yearOfAdmission,
				faculty,
				cathedra,
				specialty,
				group,
				formOfStudying: type,
			});
			return res.status(200).json(student);
		} catch (err) {
			return res.status(400).json(err);
		}
	}
}

export default new AdminController();
