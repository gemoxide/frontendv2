import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { handleServerException } from "../../services/utils/utils.service";
import { getAssessmentsRequest } from "../../services/assessment/assessment.service";
import { getAssessments, getAssessmentsFailure, getAssessmentsSuccess } from "../reducer/assessments";

function* getAssessmentSaga() {
	try {
		const { data } : AxiosResponse = yield call(getAssessmentsRequest);
		yield put(getAssessmentsSuccess(data));
	} catch (err: any) {
		yield call(
			handleServerException,
			err,
			getAssessmentsFailure.type,
			true
		);
	}
}

export function* rootSaga() {
	yield takeLatest(
		getAssessments.type,
		getAssessmentSaga
	);
}