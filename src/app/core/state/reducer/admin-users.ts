import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    AdminUsers,
    GetAdminUsersRequestActionPayload,
    CreateAdminUserRequestActionPayload,
} from "../types/admin-users";

const initialState: AdminUsers = {
    getAdminOrganizationUsers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getAdminUsers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createAdminUser: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteAdminUser: {
        success: false,
        loading: false,
        error: false,
    },
    updateAdminUser: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const adminUserSlice = createSlice({
    name: "adminUsers",
    initialState,
    reducers: {
        getAdminUsers(state, actions: GetAdminUsersRequestActionPayload) {
            state.getAdminUsers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminUsersSuccess(state, actions) {
            state.getAdminUsers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminUsersFailure(state) {
            state.getAdminUsers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },


        getAdminOrganizationUsers(state, actions: GetAdminUsersRequestActionPayload) {
            state.getAdminOrganizationUsers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminOrganizationUsersSuccess(state, actions) {
            state.getAdminOrganizationUsers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminOrganizationUsersFailure(state) {
            state.getAdminOrganizationUsers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },


        createAdminUser(state, actions: CreateAdminUserRequestActionPayload) {
            state.createAdminUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createAdminUserSuccess(state, actions) {
            state.createAdminUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createAdminUserFailure(state) {
            state.createAdminUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteAdminUser(state, actions: PayloadAction<number>) {
            state.deleteAdminUser = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteAdminUserSuccess(state, actions) {
            state.deleteAdminUser = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteAdminUserFailure(state) {
            state.deleteAdminUser = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateAdminUser(state, actions: CreateAdminUserRequestActionPayload) {
            state.updateAdminUser = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateAdminUserSuccess(state, actions) {
            state.updateAdminUser = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateAdminUserFailure(state) {
            state.updateAdminUser = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getAdminUsers,
    getAdminUsersSuccess,
    getAdminUsersFailure,
    getAdminOrganizationUsers,
    getAdminOrganizationUsersSuccess,
    getAdminOrganizationUsersFailure,
    createAdminUser,
    createAdminUserSuccess,
    createAdminUserFailure,
    deleteAdminUser,
    deleteAdminUserFailure,
    deleteAdminUserSuccess,
    updateAdminUser,
    updateAdminUserSuccess,
    updateAdminUserFailure,
} = adminUserSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        { getAdminUsers, getAdminOrganizationUsers, createAdminUser, deleteAdminUser, updateAdminUser },
        useDispatch()
    );
};

export default adminUserSlice.reducer;
