import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema({
	subjectID: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	teacherID: {
		ref: 'Teacher',
		type: Schema.Types.ObjectId,
	},

	groupID: [
		{
			ref: 'Teacher',
			type: Schema.Types.ObjectId,
		},
	],
});

export default model('Subject', SubjectSchema);
