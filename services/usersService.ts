import Student from '../models/Student';
import Teacher from '../models/Teacher';
import bcrypt from 'bcryptjs';
import mailService from './mailService';
import tokenService from './tokenService';
import { TeacherDTO, StudentDTO, AdminDTO } from '../dtos/studentDTO';
import { StudentBody, AdminBody } from '../types/users';
import ApiError from '../exceptions/api-error';
import Admin from '../models/Admin';

class UsersService {
	async adminRegistration(payload: AdminBody) {
		const { name, email, phoneNumber, password } = payload;
		const candidate = await Student.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest('User with such email exists');
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const newAdmin = await Admin.create({
			name,
			password: hashPassword,
			email,
			phoneNumber,
		});
		await mailService.sendMail(email, password);
		const adminDTO = new AdminDTO(newAdmin);
		const tokens = tokenService.generateTokens({ ...adminDTO });
		await tokenService.saveToken(adminDTO.id, tokens.refreshToken);
		return {
			...tokens,
			admin: adminDTO,
		};
	}

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
		const foundPhoneNumber = await Student.findOne({ phoneNumber });
		if (candidate) {
			throw ApiError.BadRequest('Student with such email exists');
		}
		if (foundPhoneNumber) {
			throw ApiError.BadRequest('Student with such phone number exists');
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
		let admin = await Admin.findOne({ email });
		if (!student && !teacher && !admin) {
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
				user: teacherDTO,
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
				user: studentDTO,
			};
		} else if (admin) {
			const isPasswordsEqual = await bcrypt.compare(password, admin.password);
			if (!isPasswordsEqual) {
				throw ApiError.BadRequest('Password is incorrect');
			}
			const adminDTO = new AdminDTO(admin);
			const tokens = tokenService.generateTokens({ ...adminDTO });
			await tokenService.saveToken(adminDTO.id, tokens.refreshToken);
			return {
				...tokens,
				user: adminDTO,
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
		let admin = await Admin.findById(tokenData.user);
		if (student) {
			const studentDTO = new StudentDTO(student);
			const tokens = tokenService.generateTokens({ ...studentDTO });
			await tokenService.saveToken(studentDTO.id, tokens.refreshToken);
			return {
				...tokens,
				user: studentDTO,
			};
		} else if (teacher) {
			const teacherDTO = new TeacherDTO(teacher);
			const tokens = tokenService.generateTokens({ ...teacherDTO });
			await tokenService.saveToken(teacherDTO.id, tokens.refreshToken);
			return {
				...tokens,
				user: teacherDTO,
			};
		} else if (admin) {
			const adminDTO = new AdminDTO(admin);
			const tokens = tokenService.generateTokens({ ...adminDTO });
			await tokenService.saveToken(adminDTO.id, tokens.refreshToken);
			return {
				...tokens,
				user: adminDTO,
			};
		}
	}
}

export default new UsersService();
