import { Schema, model } from 'mongoose';

const AssessmentSchema = new Schema({
	assessmentID: {
		type: String,
		required: true,
		unique: true,
	},
	subjectID: {
		ref: 'Subject',
		type: Schema.Types.ObjectId,
	},

	studentID: {
		ref: 'Student',
		type: Schema.Types.ObjectId,
	},
	grade: {
		type: Number,
		required: true,
		unique: false,
	},
	date: {
		type: Date,
		required: true,
		unique: false,
	},
	comment: {
		type: String,
		required: false,
		unique: false,
	},

	teacherID: {
		ref: 'Teacher',
		type: Schema.Types.ObjectId,
	},
});

export default model('Assessment', AssessmentSchema);
