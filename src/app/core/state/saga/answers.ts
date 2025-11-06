import { AxiosResponse } from "axios";
import { createAnswerRequest, getMemberPresentationDeckFormAnswersRequest, getMemberPresentationDeckGrowAnswersRequest } from "../../services/answers/answers.service";
import { createAnswers, createAnswersFailure, createAnswersSuccess, getMemberPresentationDeckFormAnswers, getMemberPresentationDeckFormAnswersFailure, getMemberPresentationDeckFormAnswersSuccess, getMemberPresentationDeckGrowAnswers, getMemberPresentationDeckGrowAnswersFailure, getMemberPresentationDeckGrowAnswersSuccess } from "../reducer/answers";
import { call, put, takeLatest } from "redux-saga/effects";
import { handleServerException } from "../../services/utils/utils.service";
import { PayloadAction } from "@reduxjs/toolkit";

function* createAnswersSaga(actions: any) {
	try {
		const { data }: AxiosResponse = yield call(
			createAnswerRequest,
			actions.payload
		);
		yield put(createAnswersSuccess(data));
	} catch (err: any) {
		yield call(
			handleServerException,
			err,
			createAnswersFailure.type,
			true
		);
	}
}



function* getMemberPresentationDeckFormAnswersSaga(
	actions: PayloadAction<{ member_id: string; id: string }>
) {
	try {
		const { data }: AxiosResponse = yield call(
			getMemberPresentationDeckFormAnswersRequest,
			actions.payload.member_id,
			actions.payload.id
		);
		yield put(
			getMemberPresentationDeckFormAnswersSuccess(data)
		);
	} catch (err: any) {
		yield call(
			handleServerException,
			err,
			getMemberPresentationDeckFormAnswersFailure.type,
			true
		);
	}
}


function* getMemberPresentationDeckGrowAnswersSaga(
	actions: PayloadAction<{ member_id: string; id: string }>
) {
	try {
		const { data }: AxiosResponse = yield call(
			getMemberPresentationDeckGrowAnswersRequest,
			actions.payload.member_id,
			actions.payload.id
		);
		yield put(
			getMemberPresentationDeckGrowAnswersSuccess(data)
		);
	} catch (err: any) {
		yield call(
			handleServerException,
			err,
			getMemberPresentationDeckGrowAnswersFailure.type,
			true
		);
	}
}

export function* rootSaga() {
	yield takeLatest(
		createAnswers.type,
		createAnswersSaga
	);
	yield takeLatest(
		getMemberPresentationDeckFormAnswers.type,
		getMemberPresentationDeckFormAnswersSaga
	);
	yield takeLatest(
		getMemberPresentationDeckGrowAnswers.type,
		getMemberPresentationDeckGrowAnswersSaga
	);
}