import { takeLatest, call, put } from "redux-saga/effects";
import {
    getForms,
    getFormsFailure,
    getFormsSuccess,
    createForm,
    createFormFailure,
    createFormSuccess,
    deleteForm,
    deleteFormFailure,
    deleteFormSuccess,
    updateForm,
    updateFormFailure,
    updateFormSuccess,
    getForm,
    getFormFailure,
    getFormSuccess,
    updateAdminFormStatusSuccess,
    updateAdminFormStatusFailure,
    updateAdminFormStatus,
    cloneFormSuccess,
    cloneFormFailure,
    cloneForm,
} from "../reducer/forms";
import {
    createFormRequest,
    deleteFormRequest,
    updateFormRequest,
    getFormsRequest,
    getFormRequest,
    updateAdminFormStatusRequest,
    cloneFormRequest,
} from "../../services/forms/forms.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getFormsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getFormsRequest,
            actions.payload
        );
        yield put(getFormsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getFormsFailure.type, true);
    }
}

function* createFormSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createFormRequest,
            actions.payload
        );
        yield put(createFormSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createFormFailure.type, true);
    }
}

function* deleteFormSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteFormRequest,
            actions.payload
        );
        yield put(deleteFormSuccess({ ...data, id: actions.payload }));
    } catch (err: any) {
        yield call(handleServerException, err, deleteFormFailure.type, true);
    }
}
function* updateFormSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateFormRequest,
            actions.payload
        );
        yield put(updateFormSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateFormFailure.type, true);
    }
}

function* getFormSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getFormRequest,
            actions.payload
        );
        yield put(getFormSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getFormFailure.type, true);
    }
}

function* updateAdminFormStatusSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateAdminFormStatusRequest,
            actions.payload
        );
        yield put(updateAdminFormStatusSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateAdminFormStatusFailure.type, true);
    }
}

function* cloneFormSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            cloneFormRequest,
            actions.payload
        );
        yield put(cloneFormSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, cloneFormFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getForms.type, getFormsSaga);
    yield takeLatest(createForm.type, createFormSaga);
    yield takeLatest(deleteForm.type, deleteFormSaga);
    yield takeLatest(updateForm.type, updateFormSaga);
    yield takeLatest(getForm.type, getFormSaga);
    yield takeLatest(updateAdminFormStatus.type, updateAdminFormStatusSaga);
    yield takeLatest(cloneForm.type, cloneFormSaga);
}
