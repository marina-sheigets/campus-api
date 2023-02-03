import { Schema, model } from 'mongoose';

const SpecialtySchema = new Schema({
	specialtyID: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	cathedraID: {
		ref: 'Cathedra',
		type: Schema.Types.ObjectId,
	},
});

export default model('Specialty', SpecialtySchema);
