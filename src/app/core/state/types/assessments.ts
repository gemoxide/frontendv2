import { LoadingResult } from "../../interfaces/common.interface";
import { IAssessments, IAssessmentsResponse } from "../../interfaces/assessments.interface";

export interface Assessments {
	getAssessments: GetAssessments;
}

export type GetAssessments = LoadingResult & {
	data?: IAssessments;
}
