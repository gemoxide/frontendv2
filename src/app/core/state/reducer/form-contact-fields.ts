import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { CreateFormContactFieldRequestActionPayload, FormContactFields } from "../types/form-contact-fields";
import { useDispatch } from "react-redux";

const initialState: FormContactFields = {
	createFormContactField: {
		data: undefined,
		success: false,
		loading: false,
		error: false
	},
	getFormContactFields: {
		data: undefined,
		success: false,
		loading: false,
		error: false,
	}
}

const formContactFieldsSlice = createSlice({
	name: 'formContactFields',
	initialState,
	reducers: {
		getFormContactFields(state) {
			state.getFormContactFields = {
				data: undefined,
				loading: true,
				success: false,
				error: false,
			}
		},
		getFormContactFieldsSuccess(state, actions) {
			state.getFormContactFields = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			}
		},
		getFormContactFieldsFailure(state, actions) {
			state.getFormContactFields = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			}
		},
		createFormContactField(state, actions: CreateFormContactFieldRequestActionPayload) {
			state.createFormContactField = {
				data: undefined,
				loading: true,
				success: false,
				error: false,
			};
		},
		createFormContactFieldSuccess(state, actions) {
			state.createFormContactField = {
				data: actions.payload,
				loading: false,
				success: true,
				error: false,
			};
		},
		createFormContactFieldFailure(state) {
			state.createFormContactField = {
				data: undefined,
				loading: false,
				success: false,
				error: true,
			};
		},
	}
})

export const {
	createFormContactField,
	createFormContactFieldFailure,
	createFormContactFieldSuccess,
	getFormContactFields,
	getFormContactFieldsFailure,
	getFormContactFieldsSuccess
} = formContactFieldsSlice.actions;

export const mapDispatchToProps = () => {
	return bindActionCreators({
		createFormContactField,
		getFormContactFields
	}, useDispatch())

}

export default formContactFieldsSlice.reducer;