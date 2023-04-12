import { Schema, model } from 'mongoose';

const ArticleSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
	content: {
		type: String,
		required: true,
		unique: false,
	},
	links: [
		{
			type: String,
			required: false,
			unique: false,
		},
	],
});

export default model('Article', ArticleSchema);
