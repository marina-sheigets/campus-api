import { Schema, model } from 'mongoose';

const SpecialtySchema = new Schema({
	number: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

export default model('Specialty', SpecialtySchema);
