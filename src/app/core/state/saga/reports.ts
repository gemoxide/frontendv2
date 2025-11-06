import { AxiosResponse } from "axios";
import {
    GetConverionBenchmarkRequestActionPayload,
    ReportsRequestActionPayload,
} from "../types/reports";
import {
    getActiveMembersReportRequest,
    getSalesTrackerReportRequest,
    getTaskLeaderboardReportRequest,
    getCoachedClientsReportRequest,
    getDashboardTotalReportRequest,
    getDashboardPercentageRequest,
    getMembershipSalesReportRequest,
    getAllMembersReportRequest,
    getAllLeadsReportRequest,
    getCoachTasksReportRequest,
    getSalesAgreementsReportRequest,
    getCoachedClientsSalesReportRequest,
    getMemberEnrollmentReportRequest,
    getWigFiguresReportRequest,
    getOrganizationWigFiguresReportRequest,
    getOrganizationOverallWigFiguresReportRequest,
    getSandboxSalesTrackerDataRequest,
    getSandboxWigRequest,
    getConversionBenchmarkRequest,
    getRevenueGapRequest,
    getCoachedClientCombinedProgressRequest,
    getEightWeekProgressRequest,
    getSalesAppointmentReportRequest,
} from "../../services/reports/reports.service";
import {
    getActiveMembersReport,
    getActiveMembersReportFailure,
    getActiveMembersReportSuccess,
    getSalesTrackerReport,
    getSalesTrackerReportFailure,
    getSalesTrackerReportSuccess,
    getTaskLeaderboardReport,
    getTaskLeaderboardReportFailure,
    getTaskLeaderboardReportSuccess,
    getCoachedClientsReport,
    getCoachedClientsReportSuccess,
    getCoachedClientsReportFailure,
    getDashboardTotal,
    getDashboardTotalSuccess,
    getDashboardTotalFailure,
    getDashboardPercentage,
    getDashboardPercentageSuccess,
    getDashboardPercentageFailure,
    getMembershipSalesReport,
    getMembershipSalesReportSuccess,
    getMembershipSalesReportFailure,
    getAllMembersReport,
    getAllMembersReportSuccess,
    getAllMembersReportFailure,
    getAllLeadsReport,
    getAllLeadsReportSuccess,
    getAllLeadsReportFailure,
    getCoachTaskReport,
    getCoachTaskReportSuccess,
    getCoachTaskReportFailure,
    getSalesAgreementReport,
    getSalesAgreementReportSuccess,
    getSalesAgreementReportFailure,
    getCoachedClientsSalesReport,
    getCoachedClientsSalesReportSuccess,
    getCoachedClientsSalesReportFailure,
    getMemberEnrollmentReport,
    getMemberEnrollmentReportSuccess,
    getMemberEnrollmentReportFailure,
    getWigReport,
    getWigReportSuccess,
    getWigReportFailure,
    getOrganizationWigReport,
    getOrganizationWigReportSuccess,
    getOrganizationWigReportFailure,
    getOrganizationOverallWigReport,
    getOrganizationOverallWigReportSuccess,
    getOrganizationOverallWigReportFailure,
    getSandboxSalesForecast,
    getSandboxSalesForecastSuccess,
    getSandboxSalesForecastFailure,
    getSandboxSalesForecastLoading,
    getSandboxWig,
    getSandboxWigSuccess,
    getSandboxWigFailure,
    getSandboxWigLoading,
    getConversionBenchmark,
    getConversionBenchmarkSuccess,
    getConversionBenchmarkFailure,
    getConversionBenchmarkLoading,
    getRevenueGap,
    getRevenueGapSuccess,
    getRevenueGapFailure,
    getRevenueGapLoading,
    getCoachedClientCombinedProgress,
    getCoachedClientCombinedProgressSuccess,
    getCoachedClientCombinedProgressFailure,
    getEightWeekProgress,
    getEightWeekProgressSuccess,
    getEightWeekProgressFailure,
    getSalesAppointmentReport,
    getSalesAppointmentReportSuccess,
    getSalesAppointmentReportFailure,
} from "../reducer/reports";
import { handleServerException } from "../../services/utils/utils.service";
import { call, put, takeLatest } from "redux-saga/effects";

function* getActiveMembersReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getActiveMembersReportRequest,
            actions.payload
        );
        yield put(getActiveMembersReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getActiveMembersReportFailure.type,
            true
        );
    }
}

function* getTaskLeaderboardReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getTaskLeaderboardReportRequest,
            actions.payload
        );
        yield put(getTaskLeaderboardReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getTaskLeaderboardReportFailure.type,
            true
        );
    }
}

function* getSalesTrackerReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getSalesTrackerReportRequest,
            actions.payload
        );
        yield put(getSalesTrackerReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getSalesTrackerReportFailure.type,
            true
        );
    }
}

function* getCoachedClientsReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getCoachedClientsReportRequest,
            actions.payload
        );
        yield put(getCoachedClientsReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getCoachedClientsReportFailure.type,
            true
        );
    }
}

function* getDashboardTotalSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getDashboardTotalReportRequest,
            actions.payload
        );
        yield put(getDashboardTotalSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getDashboardTotalFailure.type,
            true
        );
    }
}
function* getDashboardPercentageSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getDashboardPercentageRequest,
            actions.payload
        );
        yield put(getDashboardPercentageSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getDashboardPercentageFailure.type,
            true
        );
    }
}

function* getMembershipSalesReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getMembershipSalesReportRequest,
            actions.payload
        );
        yield put(getMembershipSalesReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMembershipSalesReportFailure.type,
            true
        );
    }
}

function* getAllMembersReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getAllMembersReportRequest,
            actions.payload
        );
        yield put(getAllMembersReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getAllMembersReportFailure.type,
            true
        );
    }
}

function* getCoachTaskReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getCoachTasksReportRequest,
            actions.payload
        );
        yield put(getCoachTaskReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getCoachTaskReportFailure.type,
            true
        );
    }
}
function* getSalesAgreementReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getSalesAgreementsReportRequest,
            actions.payload
        );
        yield put(getSalesAgreementReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getSalesAgreementReportFailure.type,
            true
        );
    }
}

function* getAllLeadsReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getAllLeadsReportRequest,
            actions.payload
        );
        yield put(getAllLeadsReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getAllLeadsReportFailure.type,
            true
        );
    }
}

function* getCoachedClientsSalesReportSaga(
    actions: ReportsRequestActionPayload
) {
    try {
        const data: AxiosResponse = yield call(
            getCoachedClientsSalesReportRequest,
            actions.payload
        );
        yield put(getCoachedClientsSalesReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getCoachedClientsSalesReportFailure.type,
            true
        );
    }
}

function* getMemberEnrollmentReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getMemberEnrollmentReportRequest,
            actions.payload
        );
        yield put(getMemberEnrollmentReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberEnrollmentReportFailure.type,
            true
        );
    }
}

function* getWigReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getWigFiguresReportRequest,
            actions.payload
        );
        yield put(getWigReportSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getWigReportFailure.type, true);
    }
}

function* getOrganizationWigReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getOrganizationWigFiguresReportRequest,
            actions.payload
        );
        yield put(getOrganizationWigReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getOrganizationWigReportFailure.type,
            true
        );
    }
}

function* getOrganizationOverallWigReportSaga(
    actions: ReportsRequestActionPayload
) {
    try {
        const data: AxiosResponse = yield call(
            getOrganizationOverallWigFiguresReportRequest,
            actions.payload
        );
        yield put(getOrganizationOverallWigReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getOrganizationOverallWigReportFailure.type,
            true
        );
    }
}

function* getSandboxSalesForecastSaga(actions: ReportsRequestActionPayload) {
    try {
        yield put(getSandboxSalesForecastLoading());
        const data: AxiosResponse = yield call(
            getSandboxSalesTrackerDataRequest,
            actions.payload
        );
        yield put(getSandboxSalesForecastSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getSandboxSalesForecastFailure.type,
            true
        );
    }
}

