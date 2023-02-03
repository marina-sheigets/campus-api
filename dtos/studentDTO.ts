export class StudentDTO {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	yearOfAdmission: string;
	faculty: string;
	cathedra: string;
	specialty: string;
	group: string;
	type: string;

	constructor(model: any) {
		this.email = model.email;
		this.id = model._id;
		this.name = model.name;
		this.phoneNumber = model.phoneNumber;
		this.yearOfAdmission = model.yearOfAdmission;
		this.faculty = model.faculty;
		this.cathedra = model.cathedra;
		this.specialty = model.specialty;
		this.group = model.group;
		this.type = model.type;
	}
}

export class TeacherDTO {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	yearOfEmployment: string;
	faculty: string;
	cathedra: string;
	curator: string;
	position: string;

	constructor(model: any) {
		this.email = model.email;
		this.id = model._id;
		this.name = model.name;
		this.phoneNumber = model.phoneNumber;
		this.yearOfEmployment = model.yearOfEmployment;
		this.faculty = model.faculty;
		this.cathedra = model.cathedra;
		this.curator = model.curator;
		this.position = model.position;
	}
}

export class AdminDTO {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	isAdmin: boolean;

	constructor(model: any) {
		this.email = model.email;
		this.id = model._id;
		this.name = model.name;
		this.phoneNumber = model.phoneNumber;
		this.isAdmin = model.isAdmin;
	}
}
