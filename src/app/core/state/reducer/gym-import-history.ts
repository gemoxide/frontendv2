import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateGymImportHistoryRequestActionPayload,
    GetGymImportHistoryRequestActionPayload,
    GymImportHistory,
} from "../types/gym-import-history";

const initialState: GymImportHistory = {
    getGymImportHistory: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createGymImportHistory: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const gymImportHistorySlice = createSlice({
    name: "gymRevenues",
    initialState,
    reducers: {
        getGymImportHistory(
            state,
            actions: GetGymImportHistoryRequestActionPayload
        ) {
            state.getGymImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymImportHistorySuccess(state, actions) {
            state.getGymImportHistory = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymImportHistoryFailure(state) {
            state.getGymImportHistory = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getGymImportHistoryLoading(state) {
            state.getGymImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },

        createGymImportHistory(
            state,
            actions: CreateGymImportHistoryRequestActionPayload
        ) {
            state.createGymImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createGymImportHistorySuccess(state, actions) {
            state.createGymImportHistory = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createGymImportHistoryFailure(state) {
            state.createGymImportHistory = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createGymImportHistoryLoading(state) {
            state.createGymImportHistory = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
    },
});

export const {
    getGymImportHistory,
    getGymImportHistorySuccess,
    getGymImportHistoryFailure,
    getGymImportHistoryLoading,
    createGymImportHistory,
    createGymImportHistorySuccess,
    createGymImportHistoryFailure,
    createGymImportHistoryLoading,
} = gymImportHistorySlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getGymImportHistory,
            createGymImportHistory,
        },
        useDispatch()
    );
};

export default gymImportHistorySlice.reducer;
