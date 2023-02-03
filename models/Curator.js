import { Schema, model } from 'mongoose';

const CuratorSchema = new Schema({
	groupID: {
		ref: 'Group',
		type: Schema.Types.ObjectId,
	},

	teacherID: {
		ref: 'Teacher',
		type: Schema.Types.ObjectId,
	},
});

export default model('Curator', CuratorSchema);
