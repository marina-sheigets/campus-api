import { Schema, model } from 'mongoose';

const GroupSchema = new Schema({
	groupID: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	curatorID: {
		ref: 'Curator',
		type: Schema.Types.ObjectId,
	},
});

export default model('Group', GroupSchema);
