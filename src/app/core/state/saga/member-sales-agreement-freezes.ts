import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { createMemberSalesAgreementFreezeRequest, deleteMemberSalesAgreementFreezeRequest } from "../../services/member-sales-agreement-freezes/member-sales-agreement-freezes.services";
import { createMemberSalesAgreementFreeze, createMemberSalesAgreementFreezeFailure, createMemberSalesAgreementFreezeSuccess, deleteMemberSalesAgreementFreeze, deleteMemberSalesAgreementFreezeFailure, deleteMemberSalesAgreementFreezeSuccess } from "../reducer/member-sales-agreement-freezes";
import { handleServerException } from "../../services/utils/utils.service";

function* createMemberSalesAgreementFreezeSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createMemberSalesAgreementFreezeRequest,
            actions.payload
        );
        yield put(createMemberSalesAgreementFreezeSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createMemberSalesAgreementFreezeFailure.type, true);
    }
}

function* deleteMemberSalesAgreementFreezeSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteMemberSalesAgreementFreezeRequest,
            actions.payload
        );
        yield put(deleteMemberSalesAgreementFreezeSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, deleteMemberSalesAgreementFreezeFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(createMemberSalesAgreementFreeze.type, createMemberSalesAgreementFreezeSaga);
    yield takeLatest(deleteMemberSalesAgreementFreeze.type, deleteMemberSalesAgreementFreezeSaga);
}