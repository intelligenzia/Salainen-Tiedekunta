import { Teacher } from './teacher';

export type Course = {
	courseId: string;
	ects: number;
	name: string;
	description: any;
	teacher: Teacher;
};
