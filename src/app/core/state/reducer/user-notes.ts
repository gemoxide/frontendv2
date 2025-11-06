import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateUserNoteRequestActionPayload,
    GetUserNotesRequestActionPayload,
    UserNotes,
} from "../types/user-notes";

const initialState: UserNotes = {
    getUserNotes: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createUserNote: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateUserNote: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteUserNote: {
        success: false,
        loading: false,
        error: false,
    },
};

const UserNotesSlice = createSlice({
    name: "userNotes",
    initialState,
    reducers: {
        getUserNotes(state, actions: GetUserNotesRequestActionPayload) {
            state.getUserNotes = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getUserNotesSuccess(state, actions) {
            state.getUserNotes = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getUserNotesFailure(state) {
            state.getUserNotes = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createUserNote(state, actions: CreateUserNoteRequestActionPayload) {
            state.createUserNote = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createUserNoteSuccess(state, actions) {
            state.createUserNote = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getUserNotes.data)
                state.getUserNotes.data.data.unshift(actions.payload);
        },
        createUserNoteFailure(state) {
            state.createUserNote = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteUserNote(
            state,
            actions: PayloadAction<{ user_id: string; id: string }>
        ) {
            state.deleteUserNote = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteUserNoteSuccess(state, actions) {
            state.deleteUserNote = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getUserNotes.data?.data) {
                state.getUserNotes.data.data =
                    state.getUserNotes.data?.data.filter(
                        (arrow) => arrow.id !== actions.payload.id
                    );
            }
        },
        deleteUserNoteFailure(state) {
            state.deleteUserNote = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateUserNote(state, actions: CreateUserNoteRequestActionPayload) {
            state.updateUserNote = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateUserNoteSuccess(state, actions) {
            state.updateUserNote = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getUserNotes.data?.data && actions.payload) {
                const updatedUserNote = actions.payload;
                const findIndex = state.getUserNotes.data?.data?.findIndex(
                    (userNote) => userNote.id == updatedUserNote.id
                );

                if (state?.getUserNotes?.data?.data?.[findIndex])
                    state.getUserNotes.data.data[findIndex] = updatedUserNote;
            }
        },
        updateUserNoteFailure(state) {
            state.updateUserNote = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getUserNotes,
    getUserNotesFailure,
    getUserNotesSuccess,
    createUserNote,
    createUserNoteFailure,
    createUserNoteSuccess,
    deleteUserNote,
    deleteUserNoteFailure,
    deleteUserNoteSuccess,
    updateUserNoteFailure,
    updateUserNoteSuccess,
    updateUserNote,
} = UserNotesSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getUserNotes,
            createUserNote,
            deleteUserNote,
            updateUserNote,
        },
        useDispatch()
    );
};

export default UserNotesSlice.reducer;
