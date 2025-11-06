import { takeLatest, call, put } from "redux-saga/effects";
import {
    createMemberSalesAgreement,
    createMemberSalesAgreementFailure,
    createMemberSalesAgreementSuccess,
    deleteMemberSalesAgreement,
    deleteMemberSalesAgreementFailure,
    deleteMemberSalesAgreementSuccess,
    getMemberSalesAgreement,
    getMemberSalesAgreementFailure,
    getMemberSalesAgreementSuccess,
    getMemberSalesAgreements,
    getMemberSalesAgreementsSuccess,
    updateMemberSalesAgreement,
    updateMemberSalesAgreementFailure,
    updateMemberSalesAgreementSuccess,
    cancelMemberSalesAgreement,
    cancelMemberSalesAgreementFailure,
    cancelMemberSalesAgreementSuccess,
} from "../reducer/member-sales-agreements";

import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import {
    createMemberSalesAgreementRequest,
    deleteMemberSalesAgreementRequest,
    getMemberSalesAgreementRequest,
    getMemberSalesAgreementsRequest,
    updateMemberSalesAgreementRequest,
    cancelMemberSalesAgreementRequest,
} from "../../services/member-sales-agreements/member-sales-agreements.services";

function* getMemberSalesAgreementsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getMemberSalesAgreementsRequest,
            actions.payload
        );
        yield put(getMemberSalesAgreementsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberSalesAgreementFailure.type,
            true
        );
    }
}

function* getMemberSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getMemberSalesAgreementRequest,
            actions.payload
        );
        yield put(getMemberSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberSalesAgreementFailure.type,
            true
        );
    }
}

function* createMemberSalesAgreementSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createMemberSalesAgreementRequest,
            actions.payload
        );
        yield put(createMemberSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createMemberSalesAgreementFailure.type,
            true
        );
    }
}

function* deleteMemberSalesAgreementSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteMemberSalesAgreementRequest,
            actions.payload
        );
        yield put(deleteMemberSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteMemberSalesAgreementFailure.type,
            true
        );
    }
}

function* updateMemberSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateMemberSalesAgreementRequest,
            actions.payload
        );
        yield put(updateMemberSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateMemberSalesAgreementFailure.type,
            true
        );
    }
}

function* cancelMemberSalesAgreementSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            cancelMemberSalesAgreementRequest,
            actions.payload.params,
            actions.payload.payload
        );
        yield put(cancelMemberSalesAgreementSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            cancelMemberSalesAgreementFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(
        getMemberSalesAgreements.type,
        getMemberSalesAgreementsSaga
    );
    yield takeLatest(getMemberSalesAgreement.type, getMemberSalesAgreementSaga);
    yield takeLatest(
        createMemberSalesAgreement.type,
        createMemberSalesAgreementSaga
    );
    yield takeLatest(
        deleteMemberSalesAgreement.type,
        deleteMemberSalesAgreementSaga
    );
    yield takeLatest(
        updateMemberSalesAgreement.type,
        updateMemberSalesAgreementSaga
    );
    yield takeLatest(
        cancelMemberSalesAgreement.type,
        cancelMemberSalesAgreementSaga
    );
}
