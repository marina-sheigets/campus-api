import { ObjectId } from 'mongodb';
import { NextFunction, Response, Request } from 'express';
import ApiError from '../exceptions/api-error';
import Article from '../models/Article';

class ArticleController {
	async createArticle(req: Request, res: Response, next: NextFunction) {
		try {
			const { content, name, links } = req.body;

			const article = await Article.create({ content, name, links });
			return res.json({ article });
		} catch (e) {
			next(e);
		}
	}

	async getArticles(req: Request, res: Response, next: NextFunction) {
		try {
			const articles = await Article.find();
			return res.json({ articles });
		} catch (e) {
			next(e);
		}
	}

	async deleteArticle(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const article = await Article.findById(id);
			if (!article) {
				throw ApiError.BadRequest('Such article does not exist');
			}
			await Article.deleteOne({ _id: new ObjectId(id) });
			return res.json({ article });
		} catch (e) {
			next(e);
		}
	}
	async editArticle(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { name, content, links } = req.body;
			let articleCandidate = await Article.findById(id);
			if (!articleCandidate) {
				throw ApiError.BadRequest('Such article does not exist');
			}

			const article = await Article.updateOne(
				{ _id: articleCandidate.id },
				{
					$set: {
						name,
						content,
						links,
					},
				}
			);

			return res.json({ article });
		} catch (e) {
			next(e);
		}
	}
}

export default new ArticleController();
