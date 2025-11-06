import { createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    AdminPermissions,
    GetAdminPermissionsRequestActionPayload,
    GetAdminPermissionsByTypeRequestActionPayload,
    SortAdminPermissionsRequestActionPayload,
} from "../types/admin-permissions";

const initialState: AdminPermissions = {
    getAdminPermissions: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getAdminPermissionsByType: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    sortAdminPermissions: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const adminPermissionsSlice = createSlice({
    name: "adminPermissions",
    initialState,
    reducers: {
        getAdminPermissions(
            state,
            actions: GetAdminPermissionsRequestActionPayload
        ) {
            state.getAdminPermissions = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminPermissionsSuccess(state, actions) {
            state.getAdminPermissions = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminPermissionsFailure(state) {
            state.getAdminPermissions = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getAdminPermissionsByType(
            state,
            actions: GetAdminPermissionsByTypeRequestActionPayload
        ) {
            state.getAdminPermissionsByType = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAdminPermissionsByTypeSuccess(state, actions) {
            state.getAdminPermissionsByType = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAdminPermissionsByTypeFailure(state) {
            state.getAdminPermissionsByType = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        sortAdminPermissions(
            state,
            actions: SortAdminPermissionsRequestActionPayload
        ) {
            state.sortAdminPermissions = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        sortAdminPermissionsSuccess(state, actions) {
            state.sortAdminPermissions = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        sortAdminPermissionsFailure(state) {
            state.sortAdminPermissions = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getAdminPermissions,
    getAdminPermissionsSuccess,
    getAdminPermissionsFailure,
    getAdminPermissionsByType,
    getAdminPermissionsByTypeFailure,
    getAdminPermissionsByTypeSuccess,
    sortAdminPermissions,
    sortAdminPermissionsFailure,
    sortAdminPermissionsSuccess
} = adminPermissionsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        { getAdminPermissions, getAdminPermissionsByType, sortAdminPermissions },
        useDispatch()
    );
};

export default adminPermissionsSlice.reducer;
