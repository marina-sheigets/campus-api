import Student from '../models/Student';
import bcrypt from 'bcryptjs';
import ApiError from '../exceptions/api-error';
import StudentDTO from '../dtos/studentDTO';
import TokenService from './tokenService';
import * as types from '../types/users';

class StudentService {
	async studentRegistration({
		fullName,
		password,
		email,
		phoneNumber,
		yearOfAdmission,
		faculty,
		cathedra,
		specialty,
		group,
		formOfStudying,
	}: types.Student) {
		const candidate = await Student.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(`User with ${email} already  exists`);
		}

		const hashPassword = await bcrypt.hash(password, 4);

		const student = await Student.create({
			fullName,
			password: hashPassword,
			email,
			phoneNumber,
			yearOfAdmission,
			faculty,
			cathedra,
			specialty,
			group,
			formOfStudying,
		});

		const studentDTO = new StudentDTO(student);
		const tokens = TokenService.generateTokens({ ...studentDTO });
		await TokenService.saveToken(studentDTO.id, tokens.refreshToken);

		return {
			...tokens,
			student: studentDTO,
		};
	}
}

export default new StudentService();
