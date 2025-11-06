import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    // CreateGymRequestActionPayload,
    // GetGymsRequestActionPayload,
    // Gyms,

    Invitations,
    GetInvitationsRequestActionPayload,
    CreateInvitationRequestActionPayload,
} from "../types/invitations";

const initialState: Invitations = {
    getOrganizationInvitedUsers: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getGymsInvitations: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getInvitations: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createOrganizationInvitation: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createInvitation: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    resendOrganizationInvitation: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    resendInvitation: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateInvitation: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteInvitation: {
        success: false,
        loading: false,
        error: false,
    },
};

const invitationsSlice = createSlice({
    name: "invitations",
    initialState,
    reducers: {
        getInvitations(state, actions: GetInvitationsRequestActionPayload) {
            state.getInvitations = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },

        getInvitationsSuccess(state, actions) {
            state.getInvitations = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getInvitationsFailure(state) {
            state.getInvitations = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getOrganizationInvitedUsers(state, actions: GetInvitationsRequestActionPayload) {
            state.getOrganizationInvitedUsers = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },

        getOrganizationInvitedUsersSuccess(state, actions) {
            state.getOrganizationInvitedUsers = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationInvitedUsersFailure(state) {
            state.getOrganizationInvitedUsers = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getGymsInvitations(state, actions: GetInvitationsRequestActionPayload) {
            state.getGymsInvitations = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getGymsInvitationsSuccess(state, actions) {
            state.getGymsInvitations = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getGymsInvitationsFailure(state) {
            state.getGymsInvitations = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createInvitation(state, actions: CreateInvitationRequestActionPayload) {
            state.createInvitation = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createInvitationSuccess(state, actions) {
            state.createInvitation = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createInvitationFailure(state) {
            state.createInvitation = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createOrganizationInvitation(state, actions: CreateInvitationRequestActionPayload) {
            state.createOrganizationInvitation = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createOrganizationInvitationSuccess(state, actions) {
            state.createOrganizationInvitation = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        createOrganizationInvitationFailure(state) {
            state.createOrganizationInvitation = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        resendInvitation(state, actions: PayloadAction<number>) {
            state.resendInvitation = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        resendInvitationSuccess(state, actions) {
            state.resendInvitation = {
                data: undefined,
                loading: false,
                success: true,
                error: false,
            };
        },
        resendInvitationFailure(state) {
            state.resendInvitation = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        resendOrganizationInvitation(state, actions: PayloadAction<number>) {
            state.resendInvitation = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        resendOrganizationInvitationSuccess(state, actions) {
            state.resendInvitation = {
                data: undefined,
                loading: false,
                success: true,
                error: false,
            };
        },
        resendOrganizationInvitationFailure(state) {
            state.resendInvitation = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteInvitation(state, actions: PayloadAction<number>) {
            state.deleteInvitation = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteInvitationSuccess(state, actions) {
            state.deleteInvitation = {
                loading: false,
                success: true,
                error: false,
            };
        },
        deleteInvitationFailure(state) {
            state.deleteInvitation = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateInvitation(state, actions: CreateInvitationRequestActionPayload) {
            state.updateInvitation = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateInvitationSuccess(state, actions) {
            state.updateInvitation = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        updateInvitationFailure(state) {
            state.updateInvitation = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getInvitations,
    getInvitationsFailure,
    getInvitationsSuccess,
    getOrganizationInvitedUsers,
    getOrganizationInvitedUsersFailure,
    getOrganizationInvitedUsersSuccess,
    createInvitation,
    createInvitationFailure,
    createInvitationSuccess,
    createOrganizationInvitation,
    createOrganizationInvitationFailure,
    createOrganizationInvitationSuccess,
    resendInvitation,
    resendInvitationFailure,
    resendInvitationSuccess,
    resendOrganizationInvitation,
    resendOrganizationInvitationFailure,
    resendOrganizationInvitationSuccess,
    deleteInvitation,
    deleteInvitationFailure,
    deleteInvitationSuccess,
    updateInvitation,
    updateInvitationFailure,
    updateInvitationSuccess,
    getGymsInvitations,
    getGymsInvitationsSuccess,
    getGymsInvitationsFailure
} = invitationsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            createOrganizationInvitation,
            resendOrganizationInvitation,
            getOrganizationInvitedUsers,
            getInvitations,
            createInvitation,
            resendInvitation,
            deleteInvitation,
            updateInvitation,
            getGymsInvitations
        },
        useDispatch()
    );
};

export default invitationsSlice.reducer;
