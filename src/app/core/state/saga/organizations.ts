import { takeLatest, call, put } from "redux-saga/effects";
import {
    getOrganization,
    getOrganizationFailure,
    getOrganizationSuccess,
    updateOrganizationLogo,
    updateOrganizationLogoFailure,
    updateOrganizationLogoSuccess,
    updateOrganization,
    updateOrganizationFailure,
    updateOrganizationSuccess,
    updateOrganizationLeadManagement,
    updateOrganizationLeadManagementFailure,
    updateOrganizationLeadManagementSuccess,
    updateOrganizationCoachAssessment,
    updateOrganizationCoachAssessmentFailure,
    updateOrganizationCoachAssessmentSuccess,
} from "../reducer/organizations";
import {
    getOrganizationRequest,
    updateOrganizationRequest,
    updateOrganizationLogoRequest,
    updateOrganizationLeadManagementRequest,
    updateOrganizationCoachAssessmentRequest,
} from "../../services/organizations/organizations.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getOrganizationSaga() {
    try {
        const { data }: AxiosResponse = yield call(getOrganizationRequest);
        yield put(getOrganizationSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getOrganizationFailure.type);
    }
}

function* updateOrganizationLogoSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateOrganizationLogoRequest,
            actions.payload
        );
        yield put(updateOrganizationLogoSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateOrganizationLogoFailure.type
        );
    }
}

function* updateOrganizationSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateOrganizationRequest,
            actions.payload
        );
        yield put(updateOrganizationSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateOrganizationFailure.type,
            true
        );
    }
}

function* updateOrganizationLeadManagementSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateOrganizationLeadManagementRequest,
            actions.payload
        );
        yield put(updateOrganizationLeadManagementSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateOrganizationLeadManagementFailure.type,
            true
        );
    }
}

function* updateOrganizationCoachAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateOrganizationCoachAssessmentRequest,
            actions.payload
        );
        yield put(updateOrganizationCoachAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateOrganizationCoachAssessmentFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getOrganization.type, getOrganizationSaga);
    yield takeLatest(updateOrganizationLogo.type, updateOrganizationLogoSaga);
    yield takeLatest(updateOrganization.type, updateOrganizationSaga);
    yield takeLatest(
        updateOrganizationLeadManagement.type,
        updateOrganizationLeadManagementSaga
    );
    yield takeLatest(
        updateOrganizationCoachAssessment.type,
        updateOrganizationCoachAssessmentSaga
    );
}
