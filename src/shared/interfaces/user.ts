export interface Role {
	_id: string;
	name: string;
	description: string;
	type: string;
	__v: number;
	id: string;
}

export interface User {
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	email: string;
	provider: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	role: Role;
	id: string;
}
