import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    createFormContactFieldRequest,
    getFormContactFieldsRequest,
} from "../../services/form-contact-fields/form-contact-fields.service";
import { handleServerException } from "../../services/utils/utils.service";
import {
    createFormContactField,
    createFormContactFieldFailure,
    createFormContactFieldSuccess,
    getFormContactFields,
    getFormContactFieldsFailure,
    getFormContactFieldsSuccess,
} from "../reducer/form-contact-fields";

function* getFormContactFieldsSaga() {
    try {
        const data: AxiosResponse = yield call(getFormContactFieldsRequest);
        yield put(getFormContactFieldsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getFormContactFieldsFailure.type,
            true
        );
    }
}

function* createFormContactFieldSaga(actions: any) {
    try {
        7;
        const { data }: AxiosResponse = yield call(
            createFormContactFieldRequest,
            actions.payload
        );
        yield put(createFormContactFieldSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createFormContactFieldFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getFormContactFields.type, getFormContactFieldsSaga);
    yield takeLatest(createFormContactField.type, createFormContactFieldSaga);
}
