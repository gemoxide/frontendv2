import { takeLatest, call, put } from "redux-saga/effects";

import {
    getOrganizationImportHistory,
    getOrganizationImportHistoryFailure,
    getOrganizationImportHistorySuccess,
    getOrganizationImportHistoryLoading,
    createOrganizationImportHistory,
    createOrganizationImportHistoryFailure,
    createOrganizationImportHistorySuccess,
    createOrganizationImportHistoryLoading,
} from "../reducer/organization-import-history";

import {
    createOrganizationImportHistoryRequest,
    getOrganizationImportHistoryRequest,
} from "../../services/organization-import-history/organization-import-history.service";

import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getOrganizationImportHistorySaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getOrganizationImportHistoryRequest,
            actions.payload
        );
        yield put(getOrganizationImportHistorySuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getOrganizationImportHistoryFailure.type,
            true
        );
    }
}

function* createOrganizationImportHistorySaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createOrganizationImportHistoryRequest,
            actions.payload
        );
        yield put(createOrganizationImportHistorySuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createOrganizationImportHistoryFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(
        getOrganizationImportHistory.type,
        getOrganizationImportHistorySaga
    );
    yield takeLatest(
        createOrganizationImportHistory.type,
        createOrganizationImportHistorySaga
    );
}
