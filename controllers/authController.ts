import { validationResult } from 'express-validator';
import dayjs from 'dayjs';
import 'dotenv/config';
import StudentService from '../services/studentService';

class AuthController {
	async studentRegistration(req: any, res: any, next: any) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next('Validation error');
			}

			const userData = await StudentService.studentRegistration(req.body);
			res.cookie(process.env.REFRESH_TOKEN, userData.refreshToken, {
				expires: dayjs().add(30, 'days').toDate(),
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			return res.status(400).json(err);
		}
	}

	async login(req: any, res: any, next: any) {
		try {
		} catch (err) {}
	}

	async logout(req: any, res: any, next: any) {
		try {
		} catch (err) {}
	}

	async refresh(req: any, res: any, next: any) {
		try {
		} catch (err) {}
	}
}

export default new AuthController();
