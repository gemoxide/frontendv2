import { takeLatest, call, put } from "redux-saga/effects";
import {
    getInvitations,
    getInvitationsFailure,
    getInvitationsSuccess,
    createInvitation,
    createInvitationFailure,
    createInvitationSuccess,
    resendInvitation,
    resendInvitationFailure,
    resendInvitationSuccess,
    deleteInvitation,
    deleteInvitationFailure,
    deleteInvitationSuccess,
    updateInvitation,
    updateInvitationFailure,
    updateInvitationSuccess,
    getGymsInvitations,
    getGymsInvitationsFailure,
    getGymsInvitationsSuccess,
    getOrganizationInvitedUsersSuccess,
    getOrganizationInvitedUsersFailure,
    getOrganizationInvitedUsers,
    createOrganizationInvitationSuccess,
    createOrganizationInvitationFailure,
    createOrganizationInvitation,
    resendOrganizationInvitationSuccess,
    resendOrganizationInvitationFailure,
    resendOrganizationInvitation,
} from "../reducer/invitations";
import {
    getInvitationsRequest,
    createInvitationRequest,
    resendInvitationRequest,
    updateInvitationRequest,
    deleteInvitationRequest,
    getGymsInvitationsRequest,
    getOrganizationInvitedUsersRequest,
    createOrganizationInvitationRequest,
    resendOrganizationInvitationRequest,
} from "../../services/invitations/invitations.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getInvitationsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getInvitationsRequest,
            actions.payload
        );
        yield put(getInvitationsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getInvitationsFailure.type,
            true
        );
    }
}

function* getOrganizationInvitedUsersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getOrganizationInvitedUsersRequest,
            actions.payload
        );
        yield put(getOrganizationInvitedUsersSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getOrganizationInvitedUsersFailure.type,
            true
        );
    }
}

function* getGymsInvitationsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymsInvitationsRequest,
            actions.payload
        );
        yield put(getGymsInvitationsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGymsInvitationsFailure.type,
            true
        );
    }
}

function* createInvitationSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createInvitationRequest,
            actions.payload
        );
        yield put(createInvitationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createInvitationFailure.type,
            true
        );
    }
}


function* createOrganizationInvitationSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createOrganizationInvitationRequest,
            actions.payload
        );
        yield put(createOrganizationInvitationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createOrganizationInvitationFailure.type,
            true
        );
    }
}

function* resendInvitationSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            resendInvitationRequest,
            actions.payload
        );
        yield put(resendInvitationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            resendInvitationFailure.type,
            true
        );
    }
}

function* resendOrganizationInvitationSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            resendOrganizationInvitationRequest,
            actions.payload
        );
        yield put(resendOrganizationInvitationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            resendOrganizationInvitationFailure.type,
            true
        );
    }
}

function* deleteInvitationSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteInvitationRequest,
            actions.payload
        );
        yield put(deleteInvitationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteInvitationFailure.type,
            true
        );
    }
}

function* updateInvitationSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateInvitationRequest,
            actions.payload
        );
        yield put(updateInvitationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateInvitationFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getInvitations.type, getInvitationsSaga);
    yield takeLatest(getOrganizationInvitedUsers.type, getOrganizationInvitedUsersSaga);
    yield takeLatest(createOrganizationInvitation.type, createOrganizationInvitationSaga);
    yield takeLatest(resendOrganizationInvitation.type, resendOrganizationInvitationSaga);
    yield takeLatest(createInvitation.type, createInvitationSaga);
    yield takeLatest(resendInvitation.type, resendInvitationSaga);
    yield takeLatest(updateInvitation.type, updateInvitationSaga);
    yield takeLatest(deleteInvitation.type, deleteInvitationSaga);
    yield takeLatest(getGymsInvitations.type, getGymsInvitationsSaga);
}
