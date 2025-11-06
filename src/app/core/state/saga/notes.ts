import { takeLatest, call, put } from "redux-saga/effects";
import {
    createNote,
    createNoteFailure,
    createNoteSuccess,
    deleteNote,
    deleteNoteFailure,
    deleteNoteSuccess,
    getNotes,
    getNotesFailure,
    getNotesSuccess,
    updateNote,
    updateNoteFailure,
    updateNoteSuccess,
} from "../reducer/notes";
import {
    createNoteRequest,
    deleteNoteRequest,
    getNotesRequest,
    updateNoteRequest,
} from "../../services/notes/notes.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetNotesQuery } from "../../interfaces/notes.interface";

function* getNotesSaga(actions: PayloadAction<GetNotesQuery>) {
    try {
        const data: AxiosResponse = yield call(
            getNotesRequest,
            actions.payload.member_id,
            actions.payload.query
        );
        yield put(getNotesSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getNotesFailure.type, true);
    }
}

function* createNoteSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createNoteRequest,
            actions.payload
        );
        yield put(createNoteSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createNoteFailure.type, true);
    }
}

function* updateNoteSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateNoteRequest,
            actions.payload
        );
        yield put(updateNoteSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateNoteFailure.type, true);
    }
}

function* deleteNoteSaga(
    actions: PayloadAction<{ member_id: string; id: string }>
) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteNoteRequest,
            actions.payload.member_id,
            actions.payload.id
        );
        yield put(deleteNoteSuccess({ ...data, id: actions.payload.id }));
    } catch (err: any) {
        yield call(handleServerException, err, deleteNoteFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getNotes.type, getNotesSaga);
    yield takeLatest(createNote.type, createNoteSaga);
    yield takeLatest(updateNote.type, updateNoteSaga);
    yield takeLatest(deleteNote.type, deleteNoteSaga);
}
