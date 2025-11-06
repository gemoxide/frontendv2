import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    AdminRoles,
    GetAdminRolesRequestActionPayload,
    CreateAdminRequestActionPayload,
    GetAdminRolesByTypeRequestActionPayload,
} from "../types/admin-roles";

const initialState: AdminRoles = {
    getAdminRoles: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createAdminRole: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteAdminRole: {
        success: false,
        loading: false,
        error: false,
    },

    updateAdminRole: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getAdminRolesByType: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const adminRolesSLice = createSlice({
    name: "adminRoles",
    initialState,
    reducers: {
        getAdminRoles(state, actions: GetAdminRolesRequestActionPayload) {
            state.getAdminRoles = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminRolesSuccess(state, actions) {
            state.getAdminRoles = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminRolesFailure(state) {
            state.getAdminRoles = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createAdminRole(state, actions: CreateAdminRequestActionPayload) {
            state.createAdminRole = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createAdminRoleSuccess(state, actions) {
            state.createAdminRole = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createAdminRoleFailure(state) {
            state.createAdminRole = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteAdminRole(state, actions: PayloadAction<number>) {
            state.deleteAdminRole = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteAdminRoleSuccess(state, actions) {
            state.deleteAdminRole = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteAdminRoleFailure(state) {
            state.deleteAdminRole = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateAdminRole(state, actions: CreateAdminRequestActionPayload) {
            state.updateAdminRole = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateAdminRoleSuccess(state, actions) {
            state.updateAdminRole = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateAdminRoleFailure(state) {
            state.updateAdminRole = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getAdminRolesByType(
            state,
            actions: GetAdminRolesByTypeRequestActionPayload
        ) {
            state.getAdminRolesByType = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminRolesByTypeSuccess(state, actions) {
            state.getAdminRolesByType = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminRolesByTypeFailure(state) {
            state.getAdminRolesByType = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getAdminRoles,
    getAdminRolesSuccess,
    getAdminRolesFailure,
    createAdminRole,
    createAdminRoleSuccess,
    createAdminRoleFailure,
    deleteAdminRole,
    deleteAdminRoleFailure,
    deleteAdminRoleSuccess,
    updateAdminRole,
    updateAdminRoleSuccess,
    updateAdminRoleFailure,
    getAdminRolesByType,
    getAdminRolesByTypeSuccess,
    getAdminRolesByTypeFailure,
} = adminRolesSLice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getAdminRoles,
            createAdminRole,
            deleteAdminRole,
            updateAdminRole,
            getAdminRolesByType,
        },
        useDispatch()
    );
};

export default adminRolesSLice.reducer;
