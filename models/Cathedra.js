import { Schema, model } from 'mongoose';

const CathedraSchema = new Schema({
	cathedraID: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	facultyID: { ref: 'Faculty', type: Schema.Types.ObjectId },
});

export default model('Cathedra', CathedraSchema);
