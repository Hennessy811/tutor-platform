/* eslint-disable camelcase */
export interface Tutor {
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	email: string;
	provider: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	role: string;
	id: string;
}

export interface Student {
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	email: string;
	provider: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	role: string;
	id: string;
}

export interface Step {
	_id: string;
	title: string;
	description: string;
	__v: number;
	id: string;
}

export interface Curriculum {
	_id: string;
	title: string;
	description: string;
	steps: Step[];
	__v: number;
	id: string;
}

export interface Schedule {
	_id: string;
	startDate: Date | string;
	endDate: Date | string;
	title: string;
	published_at: Date | string;
	createdAt: Date | string;
	updatedAt: Date | string;
	__v: number;
	course: string;
	id: string;
}

export interface Course {
	tutors: Tutor[];
	students: Student[];
	parents: any[];
	_id: string;
	title: string;
	subject: string;
	published_at: string;
	curriculum: Curriculum;
	createdAt: string;
	updatedAt: string;
	__v: number;
	schedule: Schedule[];
	id: string;
}
