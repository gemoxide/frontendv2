import { PayloadAction, bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { Answers, CreateAnswerRequestActionPayload } from "../types/answers";
import { useDispatch } from "react-redux";

const initialState: Answers = {
	createAnswers: {
		success: false,
		loading: false,
		error: false,
	},
	getMemberPresentationDeckFormAnswers: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	},
	getMemberPresentationDeckGrowAnswers: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	},
}

const AnswersSlice = createSlice({
	name: "answers",
	initialState,
	reducers: {
		createAnswers(state, actions: CreateAnswerRequestActionPayload) {
			state.createAnswers = {
				loading: true,
				success: false,
				error: false,
			};
		},
		createAnswersSuccess(state, actions) {
			state.createAnswers = {
				loading: false,
				success: true,
				error: false,
			};
		},
		createAnswersFailure(state) {
			state.createAnswers = {
				loading: false,
				success: false,
				error: true,
			};
		},

		getMemberPresentationDeckFormAnswers(
			state,
			actions: PayloadAction<{ member_id: string; id: string }>
		) {
			state.getMemberPresentationDeckFormAnswers = {
				loading: true,
				success: false,
				error: false,
			};
		},
		getMemberPresentationDeckFormAnswersSuccess(state, actions) {
			state.getMemberPresentationDeckFormAnswers = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			};
		},
		getMemberPresentationDeckFormAnswersFailure(state) {
			state.getMemberPresentationDeckFormAnswers = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			};
		},

		getMemberPresentationDeckGrowAnswers(
			state,
			actions: PayloadAction<{ member_id: string; id: string }>
		) {
			state.getMemberPresentationDeckGrowAnswers = {
				loading: true,
				success: false,
				error: false,
			};
		},
		getMemberPresentationDeckGrowAnswersSuccess(state, actions) {
			state.getMemberPresentationDeckGrowAnswers = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			};
		},
		getMemberPresentationDeckGrowAnswersFailure(state) {
			state.getMemberPresentationDeckGrowAnswers = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			};
		},
	}
})


export const {
	createAnswers,
	createAnswersFailure,
	createAnswersSuccess,
	getMemberPresentationDeckFormAnswers,
	getMemberPresentationDeckFormAnswersFailure,
	getMemberPresentationDeckFormAnswersSuccess,
	getMemberPresentationDeckGrowAnswers,
	getMemberPresentationDeckGrowAnswersFailure,
	getMemberPresentationDeckGrowAnswersSuccess
} = AnswersSlice.actions;

export const mapDispatchToProps = () => {
	return bindActionCreators({
		createAnswers,
		getMemberPresentationDeckFormAnswers,
		getMemberPresentationDeckGrowAnswers
	}, useDispatch())

}

export default AnswersSlice.reducer;