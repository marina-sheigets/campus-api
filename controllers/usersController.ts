import { Request, Response, NextFunction } from 'express';
import usersService from '../services/usersService';
import { generatePassword } from '../utils/generatePassword';
import Student from '../models/Student';
import ApiError from '../exceptions/api-error';
import mailService from '../services/mailService';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

class UsersController {
	async adminRegistration(req: Request, res: Response, next: NextFunction) {
		try {
			const password = generatePassword(8);
			const adminData = await usersService.adminRegistration({ ...req.body, password });
			res.cookie('refreshToken', adminData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(adminData);
		} catch (e) {
			next(e);
		}
	}

	async studentRegistration(req: Request, res: Response, next: NextFunction) {
		try {
			const password = generatePassword(8);
			const studentData = await usersService.studentRegistration({ ...req.body, password });
			res.cookie('refreshToken', studentData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(studentData);
		} catch (e) {
			next(e);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const userData = await usersService.login(email, password);
			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await usersService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.status(200).json({ token });
		} catch (e) {
			next(e);
		}
	}
	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await usersService.refresh(refreshToken);
			res.cookie('refreshToken', userData?.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.status(200).json(userData);
		} catch (e) {
			next(e);
		}
	}

	async restore(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			let studentCandidate = await Student.findOne({ email });
			// if (!candidate) {
			// 	throw ApiError.BadRequest('User with such email does not exists');
			// }
			let adminCandidate = await Admin.findOne({ email });
			if (!studentCandidate && !adminCandidate) {
				throw ApiError.BadRequest('User with such email does not exists');
			}
			//candidate  = await Teacher.findOne({email});
			// if(!candidate){
			// 	throw ApiError.BadRequest('User with such email does not exists');
			// }
			const password = generatePassword(8);
			const hashPassword = await bcrypt.hash(password, 3);

			if (adminCandidate) {
				adminCandidate.password = hashPassword;
				await adminCandidate.save();
			} else if (studentCandidate) {
				studentCandidate.password = hashPassword;
				await studentCandidate.save();
			}
			await mailService.sendNewPassword(email, password);

			return res
				.status(200)
				.json({ message: 'The new password was sent on your email address' });
		} catch (e) {
			next(e);
		}
	}
}
export default new UsersController();
