import { Request, Response, NextFunction } from 'express';
import usersService from '../services/usersService';
import { generatePassword } from '../utils/generatePassword';

class UsersController {
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
}
export default new UsersController();
