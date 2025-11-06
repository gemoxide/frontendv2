import { PayloadAction, bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Assessments } from "../types/assessments";

const initialState: Assessments = {
	getAssessments: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	},
}

const Assessments = createSlice({
	name: "assessments",
	initialState,
	reducers: {
		getAssessments(state,actions: PayloadAction) {
			state.getAssessments = {
				loading: true,
				success: false,
				error: false,
			};
		},
		getAssessmentsSuccess(state, actions) {
			state.getAssessments = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			};
		},
		getAssessmentsFailure(state) {
			state.getAssessments = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			};
		},
	}
})


export const {
	getAssessments,
	getAssessmentsFailure,
	getAssessmentsSuccess
} = Assessments.actions;

export const mapDispatchToProps = () => {
	return bindActionCreators({getAssessments}, useDispatch())
}

export default Assessments.reducer;