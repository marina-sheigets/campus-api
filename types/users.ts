export interface StudentBody {
	_id: string;
	name: string;
	password: string;
	email: string;
	phoneNumber: string;
	yearOfAdmission: string;
	faculty: string;
	cathedra: string;
	specialty: string;
	group: string;
	type: string;
	formOfStudying: string;
}

export interface AdminBody {
	name: string;
	password: string;
	email: string;
	phoneNumber: string;
}
export type Error = {
	message: string;
	status: string;
	errors: (string | number)[];
};
