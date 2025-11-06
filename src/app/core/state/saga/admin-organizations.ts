import { takeLatest, call, put } from "redux-saga/effects";
import {
    getAdminOrganizations,
    getAdminOrganizationsFailure,
    getAdminOrganizationsSuccess,
    createAdminOrganization,
    createAdminOrganizationFailure,
    createAdminOrganizationSuccess,
    updateAdminOrganization,
    updateAdminOrganizationFailure,
    updateAdminOrganizationSuccess,
    deleteAdminOrganization,
    deleteAdminOrganizationFailure,
    deleteAdminOrganizationSuccess,
    getAdminOrganizationSuccess,
    getAdminOrganizationFailure,
    getAdminOrganization,
} from "../reducer/admin-organizations";
import {
    getAdminOrganizationsRequest,
    createAdminOrganizationRequest,
    updateAdminOrganizationRequest,
    updateAdminOrganizationLogoRequest,
    deleteAdminOrganizationRequest,
    getAdminOrganizationRequest,
} from "../../services/organizations/organizations.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getAdminOrganizationSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminOrganizationRequest,
            actions.payload
        );
        yield put(getAdminOrganizationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getAdminOrganizationFailure.type
        );
    }
}

function* getAdminOrganizationsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getAdminOrganizationsRequest,
            actions.payload
        );
        yield put(getAdminOrganizationsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getAdminOrganizationsFailure.type
        );
    }
}

function* createAdminOrganizationSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createAdminOrganizationRequest,
            actions.payload
        );
        yield put(createAdminOrganizationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createAdminOrganizationFailure.type,
            true
        );
    }
}

function* deleteAdminOrganizationSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            deleteAdminOrganizationRequest,
            actions.payload
        );
        yield put(deleteAdminOrganizationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteAdminOrganizationFailure.type,
            true
        );
    }
}

function* updateAdminOrganizationSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(updateAdminOrganizationRequest, {
            ...actions.payload,
            logo: undefined,
        });
        if (actions.payload?.logo) {
            yield call(updateAdminOrganizationLogoRequest, {
                id: actions?.payload?.id,
                logo: actions?.payload?.logo,
                _method: "PATCH",
            });
        }
        yield put(updateAdminOrganizationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateAdminOrganizationFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getAdminOrganization.type, getAdminOrganizationSaga);
    yield takeLatest(getAdminOrganizations.type, getAdminOrganizationsSaga);
    yield takeLatest(createAdminOrganization.type, createAdminOrganizationSaga);
    yield takeLatest(updateAdminOrganization.type, updateAdminOrganizationSaga);
    yield takeLatest(deleteAdminOrganization.type, deleteAdminOrganizationSaga);
}
