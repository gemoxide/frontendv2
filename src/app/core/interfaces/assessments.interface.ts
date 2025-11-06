import { IMeta } from "./common.interface";
import { IUser } from "./user.interface";

export interface IAssessmentType {
	id: number
	name: string
}

export interface IAssessmentMode {
	id: number
	name: string
}

export interface IAssessmentsResponse {
	data: IAssessments;
}

export type IAssessments = {
	type: string;
	attributes: {
		types: IAssessmentType[];
		modes: IAssessmentMode[];
	}
}

export type AssessmentOption = {
	label: string;
	value: number;
};