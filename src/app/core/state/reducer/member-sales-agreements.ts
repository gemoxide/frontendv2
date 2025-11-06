import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import {
    CreateMemberSalesAgreementRequestActionPayload,
    GetMemberSalesAgreementsRequestActionPayload,
    MemberSalesAgreement,
} from "../types/member-sales-agreements";
import {
    CancelMemberSalesAgreementParam,
    DeleteGetMemberSalesAgreementParam,
} from "../../interfaces/member-sales-agreement.interface";

const initialState: MemberSalesAgreement = {
    getMemberSalesAgreements: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberSalesAgreement: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createMemberSalesAgreement: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberSalesAgreement: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteMemberSalesAgreement: {
        success: false,
        loading: false,
        error: false,
    },
    cancelMemberSalesAgreement: {
        success: false,
        loading: false,
        error: false,
    },
};

const memberSalesAgreementSlice = createSlice({
    name: "memberSalesAgreements",
    initialState,
    reducers: {
        getMemberSalesAgreements(
            state,
            actions: GetMemberSalesAgreementsRequestActionPayload
        ) {
            state.getMemberSalesAgreements = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberSalesAgreementsSuccess(state, actions) {
            state.getMemberSalesAgreements = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberSalesAgreementsFailure(state) {
            state.getMemberSalesAgreements = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMemberSalesAgreement(
            state,
            actions: PayloadAction<DeleteGetMemberSalesAgreementParam>
        ) {
            state.getMemberSalesAgreements = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberSalesAgreementSuccess(state, actions) {
            state.getMemberSalesAgreements = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberSalesAgreementFailure(state) {
            state.getMemberSalesAgreements = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createMemberSalesAgreement(
            state,
            actions: CreateMemberSalesAgreementRequestActionPayload
        ) {
            state.createMemberSalesAgreement = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createMemberSalesAgreementSuccess(state, actions) {
            state.createMemberSalesAgreement = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createMemberSalesAgreementFailure(state) {
            state.createMemberSalesAgreement = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteMemberSalesAgreement(
            state,
            actions: PayloadAction<DeleteGetMemberSalesAgreementParam>
        ) {
            state.deleteMemberSalesAgreement = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteMemberSalesAgreementSuccess(state, actions) {
            state.deleteMemberSalesAgreement = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteMemberSalesAgreementFailure(state) {
            state.deleteMemberSalesAgreement = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateMemberSalesAgreement(
            state,
            actions: CreateMemberSalesAgreementRequestActionPayload
        ) {
            state.updateMemberSalesAgreement = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberSalesAgreementSuccess(state, actions) {
            state.updateMemberSalesAgreement = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateMemberSalesAgreementFailure(state) {
            state.updateMemberSalesAgreement = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        cancelMemberSalesAgreement(
            state,
            actions: PayloadAction<CancelMemberSalesAgreementParam>
        ) {
            state.cancelMemberSalesAgreement = {
                loading: true,
                success: false,
                error: false,
            };
        },
        cancelMemberSalesAgreementSuccess(state, actions) {
            state.cancelMemberSalesAgreement = {
                loading: false,
                success: true,
                error: false,
            };
        },
        cancelMemberSalesAgreementFailure(state) {
            state.cancelMemberSalesAgreement = {
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    createMemberSalesAgreement,
    createMemberSalesAgreementFailure,
    createMemberSalesAgreementSuccess,
    deleteMemberSalesAgreement,
    deleteMemberSalesAgreementFailure,
    deleteMemberSalesAgreementSuccess,
    getMemberSalesAgreements,
    getMemberSalesAgreementsFailure,
    getMemberSalesAgreementsSuccess,
    updateMemberSalesAgreement,
    updateMemberSalesAgreementFailure,
    updateMemberSalesAgreementSuccess,
    getMemberSalesAgreement,
    getMemberSalesAgreementFailure,
    getMemberSalesAgreementSuccess,
    cancelMemberSalesAgreement,
    cancelMemberSalesAgreementFailure,
    cancelMemberSalesAgreementSuccess,
} = memberSalesAgreementSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getMemberSalesAgreements,
            createMemberSalesAgreement,
            deleteMemberSalesAgreement,
            updateMemberSalesAgreement,
            getMemberSalesAgreement,
            cancelMemberSalesAgreement,
        },
        useDispatch()
    );
};

export default memberSalesAgreementSlice.reducer;
