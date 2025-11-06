import { takeLatest, call, put } from "redux-saga/effects";
import {
    createSalesAgreement,
    createSalesAgreementFailure,
    createSalesAgreementSuccess,
    deleteSalesAgreement,
    deleteSalesAgreementFailure,
    deleteSalesAgreementSuccess,
    getGymSalesAgreements,
    getGymSalesAgreementsFailure,
    getGymSalesAgreementsSuccess,
    getOrganizationSalesAgreements,
    getOrganizationSalesAgreementsFailure,
    getOrganizationSalesAgreementsSuccess,
    getSalesAgreements,
    getSalesAgreementsFailure,
    getSalesAgreementsSuccess,
    updateSalesAgreement,
    updateSalesAgreementFailure,
    updateSalesAgreementSuccess
} from "../reducer/sales-agreements";


import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { createSalesAgreementRequest, deleteSalesAgreementRequest, getGymSalesAgreementsRequest, getOrganizationSalesAgreementsRequest , updateSalesAgreementRequest, getSalesAgreementsRequest } from "../../services/sales-agreements/sales-agreements.services";

function* getGymSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(getGymSalesAgreementsRequest, actions.payload);
        yield put(getGymSalesAgreementsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getGymSalesAgreementsFailure.type, true);
    }
}

function* getOrganizationSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(getOrganizationSalesAgreementsRequest, actions.payload);
        yield put(getOrganizationSalesAgreementsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getOrganizationSalesAgreementsFailure.type, true);
    }
}

function* getSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(getSalesAgreementsRequest, actions.payload);
        yield put(getSalesAgreementsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getSalesAgreementsFailure.type, true);
    }
}


function* createSalesAgreementSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createSalesAgreementRequest,
            actions.payload
        );
        yield put(createSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createSalesAgreementFailure.type, true);
    }
}

function* deleteSalesAgreementSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteSalesAgreementRequest,
            actions.payload
        );
        yield put(deleteSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, deleteSalesAgreementFailure.type, true);
    }
}

function* updateSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateSalesAgreementRequest,
            actions.payload
        );
        yield put(updateSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateSalesAgreementFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getGymSalesAgreements.type, getGymSalesAgreementSaga);
    yield takeLatest(getOrganizationSalesAgreements.type, getOrganizationSalesAgreementSaga);
    yield takeLatest(getSalesAgreements.type, getSalesAgreementSaga);
    yield takeLatest(createSalesAgreement.type, createSalesAgreementSaga);
    yield takeLatest(deleteSalesAgreement.type, deleteSalesAgreementSaga);
    yield takeLatest(updateSalesAgreement.type, updateSalesAgreementSaga);
}
