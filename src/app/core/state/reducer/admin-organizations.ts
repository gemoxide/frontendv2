import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    AdminOrganizations,
    CreateAdminOrganizationRequestActionPayload,
    GetAdminOrganizationsRequestActionPayload,
} from "../types/admin-organization";

const initialState: AdminOrganizations = {
    getAdminOrganization: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getAdminOrganizations: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createAdminOrganization: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateAdminOrganization: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteAdminOrganization: {
        success: false,
        loading: false,
        error: false,
    },
};

const adminOrganizationsSlice = createSlice({
    name: "adminOrganizations",
    initialState,
    reducers: {
        getAdminOrganizations(
            state,
            actions: GetAdminOrganizationsRequestActionPayload
        ) {
            state.getAdminOrganizations = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminOrganizationsSuccess(state, actions) {
            state.getAdminOrganizations = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminOrganizationsFailure(state) {
            state.getAdminOrganizations = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getAdminOrganization(
            state,
            actions: GetAdminOrganizationsRequestActionPayload
        ) {
            state.getAdminOrganization = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminOrganizationSuccess(state, actions) {
            state.getAdminOrganization = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminOrganizationFailure(state) {
            state.getAdminOrganization = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createAdminOrganization(
            state,
            actions: CreateAdminOrganizationRequestActionPayload
        ) {
            state.createAdminOrganization = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createAdminOrganizationSuccess(state, actions) {
            state.createAdminOrganization = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createAdminOrganizationFailure(state) {
            state.createAdminOrganization = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteAdminOrganization(state, actions: PayloadAction<number>) {
            state.deleteAdminOrganization = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteAdminOrganizationSuccess(state, actions) {
            state.deleteAdminOrganization = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteAdminOrganizationFailure(state) {
            state.deleteAdminOrganization = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateAdminOrganization(
            state,
            actions: CreateAdminOrganizationRequestActionPayload
        ) {
            state.updateAdminOrganization = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateAdminOrganizationSuccess(state, actions) {
            state.updateAdminOrganization = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateAdminOrganizationFailure(state) {
            state.updateAdminOrganization = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getAdminOrganization,
    getAdminOrganizationSuccess,
    getAdminOrganizationFailure,
    getAdminOrganizations,
    getAdminOrganizationsSuccess,
    getAdminOrganizationsFailure,
    createAdminOrganization,
    createAdminOrganizationFailure,
    createAdminOrganizationSuccess,
    updateAdminOrganization,
    updateAdminOrganizationFailure,
    updateAdminOrganizationSuccess,
    deleteAdminOrganization,
    deleteAdminOrganizationFailure,
    deleteAdminOrganizationSuccess,
} = adminOrganizationsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getAdminOrganization,
            getAdminOrganizations,
            createAdminOrganization,
            updateAdminOrganization,
            deleteAdminOrganization,
        },
        useDispatch()
    );
};

export default adminOrganizationsSlice.reducer;
