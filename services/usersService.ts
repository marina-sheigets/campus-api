import Student from '../models/Student';
import Teacher from '../models/Teacher';
import bcrypt from 'bcryptjs';
import mailService from './mailService';
import tokenService from './tokenService';
import { TeacherDTO, StudentDTO } from '../dtos/studentDTO';
import { StudentBody } from '../types/users';
import ApiError from '../exceptions/api-error';

class UsersService {
	//registration for student
	async studentRegistration(payload: StudentBody) {
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
		} = payload;
		const candidate = await Student.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest('User with such email exists');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const newStudent = await Student.create({
			name,
			password: hashPassword,
			email,
			phoneNumber,
			yearOfAdmission,
			faculty,
			cathedra,
			specialty,
			group,
			type,
		});
		await mailService.sendMail(email, password);
		const studentDTO = new StudentDTO(newStudent);
		const tokens = tokenService.generateTokens({ ...studentDTO });
		await tokenService.saveToken(studentDTO.id, tokens.refreshToken);
		return {
			...tokens,
			student: studentDTO,
		};
	}

	async login(email: string, password: string) {
		let student = await Student.findOne({ email });
		let teacher = await Teacher.findOne({ email });
		if (!student && !teacher) {
			throw ApiError.BadRequest('User was not found');
		}

		if (teacher) {
			const isPasswordsEqual = await bcrypt.compare(password, teacher.password);
			if (!isPasswordsEqual) {
				throw ApiError.BadRequest('Password is incorrect');
			}
			const teacherDTO = new TeacherDTO(teacher);
			const tokens = tokenService.generateTokens({ ...teacherDTO });
			await tokenService.saveToken(teacherDTO.id, tokens.refreshToken);
			return {
				...tokens,
				teacher: teacherDTO,
			};
		} else if (student) {
			const isPasswordsEqual = await bcrypt.compare(password, student.password);
			if (!isPasswordsEqual) {
				throw ApiError.BadRequest('Password is incorrect');
			}
			const studentDTO = new StudentDTO(student);
			const tokens = tokenService.generateTokens({ ...studentDTO });
			await tokenService.saveToken(studentDTO.id, tokens.refreshToken);
			return {
				...tokens,
				student: studentDTO,
			};
		}
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenData = await tokenService.findToken(refreshToken);
		if (!userData || !tokenData) {
			throw ApiError.UnauthorizedError();
		}
		let student = await Student.findById(tokenData.user);
		let teacher = await Teacher.findById(tokenData.user);

		if (student) {
			const studentDTO = new StudentDTO(student);
			const tokens = tokenService.generateTokens({ ...studentDTO });
			await tokenService.saveToken(studentDTO.id, tokens.refreshToken);
			return {
				...tokens,
				student: studentDTO,
			};
		} else if (teacher) {
			const teacherDTO = new TeacherDTO(teacher);
			const tokens = tokenService.generateTokens({ ...teacherDTO });
			await tokenService.saveToken(teacherDTO.id, tokens.refreshToken);
			return {
				...tokens,
				teacher: teacherDTO,
			};
		}
	}
}

export default new UsersService();
