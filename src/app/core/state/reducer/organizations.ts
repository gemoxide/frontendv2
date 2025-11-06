import { createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateAdminOrganizationRequestActionPayload,
    UpdateOrganizationCoachAssessmentParamRequestActionPayload,
    UpdateOrganizationLeadManagementParamRequestActionPayload,
    UpdateOrganizationLogoRequestActionPayload,
} from "../types/admin-organization";
import { Organization } from "../types/organizations";

const initialState: Organization = {
    getOrganization: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateOrganizationLogo: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateOrganization: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateOrganizationLeadManagement: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateOrganizationCoachAssessment: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const organizationsSlice = createSlice({
    name: "organizations",
    initialState,
    reducers: {
        getOrganization(state) {
            state.getOrganization = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getOrganizationSuccess(state, actions) {
            state.getOrganization = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationFailure(state) {
            state.getOrganization = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        updateOrganization(
            state,
            actions: CreateAdminOrganizationRequestActionPayload
        ) {
            state.updateOrganization = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateOrganizationSuccess(state, actions) {
            state.updateOrganization = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            state.getOrganization = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateOrganizationFailure(state) {
            state.updateOrganization = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        updateOrganizationLogo(
            state,
            actions: UpdateOrganizationLogoRequestActionPayload
        ) {
            state.updateOrganizationLogo = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateOrganizationLogoSuccess(state, actions) {
            state.updateOrganizationLogo = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getOrganization.data?.attributes)
                state.getOrganization.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateOrganizationLogoFailure(state) {
            state.updateOrganizationLogo = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetUpdateOrganizationLogo(state) {
            state.updateOrganizationLogo = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },

        updateOrganizationLeadManagement(
            state,
            actions: UpdateOrganizationLeadManagementParamRequestActionPayload
        ) {
            state.updateOrganizationLeadManagement = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateOrganizationLeadManagementSuccess(state, actions) {
            state.updateOrganizationLeadManagement = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getOrganization.data?.attributes)
                state.getOrganization.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateOrganizationLeadManagementFailure(state) {
            state.updateOrganizationLeadManagement = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        resetUpdateOrganizationLeadManagement(state) {
            state.updateOrganizationLeadManagement = {
                data: undefined,
                loading: false,
                success: false,
                error: false,
            };
        },

        updateOrganizationCoachAssessment(
            state,
            actions: UpdateOrganizationCoachAssessmentParamRequestActionPayload
        ) {
            state.updateOrganizationCoachAssessment = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateOrganizationCoachAssessmentSuccess(state, actions) {
            state.updateOrganizationCoachAssessment = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getOrganization.data?.attributes)
                state.getOrganization.data.attributes = {
                    ...actions.payload.attributes,
                };
        },
        updateOrganizationCoachAssessmentFailure(state) {
            state.updateOrganizationCoachAssessment = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getOrganization,
    getOrganizationFailure,
    getOrganizationSuccess,
    updateOrganizationLogo,
    updateOrganizationLogoFailure,
    updateOrganizationLogoSuccess,
    resetUpdateOrganizationLogo,
    updateOrganization,
    updateOrganizationFailure,
    updateOrganizationSuccess,
    updateOrganizationLeadManagement,
    updateOrganizationLeadManagementFailure,
    updateOrganizationLeadManagementSuccess,
    resetUpdateOrganizationLeadManagement,
    updateOrganizationCoachAssessment,
    updateOrganizationCoachAssessmentFailure,
    updateOrganizationCoachAssessmentSuccess,
} = organizationsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getOrganization,
            updateOrganizationLogo,
            resetUpdateOrganizationLogo,
            updateOrganization,
            updateOrganizationLeadManagement,
            resetUpdateOrganizationLeadManagement,
            updateOrganizationCoachAssessment,
        },
        useDispatch()
    );
};

export default organizationsSlice.reducer;
