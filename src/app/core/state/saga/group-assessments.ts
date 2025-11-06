import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    createGroupAssessmentRequest,
    getGroupAssessmentRequest,
    getGroupAssessmentsRequest,
    getMemberGroupAssessmentsRequest,
    getMemberLatestGroupAssessmentsRequest,
    getMemberProgressReportRequest,
    updateGroupAssessmentRequest,
    updateMemberAssessmentRequest,
    deleteGroupAssessmentRequest,
    startGroupAssessmentRequest,
} from "../../services/group-assessments/group-assessments.service";
import {
    createGroupAssessment,
    createGroupAssessmentFailure,
    createGroupAssessmentSuccess,
    getGroupAssessment,
    getGroupAssessmentFailure,
    getGroupAssessmentSuccess,
    getGroupAssessments,
    getGroupAssessmentsFailure,
    getGroupAssessmentsSuccess,
    getMemberGroupAssessments,
    getMemberGroupAssessmentsFailure,
    getMemberGroupAssessmentsSuccess,
    getMemberLatestGroupAssessment,
    getMemberLatestGroupAssessmentFailure,
    getMemberLatestGroupAssessmentSuccess,
    getMemberProgressReport,
    getMemberProgressReportFailure,
    getMemberProgressReportSuccess,
    updateGroupAssessment,
    updateGroupAssessmentFailure,
    updateGroupAssessmentSuccess,
    updateMemberAssessment,
    updateMemberAssessmentFailure,
    updateMemberAssessmentSuccess,
    deleteGroupAssessment,
    deleteGroupAssessmentFailure,
    deleteGroupAssessmentSuccess,
    startGroupAssessment,
    startGroupAssessmentFailure,
    startGroupAssessmentSuccess,
} from "../reducer/group-assessments";
import { handleServerException } from "../../services/utils/utils.service";

function* getGroupAssessmentsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGroupAssessmentsRequest,
            actions.payload
        );
        yield put(getGroupAssessmentsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGroupAssessmentsFailure.type,
            true
        );
    }
}

function* getMemberGroupAssessmentsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getMemberGroupAssessmentsRequest,
            actions.payload
        );
        yield put(getMemberGroupAssessmentsSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberGroupAssessmentsFailure.type,
            true
        );
    }
}

function* getMemberLatestGroupAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getMemberLatestGroupAssessmentsRequest,
            actions.payload
        );
        yield put(getMemberLatestGroupAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberLatestGroupAssessmentFailure.type,
            true
        );
    }
}

function* getMemberProgressReportSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getMemberProgressReportRequest,
            actions.payload
        );
        yield put(getMemberProgressReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberProgressReportFailure.type,
            true
        );
    }
}

function* getGroupAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getGroupAssessmentRequest,
            actions.payload
        );
        yield put(getGroupAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGroupAssessmentFailure.type,
            true
        );
    }
}

function* createGroupAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createGroupAssessmentRequest,
            actions.payload
        );
        yield put(createGroupAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createGroupAssessmentFailure.type,
            true
        );
    }
}

function* updateGroupAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateGroupAssessmentRequest,
            actions.payload
        );
        yield put(updateGroupAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateGroupAssessmentFailure.type,
            true
        );
    }
}

function* updateMemberAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberAssessmentRequest,
            actions.payload
        );
        yield put(updateMemberAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateMemberAssessmentFailure.type,
            true
        );
    }
}

function* deleteGroupAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteGroupAssessmentRequest,
            actions.payload
        );
        yield put(deleteGroupAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteGroupAssessmentFailure.type,
            true
        );
    }
}

function* startGroupAssessmentSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            startGroupAssessmentRequest,
            actions.payload
        );
        yield put(startGroupAssessmentSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            startGroupAssessmentFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getGroupAssessments.type, getGroupAssessmentsSaga);
    yield takeLatest(
        getMemberGroupAssessments.type,
        getMemberGroupAssessmentsSaga
    );
    yield takeLatest(getMemberProgressReport.type, getMemberProgressReportSaga);
    yield takeLatest(getGroupAssessment.type, getGroupAssessmentSaga);
    yield takeLatest(createGroupAssessment.type, createGroupAssessmentSaga);
    yield takeLatest(updateGroupAssessment.type, updateGroupAssessmentSaga);
    yield takeLatest(updateMemberAssessment.type, updateMemberAssessmentSaga);
    yield takeLatest(
        getMemberLatestGroupAssessment.type,
        getMemberLatestGroupAssessmentSaga
    );
    yield takeLatest(deleteGroupAssessment.type, deleteGroupAssessmentSaga);
    yield takeLatest(startGroupAssessment.type, startGroupAssessmentSaga);
}
