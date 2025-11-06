import { get } from "lodash";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateGymRequestActionPayload,
    GetGymMonthRevenueRequestActionPayload,
    GetGymRevenueRequestActionPayload,
    GymRevenues,
} from "../types/gym-revenue";

const initialState: GymRevenues = {
    getGymRevenues: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createGymRevenue: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateGymRevenue: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteGymRevenue: {
        success: false,
        loading: false,
        error: false,
    },
    getGymMonthRevenue: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGymMonthlyWig: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGymMonthlyWigTable: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGapAnalysis: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const gymRevenueSlice = createSlice({
    name: "gymRevenues",
    initialState,
    reducers: {
        getGymRevenues(state, actions: GetGymRevenueRequestActionPayload) {
            state.getGymRevenues = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymRevenuesSuccess(state, actions) {
            state.getGymRevenues = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymRevenuesFailure(state) {
            state.getGymRevenues = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createGymRevenue(state, actions: CreateGymRequestActionPayload) {
            state.createGymRevenue = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createGymRevenueSuccess(state, actions) {
            state.createGymRevenue = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createGymRevenueFailure(state) {
            state.createGymRevenue = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteGymRevenue(
            state,
            actions: PayloadAction<{ id: string; gym_id: string }>
        ) {
            state.deleteGymRevenue = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteGymRevenueSuccess(state, actions) {
            state.deleteGymRevenue = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteGymRevenueFailure(state) {
            state.deleteGymRevenue = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateGymRevenue(state, actions: CreateGymRequestActionPayload) {
            state.updateGymRevenue = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateGymRevenueSuccess(state, actions) {
            state.updateGymRevenue = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getGymRevenues.data?.data && actions.payload) {
                const updateSession = actions.payload;
                const findIndex = state.getGymRevenues.data?.data?.findIndex(
                    (session) => session.id == updateSession.id
                );
                if (state?.getGymRevenues?.data?.data?.[findIndex])
                    state.getGymRevenues.data.data[findIndex] = updateSession;
            }
        },
        updateGymRevenueFailure(state) {
            state.updateGymRevenue = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getGymMonthRevenue(
            state,
            actions: GetGymMonthRevenueRequestActionPayload
        ) {
            state.getGymMonthRevenue = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymMonthRevenueSuccess(state, actions) {
            state.getGymMonthRevenue = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymMonthRevenueFailure(state) {
            state.getGymMonthRevenue = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getGymMonthlyWig(state, actions: PayloadAction<{ gym_id: number }>) {
            state.getGymMonthlyWig = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymMonthlyWigSuccess(state, actions) {
            state.getGymMonthlyWig = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymMonthlyWigFailure(state) {
            state.getGymMonthlyWig = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getGymMonthlyWigTable(
            state,
            actions: PayloadAction<{ gym_id: number }>
        ) {
            state.getGymMonthlyWigTable = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymMonthlyWigTableSuccess(state, actions) {
            state.getGymMonthlyWigTable = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymMonthlyWigTableFailure(state) {
            state.getGymMonthlyWigTable = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getGapAnalysis(state, actions: PayloadAction<{ gym_id: number }>) {
            state.getGapAnalysis = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGapAnalysisSuccess(state, actions) {
            state.getGapAnalysis = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGapAnalysisFailure(state) {
            state.getGapAnalysis = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getGymRevenues,
    getGymRevenuesSuccess,
    getGymRevenuesFailure,
    createGymRevenue,
    createGymRevenueSuccess,
    createGymRevenueFailure,
    deleteGymRevenue,
    deleteGymRevenueSuccess,
    deleteGymRevenueFailure,
    updateGymRevenue,
    updateGymRevenueSuccess,
    updateGymRevenueFailure,
    getGymMonthRevenue,
    getGymMonthRevenueSuccess,
    getGymMonthRevenueFailure,
    getGymMonthlyWig,
    getGymMonthlyWigSuccess,
    getGymMonthlyWigFailure,
    getGymMonthlyWigTable,
    getGymMonthlyWigTableSuccess,
    getGymMonthlyWigTableFailure,
    getGapAnalysis,
    getGapAnalysisSuccess,
    getGapAnalysisFailure,
} = gymRevenueSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getGymRevenues,
            createGymRevenue,
            deleteGymRevenue,
            updateGymRevenue,
            getGymMonthRevenue,
            getGymMonthlyWig,
            getGymMonthlyWigTable,
            getGapAnalysis,
        },
        useDispatch()
    );
};

export default gymRevenueSlice.reducer;
