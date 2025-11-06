import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateNoteRequestActionPayload,
    GetNotesRequestActionPayload,
    Notes,
} from "../types/notes";

const initialState: Notes = {
    getNotes: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createNote: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateNote: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteNote: {
        success: false,
        loading: false,
        error: false,
    },
};

const NotesSlice = createSlice({
    name: "Notes",
    initialState,
    reducers: {
        getNotes(state, actions: GetNotesRequestActionPayload) {
            state.getNotes = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getNotesSuccess(state, actions) {
            state.getNotes = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getNotesFailure(state) {
            state.getNotes = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createNote(state, actions: CreateNoteRequestActionPayload) {
            state.createNote = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createNoteSuccess(state, actions) {
            state.createNote = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getNotes.data)
                state.getNotes.data.data.unshift(actions.payload);
        },
        createNoteFailure(state) {
            state.createNote = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteNote(
            state,
            actions: PayloadAction<{ member_id: string; id: string }>
        ) {
            state.deleteNote = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteNoteSuccess(state, actions) {
            state.deleteNote = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getNotes.data?.data) {
                state.getNotes.data.data = state.getNotes.data?.data.filter(
                    (arrow) => arrow.id !== actions.payload.id
                );
            }
        },
        deleteNoteFailure(state) {
            state.deleteNote = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateNote(state, actions: CreateNoteRequestActionPayload) {
            state.updateNote = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateNoteSuccess(state, actions) {
            state.updateNote = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getNotes.data?.data && actions.payload) {
                const updatedNote = actions.payload;
                const findIndex = state.getNotes.data?.data?.findIndex(
                    (note) => note.id == updatedNote.id
                );

                if (state?.getNotes?.data?.data?.[findIndex])
                    state.getNotes.data.data[findIndex] = updatedNote;
            }
        },
        updateNoteFailure(state) {
            state.updateNote = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    getNotes,
    getNotesFailure,
    getNotesSuccess,
    createNote,
    createNoteFailure,
    createNoteSuccess,
    deleteNote,
    deleteNoteFailure,
    deleteNoteSuccess,
    updateNoteFailure,
    updateNoteSuccess,
    updateNote,
} = NotesSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getNotes,
            createNote,
            deleteNote,
            updateNote,
        },
        useDispatch()
    );
};

export default NotesSlice.reducer;
