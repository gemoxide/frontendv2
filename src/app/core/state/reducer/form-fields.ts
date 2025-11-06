import { createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateFormFieldRequestActionPayload,
    GetFormFieldsRequestActionPayload,
    FormFields,
    DeleteFormFieldRequestActionPayload,
    GetFormFieldRequestActionPayload,
    SortFormFieldsRequestActionPayload,
} from "../types/form-fields";

const initialState: FormFields = {
    getFormFields: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createFormField: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateFormField: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteFormField: {
        success: false,
        loading: false,
        error: false,
    },
    getFormField: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    sortFormFields: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const FormFieldsSlice = createSlice({
    name: "formFields",
    initialState,
    reducers: {
        getFormFields(state, actions: GetFormFieldsRequestActionPayload) {
            state.getFormFields = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getFormFieldsSuccess(state, actions) {
            state.getFormFields = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getFormFieldsFailure(state) {
            state.getFormFields = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createFormField(state, actions: CreateFormFieldRequestActionPayload) {
            state.createFormField = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createFormFieldSuccess(state, actions) {
            state.createFormField = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getFormFields.data)
                state.getFormFields.data.data.push(actions.payload);
        },
        createFormFieldFailure(state) {
            state.createFormField = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        deleteFormField(state, actions: DeleteFormFieldRequestActionPayload) {
            state.deleteFormField = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteFormFieldSuccess(state, actions) {
            state.deleteFormField = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getFormFields.data?.data) {
                state.getFormFields.data.data =
                    state.getFormFields.data?.data.filter(
                        (arrow) => arrow.id !== actions.payload.id
                    );
            }
        },
        deleteFormFieldFailure(state) {
            state.deleteFormField = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateFormField(state, actions: CreateFormFieldRequestActionPayload) {
            state.updateFormField = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateFormFieldSuccess(state, actions) {
            state.updateFormField = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getFormFields.data?.data && actions.payload) {
                const updatedNote = actions.payload;
                const findIndex = state.getFormFields.data?.data?.findIndex(
                    (form) => form.id == updatedNote.id
                );

                if (state?.getFormFields?.data?.data?.[findIndex])
                    state.getFormFields.data.data[findIndex] = updatedNote;
            }
        },
        updateFormFieldFailure(state) {
            state.updateFormField = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getFormField(state, actions: GetFormFieldRequestActionPayload) {
            state.getFormField = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getFormFieldSuccess(state, actions) {
            state.getFormField = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getFormFieldFailure(state) {
            state.getFormField = {
                loading: false,
                success: false,
                error: true,
            };
        },

        sortFormFields(state, actions: SortFormFieldsRequestActionPayload) {
            state.sortFormFields = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        sortFormFieldsSuccess(state, actions) {
            state.sortFormFields = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        sortFormFieldsFailure(state) {
            state.sortFormFields = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getFormFields,
    getFormFieldsFailure,
    getFormFieldsSuccess,
    createFormField,
    createFormFieldFailure,
    createFormFieldSuccess,
    deleteFormField,
    deleteFormFieldFailure,
    deleteFormFieldSuccess,
    updateFormFieldFailure,
    updateFormFieldSuccess,
    updateFormField,
    getFormField,
    getFormFieldFailure,
    getFormFieldSuccess,
    sortFormFields,
    sortFormFieldsFailure,
    sortFormFieldsSuccess,
} = FormFieldsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getFormFields,
            createFormField,
            deleteFormField,
            updateFormField,
            getFormField,
            sortFormFields,
        },
        useDispatch()
    );
};

export default FormFieldsSlice.reducer;