function* getSandboxWigSaga(actions: ReportsRequestActionPayload) {
    try {
        yield put(getSandboxWigLoading());
        const data: AxiosResponse = yield call(
            getSandboxWigRequest,
            actions.payload
        );
        yield put(getSandboxWigSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getSandboxWigFailure.type, true);
    }
}

function* getConversionBenchmarkSaga(
    actions: GetConverionBenchmarkRequestActionPayload
) {
    try {
        yield put(getConversionBenchmarkLoading());
        const data: AxiosResponse = yield call(
            getConversionBenchmarkRequest,
            actions.payload
        );
        yield put(getConversionBenchmarkSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getConversionBenchmarkFailure.type,
            true
        );
    }
}

function* getCoachedClientCombinedProgressSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getCoachedClientCombinedProgressRequest,
            actions.payload
        );
        yield put(getCoachedClientCombinedProgressSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getCoachedClientCombinedProgressFailure.type,
            true
        );
    }
}

function* getRevenueGapSaga(actions: ReportsRequestActionPayload) {
    try {
        yield put(getRevenueGapLoading());
        const data: AxiosResponse = yield call(
            getRevenueGapRequest,
            actions.payload
        );
        yield put(getRevenueGapSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getRevenueGapFailure.type, true);
    }
}

function* getEightWeekProgressSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getEightWeekProgressRequest,
            actions.payload
        );
        yield put(getEightWeekProgressSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getEightWeekProgressFailure.type,
            true
        );
    }
}

function* getSalesAppointmentReportSaga(actions: ReportsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getSalesAppointmentReportRequest,
            actions.payload
        );
        yield put(getSalesAppointmentReportSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getSalesAppointmentReportFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getActiveMembersReport.type, getActiveMembersReportSaga);
    yield takeLatest(
        getTaskLeaderboardReport.type,
        getTaskLeaderboardReportSaga
    );
    yield takeLatest(getSalesTrackerReport.type, getSalesTrackerReportSaga);
    yield takeLatest(getCoachedClientsReport.type, getCoachedClientsReportSaga);
    yield takeLatest(getDashboardTotal.type, getDashboardTotalSaga);
    yield takeLatest(getDashboardPercentage.type, getDashboardPercentageSaga);
    yield takeLatest(
        getMembershipSalesReport.type,
        getMembershipSalesReportSaga
    );
    yield takeLatest(getAllMembersReport.type, getAllMembersReportSaga);
    yield takeLatest(getAllLeadsReport.type, getAllLeadsReportSaga);
    yield takeLatest(getCoachTaskReport.type, getCoachTaskReportSaga);
    yield takeLatest(getSalesAgreementReport.type, getSalesAgreementReportSaga);
    yield takeLatest(
        getCoachedClientsSalesReport.type,
        getCoachedClientsSalesReportSaga
    );
    yield takeLatest(
        getMemberEnrollmentReport.type,
        getMemberEnrollmentReportSaga
    );
    yield takeLatest(getWigReport.type, getWigReportSaga);
    yield takeLatest(
        getOrganizationWigReport.type,
        getOrganizationWigReportSaga
    );
    yield takeLatest(
        getOrganizationOverallWigReport.type,
        getOrganizationOverallWigReportSaga
    );
    yield takeLatest(getSandboxSalesForecast.type, getSandboxSalesForecastSaga);
    yield takeLatest(getSandboxWig.type, getSandboxWigSaga);
    yield takeLatest(getConversionBenchmark.type, getConversionBenchmarkSaga);
    yield takeLatest(getRevenueGap.type, getRevenueGapSaga);
    yield takeLatest(
        getCoachedClientCombinedProgress.type,
        getCoachedClientCombinedProgressSaga
    );
    yield takeLatest(getEightWeekProgress.type, getEightWeekProgressSaga);
    yield takeLatest(
        getSalesAppointmentReport.type,
        getSalesAppointmentReportSaga
    );
}
