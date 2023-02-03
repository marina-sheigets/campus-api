export interface StudentBody {
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
}

export type Error = {
	message: string;
	status: string;
	errors: (string | number)[];
};
