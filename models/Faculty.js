import { Schema, model } from 'mongoose';

const FacultySchema = new Schema({
	facultyID: {
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

export default model('Faculty', FacultySchema);
