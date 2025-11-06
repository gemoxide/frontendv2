import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from "../../interfaces/common.interface";
import { CreateGrowPresentationAnswersParam, CreateMemberFormAnswersParam, IGrowSlideAnswer } from "../../interfaces/answers.interface";
import { IForm } from "../../interfaces/forms.interface";

export interface Answers {
	createAnswers: CreateAnswer;
	getMemberPresentationDeckFormAnswers: GetMemberPresentationDeckFormAnswers;
	getMemberPresentationDeckGrowAnswers: GetMemberPresentationDeckGrowAnswers;
}

export type CreateAnswer = LoadingResult;

export type CreateAnswerRequestActionPayload = PayloadAction<CreateMemberFormAnswersParam>;

export type GetMemberPresentationDeckFormAnswers = LoadingResult & {
	data?: IForm[];
}

export type GetMemberPresentationDeckGrowAnswers = LoadingResult & {
	data?: IGrowSlideAnswer;
}

export type CreateGrowPresentationAnswersActionPayload =
    PayloadAction<CreateGrowPresentationAnswersParam>;