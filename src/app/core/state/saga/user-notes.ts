import { takeLatest, call, put } from "redux-saga/effects";
import {
    createUserNote,
    createUserNoteFailure,
    createUserNoteSuccess,
    deleteUserNote,
    deleteUserNoteFailure,
    deleteUserNoteSuccess,
    getUserNotes,
    getUserNotesFailure,
    getUserNotesSuccess,
    updateUserNote,
    updateUserNoteFailure,
    updateUserNoteSuccess,
} from "../reducer/user-notes";
import {
    createUserNoteRequest,
    deleteUserNoteRequest,
    getUserNotesRequest,
    updateUserNoteRequest,
} from "../../services/user-notes/user-notes.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetUserNotesQuery } from "../../interfaces/user-notes.interface";

function* getUserNotesSaga(actions: PayloadAction<GetUserNotesQuery>) {
    try {
        const data: AxiosResponse = yield call(
            getUserNotesRequest,
            actions.payload.user_id,
            actions.payload.query
        );
        yield put(getUserNotesSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getUserNotesFailure.type, true);
    }
}

function* createUserNoteSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createUserNoteRequest,
            actions.payload
        );
        yield put(createUserNoteSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createUserNoteFailure.type,
            true
        );
    }
}

function* updateUserNoteSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateUserNoteRequest,
            actions.payload
        );
        yield put(updateUserNoteSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateUserNoteFailure.type,
            true
        );
    }
}

function* deleteUserNoteSaga(
    actions: PayloadAction<{ user_id: string; id: string }>
) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteUserNoteRequest,
            actions.payload.user_id,
            actions.payload.id
        );
        yield put(deleteUserNoteSuccess({ ...data, id: actions.payload.id }));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteUserNoteFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getUserNotes.type, getUserNotesSaga);
    yield takeLatest(createUserNote.type, createUserNoteSaga);
    yield takeLatest(updateUserNote.type, updateUserNoteSaga);
    yield takeLatest(deleteUserNote.type, deleteUserNoteSaga);
}
