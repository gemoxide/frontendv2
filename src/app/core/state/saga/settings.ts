import { takeLatest, call, put } from "redux-saga/effects";
import {
    getSettings,
    getSettingsFailure,
    getSettingsSuccess,
} from "../reducer/settings";
import { getSettingsRequest } from "../../services/settings/settings.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getAdminOrganizationsSaga() {
    try {
        const { data }: AxiosResponse = yield call(getSettingsRequest);
        yield put(getSettingsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getSettingsFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getSettings.type, getAdminOrganizationsSaga);
}
