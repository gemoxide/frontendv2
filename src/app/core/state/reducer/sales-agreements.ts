import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateSalesAgreementRequestActionPayload,
    GetSalesAgreementRequestActionPayload,
    GetSalesAgreementsOptionsRequestActionPayload,
    SalesAgreement,
} from "../types/sales-agreements";

const initialState: SalesAgreement = {
    getGymSalesAgreements: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getOrganizationSalesAgreements: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSalesAgreements: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createSalesAgreement: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateSalesAgreement: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteSalesAgreement: {
        success: false,
        loading: false,
        error: false,
    }
};

const gymSalesAgreementSlice = createSlice({
    name: "gymSalesAgreement",
    initialState,
    reducers: {
        getGymSalesAgreements(state, actions: GetSalesAgreementRequestActionPayload) {
            state.getGymSalesAgreements = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymSalesAgreementsSuccess(state, actions) {
            state.getGymSalesAgreements = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymSalesAgreementsFailure(state) {
            state.getGymSalesAgreements = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getOrganizationSalesAgreements(state, actions: GetSalesAgreementRequestActionPayload) {
            state.getOrganizationSalesAgreements = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getOrganizationSalesAgreementsSuccess(state, actions) {
            state.getOrganizationSalesAgreements = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationSalesAgreementsFailure(state) {
            state.getOrganizationSalesAgreements = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getSalesAgreements(state, actions: GetSalesAgreementsOptionsRequestActionPayload) {
            state.getSalesAgreements = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSalesAgreementsSuccess(state, actions) {
            state.getSalesAgreements = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSalesAgreementsFailure(state) {
            state.getSalesAgreements = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createSalesAgreement(state, actions: CreateSalesAgreementRequestActionPayload) {
            state.createSalesAgreement = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createSalesAgreementSuccess(state, actions) {
            state.createSalesAgreement = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createSalesAgreementFailure(state) {
            state.createSalesAgreement = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteSalesAgreement(state, actions) {
            state.deleteSalesAgreement = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteSalesAgreementSuccess(state, actions) {
            state.deleteSalesAgreement = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteSalesAgreementFailure(state) {
            state.deleteSalesAgreement = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateSalesAgreement(state, actions: CreateSalesAgreementRequestActionPayload) {
            state.updateSalesAgreement = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateSalesAgreementSuccess(state, actions) {
            state.updateSalesAgreement = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateSalesAgreementFailure(state) {
            state.updateSalesAgreement = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

    },
});

export const {
    getGymSalesAgreements,
    getGymSalesAgreementsFailure,
    getGymSalesAgreementsSuccess,

    getOrganizationSalesAgreements,
    getOrganizationSalesAgreementsFailure,
    getOrganizationSalesAgreementsSuccess,

    getSalesAgreements,
    getSalesAgreementsFailure,
    getSalesAgreementsSuccess,

    createSalesAgreement,
    createSalesAgreementFailure,
    createSalesAgreementSuccess,

    deleteSalesAgreement,
    deleteSalesAgreementFailure,
    deleteSalesAgreementSuccess,

    updateSalesAgreement,
    updateSalesAgreementFailure,
    updateSalesAgreementSuccess
} = gymSalesAgreementSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getGymSalesAgreements,
            getOrganizationSalesAgreements,
            getSalesAgreements,
            createSalesAgreement,
            deleteSalesAgreement,
            updateSalesAgreement,
        },
        useDispatch()
    );
};

export default gymSalesAgreementSlice.reducer;
