import {
    PayloadAction,
    bindActionCreators,
    createSlice,
} from "@reduxjs/toolkit";
import {
    CreateSessionRequestActionPayload,
    GetSessionsRequestActionPayload,
    GetMemberSessionsRequestActionPayload,
    Sessions,
    UpdateMemberSessionRequestActionPayload,
} from "../types/sessions";
import { useDispatch } from "react-redux";

const initialState: Sessions = {
    createSession: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberSessions: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSession: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSessions: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateSession: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateMemberSession: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const SessionsSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        getSessions(state, actions: GetSessionsRequestActionPayload) {
            state.getSessions = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSessionsSuccess(state, actions) {
            state.getSessions = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSessionsFailure(state) {
            state.getSessions = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getMemberSessions(
            state,
            actions: GetMemberSessionsRequestActionPayload
        ) {
            state.getMemberSessions = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberSessionsSuccess(state, actions) {
            state.getMemberSessions = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberSessionsFailure(state) {
            state.getMemberSessions = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        createSession(state, actions: CreateSessionRequestActionPayload) {
            state.createSession = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createSessionSuccess(state, actions) {
            state.createSession = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getSessions.data)
                state.getSessions.data.data.unshift(actions.payload);
        },
        createSessionFailure(state) {
            state.createSession = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        resetCreateSessionState(state) {
            state.createSession = {
                data: undefined,
                success: false,
                loading: false,
                error: false,
            };
        },

        resetGetSessionState(state) {
            state.getSession = {
                data: undefined,
                success: false,
                loading: false,
                error: false,
            };
        },

        updateSession(state, actions: CreateSessionRequestActionPayload) {
            state.updateSession = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateSessionSuccess(state, actions) {
            state.updateSession = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getSessions.data?.data && actions.payload) {
                const updateSession = actions.payload;
                const findIndex = state.getSessions.data?.data?.findIndex(
                    (session) => session.id == updateSession.id
                );
                if (state?.getSessions?.data?.data?.[findIndex])
                    state.getSessions.data.data[findIndex] = updateSession;
            }
        },
        updateSessionFailure(state) {
            state.updateSession = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getSession(state, actions: PayloadAction<string>) {
            state.getSession = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getSessionSuccess(state, actions) {
            state.getSession = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSessionFailure(state) {
            state.getSession = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateMemberSession(
            state,
            actions: UpdateMemberSessionRequestActionPayload
        ) {
            state.updateMemberSession = {
                loading: true,
                success: false,
                error: false,
            };
        },
        updateMemberSessionSuccess(state, actions) {
            state.updateMemberSession = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getSession.data) state.getSession.data = actions.payload;
        },
        updateMemberSessionFailure(state) {
            state.updateMemberSession = {
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    createSession,
    createSessionFailure,
    createSessionSuccess,
    getMemberSessions,
    getMemberSessionsFailure,
    getMemberSessionsSuccess,
    getSession,
    getSessionFailure,
    getSessionSuccess,
    getSessions,
    getSessionsFailure,
    getSessionsSuccess,
    updateSession,
    updateSessionFailure,
    updateSessionSuccess,
    resetCreateSessionState,
    resetGetSessionState,
    updateMemberSession,
    updateMemberSessionFailure,
    updateMemberSessionSuccess,
} = SessionsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            createSession,
            getSession,
            getSessions,
            getMemberSessions,
            updateSession,
            resetCreateSessionState,
            resetGetSessionState,
            updateMemberSession,
        },
        useDispatch()
    );
};

export default SessionsSlice.reducer;
