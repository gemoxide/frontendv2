import httpClient from "../../clients/httpClient";
import { CreateGrowPresentationAnswersParam, CreateMemberFormAnswersParam, IGrowSlideAnswer } from "../../interfaces/answers.interface";


export const createAnswerRequest = (
	body: CreateMemberFormAnswersParam
) => {
	return httpClient.post(`/api/v1/members/${body.member_id}/presentation-decks/${body.member_presentation_deck_id}/answers`, body);
};


export const getMemberPresentationDeckFormAnswersRequest = (
	member_id: string,
	id: string
) => {
	return httpClient.get(`/api/v1/members/${member_id}/presentation-decks/${id}/answers?include=fields,answer`);
};

export const getMemberPresentationDeckGrowAnswersRequest = (
	member_id: string,
	id: string
) => {
	return httpClient.get(`/api/v1/members/${member_id}/presentation-decks/${id}/answers/grow`);
};

export const createGrowPresentationAnswersRequest = (
	body: CreateGrowPresentationAnswersParam
) => {
	return httpClient.post(`/api/v1/members/${body.member_id}/presentation-decks/${body.id}/answers/grow?include=growSlideAnswer`, body.payload);
};