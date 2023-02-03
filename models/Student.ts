import { Schema, model } from 'mongoose';

const StudentSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: false,
	},
	phoneNumber: {
		type: String,
		required: false,
		unique: true,
	},
	yearOfAdmission: {
		type: String,
		required: true,
		unique: false,
	},
	faculty: {
		type: String,
		required: true,
		unique: false,
	},
	cathedra: {
		type: String,
		required: true,
		unique: false,
	},
	specialty: {
		type: String,
		required: true,
		unique: false,
	},
	type: {
		type: String,
		required: true,
		unique: false,
	},
	group: {
		type: String,
		required: true,
		unique: false,
	},
});

export default model('Student', StudentSchema);
