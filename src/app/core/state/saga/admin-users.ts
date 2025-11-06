import { takeLatest, call, put } from "redux-saga/effects";
import {
    getAdminUsers,
    getAdminUsersFailure,
    getAdminUsersSuccess,
    createAdminUser,
    createAdminUserFailure,
    createAdminUserSuccess,
    deleteAdminUserSuccess,
    deleteAdminUserFailure,
    deleteAdminUser,
    updateAdminUser,
    updateAdminUserFailure,
    updateAdminUserSuccess,
    getAdminOrganizationUsers,
    getAdminOrganizationUsersSuccess,
    getAdminOrganizationUsersFailure,
} from "../reducer/admin-users";
import {
    getAdminUsersRequest,
    createAdminUserRequest,
    deleteAdminUserRequest,
    updateAdminUserRequest,
    getAdminOrganizationUsersRequest,
} from "../../services/users/users.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getAdminUsersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminUsersRequest,
            actions.payload
        );
        yield put(getAdminUsersSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getAdminUsersFailure.type);
    }
}

function* getAdminOrganiztionUsersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminOrganizationUsersRequest,
            actions.payload
        );
        yield put(getAdminOrganizationUsersSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getAdminOrganizationUsersFailure.type);
    }
}

function* createAdminUserSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createAdminUserRequest,
            actions.payload
        );
        yield put(createAdminUserSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createAdminUserFailure.type,
            true
        );
    }
}

function* deleteAdminUserSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            deleteAdminUserRequest,
            actions.payload
        );
        yield put(deleteAdminUserSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteAdminUserFailure.type,
            true
        );
    }
}

function* updateAdminUserSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateAdminUserRequest,
            actions.payload
        );
        yield put(updateAdminUserSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateAdminUserFailure.type,
            true
        );
    }
}


export function* rootSaga() {
    yield takeLatest(getAdminUsers.type, getAdminUsersSaga);
    yield takeLatest(getAdminOrganizationUsers.type, getAdminOrganiztionUsersSaga);
    yield takeLatest(createAdminUser.type, createAdminUserSaga);
    yield takeLatest(deleteAdminUser.type, deleteAdminUserSaga);
    yield takeLatest(updateAdminUser.type, updateAdminUserSaga);
}
