import { takeLatest, call, put } from "redux-saga/effects";
import {
    getGyms,
    getGymsFailure,
    getGymsSuccess,
    createGym,
    createGymFailure,
    createGymSuccess,
    deleteGym,
    deleteGymSuccess,
    deleteGymFailure,
    updateGym,
    updateGymFailure,
    updateGymSuccess,
    getGym,
    getGymFailure,
    getGymSuccess,
    getOrganizationGyms,
    getOrganizationGymSuccess,
    getOrganizationGymsFailure,
    createOrganizationGymSuccess,
    createOrganizationGymFailure,
    createOrganizationGym,
    updateDefaults,
    updateDefaultsFailure,
    updateDefaultsSuccess,
    updateWig,
    updateWigFailure,
    updateWigSuccess,
    getMembersByGym,
    getMembersByGymSuccess,
    getMembersByGymFailure,
} from "../reducer/gyms";
import {
    createGymRequest,
    getGymsRequest,
    deleteGymRequest,
    updateGymRequest,
    getGymRequest,
    getOrganizationUsersGymsRequest,
    createOrganizationGymsRequest,
    updateGymDefaults,
    updateWigRequest,
    getMembersByGymIdRequest,
} from "../../services/gyms/gyms.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getGymsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(getGymsRequest, actions.payload);
        yield put(getGymsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getGymsFailure.type, true);
    }
}

function* getOrganizationGymsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getOrganizationUsersGymsRequest,
            actions.payload
        );
        yield put(getOrganizationGymSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getOrganizationGymsFailure.type,
            true
        );
    }
}

function* createGymSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createGymRequest,
            actions.payload
        );
        yield put(createGymSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createGymFailure.type, true);
    }
}

function* createOrganizationGymSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createOrganizationGymsRequest,
            actions.payload
        );
        yield put(createOrganizationGymSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createOrganizationGymFailure.type,
            true
        );
    }
}

function* deleteGymSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteGymRequest,
            actions.payload
        );
        yield put(deleteGymSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, deleteGymFailure.type, true);
    }
}

function* updateGymSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateGymRequest,
            actions.payload
        );
        yield put(updateGymSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateGymFailure.type, true);
    }
}

function* getGymSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getGymRequest,
            actions.payload
        );
        yield put(getGymSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getGymFailure.type, true);
    }
}

function* updateDefaultsSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateGymDefaults,
            actions.payload
        );
        yield put(updateDefaultsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateDefaultsFailure.type,
            true
        );
    }
}

function* updateWigSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateWigRequest,
            actions.payload
        );
        yield put(updateWigSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateWigFailure.type, true);
    }
}

function* getMembersByGymSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(getMembersByGymIdRequest);
        yield put(getMembersByGymSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMembersByGymFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getGyms.type, getGymsSaga);
    yield takeLatest(getOrganizationGyms.type, getOrganizationGymsSaga);
    yield takeLatest(createOrganizationGym.type, createOrganizationGymSaga);
    yield takeLatest(createGym.type, createGymSaga);
    yield takeLatest(deleteGym.type, deleteGymSaga);
    yield takeLatest(updateGym.type, updateGymSaga);
    yield takeLatest(getGym.type, getGymSaga);
    yield takeLatest(updateDefaults.type, updateDefaultsSaga);
    yield takeLatest(updateWig.type, updateWigSaga);
    yield takeLatest(getMembersByGym.type, getMembersByGymSaga);
}
