import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    createSessionRequest,
    getSessionRequest,
    getSessionsRequest,
    getMemberSessionsRequest,
    updateSessionRequest,
    updateMemberSessionRequest,
} from "../../services/sessions/sessions.service";
import {
    createSession,
    createSessionFailure,
    createSessionSuccess,
    getSession,
    getSessionFailure,
    getSessionSuccess,
    getSessions,
    getSessionsFailure,
    getSessionsSuccess,
    getMemberSessions,
    getMemberSessionsFailure,
    getMemberSessionsSuccess,
    updateSession,
    updateSessionFailure,
    updateSessionSuccess,
    updateMemberSession,
    updateMemberSessionFailure,
    updateMemberSessionSuccess,
} from "../reducer/sessions";
import { handleServerException } from "../../services/utils/utils.service";

function* getSessionsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getSessionsRequest,
            actions.payload
        );
        yield put(getSessionsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getSessionsFailure.type, true);
    }
}

function* getMemberSessionsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getMemberSessionsRequest,
            actions.payload
        );
        yield put(getMemberSessionsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberSessionsFailure.type,
            true
        );
    }
}

function* getSessionSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getSessionRequest,
            actions.payload
        );
        yield put(getSessionSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getSessionFailure.type, true);
    }
}

function* createSessionSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createSessionRequest,
            actions.payload
        );
        yield put(createSessionSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createSessionFailure.type, true);
    }
}

function* updateSessionSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateSessionRequest,
            actions.payload
        );
        yield put(updateSessionSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateSessionFailure.type, true);
    }
}

function* updateMemberSessionSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberSessionRequest,
            actions.payload
        );
        yield put(updateMemberSessionSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateMemberSessionFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getSessions.type, getSessionsSaga);
    yield takeLatest(getMemberSessions.type, getMemberSessionsSaga);
    yield takeLatest(getSession.type, getSessionSaga);
    yield takeLatest(createSession.type, createSessionSaga);
    yield takeLatest(updateSession.type, updateSessionSaga);
    yield takeLatest(updateMemberSession.type, updateMemberSessionSaga);
}
