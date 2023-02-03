import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import tokenService from '../services/tokenService';
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const accessToken = req.headers.authorization;
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}
		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}
		// @ts-ignore
		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.UnauthorizedError());
	}
}
