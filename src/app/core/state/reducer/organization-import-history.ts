import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateGymImportHistoryRequestActionPayload,
    GetGymImportHistoryRequestActionPayload,
    GymImportHistory,
} from "../types/gym-import-history";
import {
    CreateOrganizationImportHistoryRequestActionPayload,
    GetOrganizationImportHistoryRequestActionPayload,
    OrganizationImportHistory,
} from "../types/organization-import-history";

const initialState: OrganizationImportHistory = {
    getOrganizationImportHistory: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createOrganizationImportHistory: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const organizationImportHistorySlice = createSlice({
    name: "organizationImportHistory",
    initialState,
    reducers: {
        getOrganizationImportHistory(
            state,
            actions: GetOrganizationImportHistoryRequestActionPayload
        ) {
            state.getOrganizationImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getOrganizationImportHistorySuccess(state, actions) {
            state.getOrganizationImportHistory = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationImportHistoryFailure(state) {
            state.getOrganizationImportHistory = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getOrganizationImportHistoryLoading(state) {
            state.getOrganizationImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },

        createOrganizationImportHistory(
            state,
            actions: CreateOrganizationImportHistoryRequestActionPayload
        ) {
            state.createOrganizationImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createOrganizationImportHistorySuccess(state, actions) {
            state.createOrganizationImportHistory = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createOrganizationImportHistoryFailure(state) {
            state.createOrganizationImportHistory = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createOrganizationImportHistoryLoading(state) {
            state.createOrganizationImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
    },
});

export const {
    getOrganizationImportHistory,
    getOrganizationImportHistorySuccess,
    getOrganizationImportHistoryFailure,
    getOrganizationImportHistoryLoading,
    createOrganizationImportHistory,
    createOrganizationImportHistorySuccess,
    createOrganizationImportHistoryFailure,
    createOrganizationImportHistoryLoading,
} = organizationImportHistorySlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getOrganizationImportHistory,
            createOrganizationImportHistory,
        },
        useDispatch()
    );
};

export default organizationImportHistorySlice.reducer;
