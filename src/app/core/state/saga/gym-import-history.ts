import { takeLatest, call, put } from "redux-saga/effects";

import {
    getGymImportHistory,
    getGymImportHistoryFailure,
    getGymImportHistorySuccess,
    getGymImportHistoryLoading,
    createGymImportHistory,
    createGymImportHistoryFailure,
    createGymImportHistorySuccess,
    createGymImportHistoryLoading,
} from "../reducer/gym-import-history";

import {
    createGymImportHistoryRequest,
    getGymImportHistoryRequest,
} from "../../services/gym-import-history/gym-import-history.service";

import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getGymImportHistorySaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymImportHistoryRequest,
            actions.payload
        );
        yield put(getGymImportHistorySuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGymImportHistoryFailure.type,
            true
        );
    }
}

function* createGymImportHistorySaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createGymImportHistoryRequest,
            actions.payload
        );
        yield put(createGymImportHistorySuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createGymImportHistoryFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getGymImportHistory.type, getGymImportHistorySaga);
    yield takeLatest(createGymImportHistory.type, createGymImportHistorySaga);
}
