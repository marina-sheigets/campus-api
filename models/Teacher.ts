import { Schema, model } from 'mongoose';

const TeacherSchema = new Schema({
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
	yearOfEmployment: {
		type: Date,
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
	curator: {
		type: String,
		required: false,
		unique: true,
	},
	position: {
		type: String,
		required: true,
		unique: false,
	},
});

export default model('Teacher', TeacherSchema);
