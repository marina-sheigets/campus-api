import { Schema, model } from 'mongoose';

const CathedraSchema = new Schema({
	abbreviation: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	faculty: { type: String, required: true, unique: false },
});

export default model('Cathedra', CathedraSchema);
