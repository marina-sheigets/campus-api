import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
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
	isAdmin: { type: Boolean, required: false, default: true },
});
export default model('Admin', AdminSchema);
