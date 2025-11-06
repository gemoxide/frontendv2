import { takeLatest, call, put } from "redux-saga/effects";

import {
    getGymRevenues,
    getGymRevenuesFailure,
    getGymRevenuesSuccess,
    createGymRevenue,
    createGymRevenueFailure,
    createGymRevenueSuccess,
    deleteGymRevenue,
    deleteGymRevenueSuccess,
    deleteGymRevenueFailure,
    updateGymRevenue,
    updateGymRevenueFailure,
    updateGymRevenueSuccess,
    getGymMonthRevenue,
    getGymMonthRevenueFailure,
    getGymMonthRevenueSuccess,
    getGymMonthlyWig,
    getGymMonthlyWigFailure,
    getGymMonthlyWigSuccess,
    getGymMonthlyWigTable,
    getGymMonthlyWigTableFailure,
    getGymMonthlyWigTableSuccess,
    getGapAnalysis,
    getGapAnalysisFailure,
    getGapAnalysisSuccess,
} from "../reducer/gym-revenue";

import {
    createGymRevenueRequest,
    getGymRevenuesRequest,
    deleteGymRevenueRequest,
    updateGymRevenueRequest,
    getGymMonthRevenueRequest,
    getGymMonthlyWigRequest,
    getGymMonthlyWigTableRequest,
    getGapAnalysisRequest,
} from "../../services/gym-revenue/gym-revenue.service";

import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getGymRevenuesSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymRevenuesRequest,
            actions.payload
        );
        yield put(getGymRevenuesSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGymRevenuesFailure.type,
            true
        );
    }
}

function* createGymRevenueSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            createGymRevenueRequest,
            actions.payload
        );
        yield put(createGymRevenueSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createGymRevenueFailure.type,
            true
        );
    }
}

function* deleteGymRevenueSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            deleteGymRevenueRequest,
            actions.payload
        );
        yield put(deleteGymRevenueSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteGymRevenueFailure.type,
            true
        );
    }
}

function* updateGymRevenueSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            updateGymRevenueRequest,
            actions.payload
        );
        yield put(updateGymRevenueSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateGymRevenueFailure.type,
            true
        );
    }
}

function* getGymMonthRevenueSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymMonthRevenueRequest,
            actions.payload
        );
        yield put(getGymMonthRevenueSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGymMonthRevenueFailure.type,
            true
        );
    }
}

function* getGymMonthlyWigSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymMonthlyWigRequest,
            actions.payload
        );
        yield put(getGymMonthlyWigSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGymMonthlyWigFailure.type,
            true
        );
    }
}

function* getGymMonthlyWigTableSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymMonthlyWigTableRequest,
            actions.payload
        );
        yield put(getGymMonthlyWigTableSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGymMonthlyWigTableFailure.type,
            true
        );
    }
}

function* getGapAnalysisSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGapAnalysisRequest,
            actions.payload
        );
        yield put(getGapAnalysisSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getGapAnalysisFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getGymRevenues.type, getGymRevenuesSaga);
    yield takeLatest(createGymRevenue.type, createGymRevenueSaga);
    yield takeLatest(deleteGymRevenue.type, deleteGymRevenueSaga);
    yield takeLatest(updateGymRevenue.type, updateGymRevenueSaga);
    yield takeLatest(getGymMonthRevenue.type, getGymMonthRevenueSaga);
    yield takeLatest(getGymMonthlyWig.type, getGymMonthlyWigSaga);
    yield takeLatest(getGymMonthlyWigTable.type, getGymMonthlyWigTableSaga);
    yield takeLatest(getGapAnalysis.type, getGapAnalysisSaga);
}
