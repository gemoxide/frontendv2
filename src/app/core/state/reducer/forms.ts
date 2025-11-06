import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateFormRequestActionPayload,
    GetFormsRequestActionPayload,
    Forms,
    UpdateFormStatusRequestActionPayload
} from "../types/forms";

const initialState: Forms = {
    getForms: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createForm: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateForm: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteForm: {
        success: false,
        loading: false,
        error: false,
    },
    getForm: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateAdminFormStatus: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    cloneForm: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const FormsSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        getForms(state, actions: GetFormsRequestActionPayload) {
            state.getForms = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getFormsSuccess(state, actions) {
            state.getForms = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getFormsFailure(state) {
            state.getForms = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createForm(state, actions: CreateFormRequestActionPayload) {
            state.createForm = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createFormSuccess(state, actions) {
            state.createForm = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getForms.data)
                state.getForms.data.data.unshift(actions.payload);
        },
        createFormFailure(state) {
            state.createForm = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        deleteForm(state, actions) {
            state.deleteForm = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteFormSuccess(state, actions) {
            state.deleteForm = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getForms.data?.data) {
                state.getForms.data.data = state.getForms.data?.data.filter(
                    (arrow) => arrow.id !== actions.payload.id
                );
            }
        },
        deleteFormFailure(state) {
            state.deleteForm = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateForm(state, actions: CreateFormRequestActionPayload) {
            state.updateForm = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateFormSuccess(state, actions) {
            state.updateForm = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getForms.data?.data && actions.payload) {
                const updateForm = actions.payload;
                const findIndex = state.getForms.data?.data?.findIndex(
                    (form) => form.id == updateForm.id
                );
                if (state?.getForms?.data?.data?.[findIndex])
                    state.getForms.data.data[findIndex] = updateForm;
            }

            if (state?.getForm?.data) {
                const updateForm = actions.payload;
                state.getForm.data = updateForm;
            }
        },
        updateFormFailure(state) {
            state.updateForm = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        updateAdminFormStatus(state, actions: UpdateFormStatusRequestActionPayload) {
            state.updateAdminFormStatus = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateAdminFormStatusSuccess(state, actions) {
            state.updateAdminFormStatus = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getForms.data?.data && actions.payload) {
                const updateForm = actions.payload;
                const findIndex = state.getForms.data?.data?.findIndex(
                    (form) => form.id == updateForm.id
                );
                if (state?.getForms?.data?.data?.[findIndex])
                    state.getForms.data.data[findIndex] = updateForm;
            }

            if (state?.getForm?.data) {
                const updateForm = actions.payload;
                state.getForm.data = updateForm;
            }
        },
        updateAdminFormStatusFailure(state) {
            state.updateAdminFormStatus = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },


        getForm(state, actions: PayloadAction<number>) {
            state.getForm = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getFormSuccess(state, actions) {
            state.getForm = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getFormFailure(state) {
            state.getForm = {
                loading: false,
                success: false,
                error: true,
            };
        },

        cloneForm(state, actions: PayloadAction<number>) {
            state.cloneForm = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        cloneFormSuccess(state, actions) {
            state.cloneForm = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getForms.data)
                state.getForms.data.data.unshift(actions.payload);
        },
        cloneFormFailure(state) {
            state.cloneForm = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

    },
});

export const {
    getForms,
    getFormsFailure,
    getFormsSuccess,
    createForm,
    createFormFailure,
    createFormSuccess,
    deleteForm,
    deleteFormFailure,
    deleteFormSuccess,
    updateFormFailure,
    updateFormSuccess,
    updateForm,
    getForm,
    getFormFailure,
    getFormSuccess,
    updateAdminFormStatus,
    updateAdminFormStatusFailure,
    updateAdminFormStatusSuccess,
    cloneForm,
    cloneFormFailure,
    cloneFormSuccess
} = FormsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getForms,
            createForm,
            deleteForm,
            updateForm,
            getForm,
            updateAdminFormStatus,
            cloneForm
        },
        useDispatch()
    );
};

export default FormsSlice.reducer;
