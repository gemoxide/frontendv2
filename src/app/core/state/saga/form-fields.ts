import { takeLatest, call, put } from "redux-saga/effects";
import {
    getFormFields,
    getFormFieldsFailure,
    getFormFieldsSuccess,
    createFormField,
    createFormFieldFailure,
    createFormFieldSuccess,
    deleteFormField,
    deleteFormFieldFailure,
    deleteFormFieldSuccess,
    updateFormField,
    updateFormFieldFailure,
    updateFormFieldSuccess,
    getFormField,
    getFormFieldFailure,
    getFormFieldSuccess,
    sortFormFieldsSuccess,
    sortFormFieldsFailure,
    sortFormFields,
} from "../reducer/form-fields";
import {
    createFormFieldRequest,
    deleteFormFieldRequest,
    updateFormFieldRequest,
    getFormFieldsRequest,
    getFormFieldRequest,
    sortFormFieldsRequest,
} from "../../services/form-fields/form-fields.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import {
    CreateFormFieldRequestActionPayload,
    DeleteFormFieldRequestActionPayload,
    GetFormFieldRequestActionPayload,
    GetFormFieldsRequestActionPayload,
    UpdateFormFieldRequestActionPayload,
} from "../types/form-fields";

function* getFormFieldsSaga(actions: GetFormFieldsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getFormFieldsRequest,
            actions.payload.id,
            actions.payload.query
        );
        yield put(getFormFieldsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getFormFieldsFailure.type, true);
    }
}

function* createFormFieldSaga(actions: CreateFormFieldRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            createFormFieldRequest,
            actions.payload.id,
            actions.payload.body
        );
        yield put(createFormFieldSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createFormFieldFailure.type,
            true
        );
    }
}

function* deleteFormFieldSaga(actions: DeleteFormFieldRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteFormFieldRequest,
            actions.payload.id,
            actions.payload.form_field_id
        );
        yield put(
            deleteFormFieldSuccess({
                ...data,
                id: actions.payload.form_field_id,
            })
        );
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteFormFieldFailure.type,
            true
        );
    }
}
function* updateFormFieldSaga(actions: UpdateFormFieldRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            updateFormFieldRequest,
            actions.payload.id,
            actions.payload.body
        );
        yield put(updateFormFieldSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateFormFieldFailure.type,
            true
        );
    }
}

function* getFormFieldSaga(actions: GetFormFieldRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            getFormFieldRequest,
            actions.payload.id,
            actions.payload.form_field_id
        );
        yield put(getFormFieldSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getFormFieldFailure.type, true);
    }
}

function* sortFormFieldsSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            sortFormFieldsRequest,
            actions.payload.id,
            actions.payload.body
        );
        yield put(sortFormFieldsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            sortFormFieldsFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getFormFields.type, getFormFieldsSaga);
    yield takeLatest(createFormField.type, createFormFieldSaga);
    yield takeLatest(deleteFormField.type, deleteFormFieldSaga);
    yield takeLatest(updateFormField.type, updateFormFieldSaga);
    yield takeLatest(getFormField.type, getFormFieldSaga);
    yield takeLatest(sortFormFields.type, sortFormFieldsSaga);
}
