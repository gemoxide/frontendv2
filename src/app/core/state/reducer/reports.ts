import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import {
    Reports,
    ReportsRequestActionPayload,
    GetConverionBenchmarkRequestActionPayload,
} from "../types/reports";
import { useDispatch } from "react-redux";

const initialState: Reports = {
    getActiveMembersReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getTaskLeaderboardReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSalesTrackerReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getCoachedClientsReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getDashboardTotal: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getDashboardPercentage: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMembershipSalesReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getAllMembersReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getAllLeadsReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getCoachTaskReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSalesAgreementReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getCoachedClientsSalesReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberEnrollmentReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getWigReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getOrganizationWigReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getOrganizationOverallWigReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSandboxSalesForecast: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSandboxWig: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getConversionBenchmark: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getRevenueGap: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getCoachedClientCombinedProgress: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getEightWeekProgress: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getSalesAppointmentReport: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        getActiveMembersReport(state, actions: ReportsRequestActionPayload) {
            state.getActiveMembersReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getActiveMembersReportSuccess(state, actions) {
            state.getActiveMembersReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getActiveMembersReportFailure(state) {
            state.getActiveMembersReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getTaskLeaderboardReport(state, actions: ReportsRequestActionPayload) {
            state.getTaskLeaderboardReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getTaskLeaderboardReportSuccess(state, actions) {
            state.getTaskLeaderboardReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getTaskLeaderboardReportFailure(state) {
            state.getTaskLeaderboardReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getSalesTrackerReport(state, actions: ReportsRequestActionPayload) {
            state.getSalesTrackerReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSalesTrackerReportSuccess(state, actions) {
            state.getSalesTrackerReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSalesTrackerReportFailure(state) {
            state.getSalesTrackerReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getCoachedClientsReport(state, actions: ReportsRequestActionPayload) {
            state.getCoachedClientsReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getCoachedClientsReportSuccess(state, actions) {
            state.getCoachedClientsReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getCoachedClientsReportFailure(state) {
            state.getCoachedClientsReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getDashboardTotal(state, actions: ReportsRequestActionPayload) {
            state.getDashboardTotal = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getDashboardPercentage(state, actions: ReportsRequestActionPayload) {
            state.getDashboardPercentage = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getDashboardTotalSuccess(state, actions) {
            state.getDashboardTotal = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getDashboardPercentageSuccess(state, actions) {
            state.getDashboardPercentage = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getDashboardTotalFailure(state) {
            state.getDashboardTotal = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getDashboardPercentageFailure(state) {
            state.getDashboardPercentage = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMembershipSalesReport(state, actions: ReportsRequestActionPayload) {
            state.getMembershipSalesReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMembershipSalesReportSuccess(state, actions) {
            state.getMembershipSalesReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMembershipSalesReportFailure(state) {
            state.getMembershipSalesReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getAllMembersReport(state, actions: ReportsRequestActionPayload) {
            state.getAllMembersReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getCoachTaskReport(state, actions: ReportsRequestActionPayload) {
            state.getCoachTaskReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSalesAgreementReport(state, actions: ReportsRequestActionPayload) {
            state.getSalesAgreementReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAllMembersReportSuccess(state, actions) {
            state.getAllMembersReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getCoachTaskReportSuccess(state, actions) {
            state.getCoachTaskReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSalesAgreementReportSuccess(state, actions) {
            state.getSalesAgreementReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAllMembersReportFailure(state) {
            state.getAllMembersReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getAllLeadsReport(state, actions: ReportsRequestActionPayload) {
            state.getAllLeadsReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getAllLeadsReportSuccess(state, actions) {
            state.getAllLeadsReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getAllLeadsReportFailure(state) {
            state.getAllLeadsReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getCoachTaskReportFailure(state) {
            state.getCoachTaskReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getSalesAgreementReportFailure(state) {
            state.getSalesAgreementReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getCoachedClientsSalesReport(
            state,
            actions: ReportsRequestActionPayload
        ) {
            state.getCoachedClientsSalesReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getCoachedClientsSalesReportSuccess(state, actions) {
            state.getCoachedClientsSalesReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getCoachedClientsSalesReportFailure(state) {
            state.getCoachedClientsSalesReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMemberEnrollmentReport(state, actions: ReportsRequestActionPayload) {
            state.getMemberEnrollmentReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberEnrollmentReportSuccess(state, actions) {
            state.getMemberEnrollmentReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberEnrollmentReportFailure(state) {
            state.getMemberEnrollmentReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getWigReport(state, actions: ReportsRequestActionPayload) {
            state.getWigReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getWigReportSuccess(state, actions) {
            state.getWigReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getWigReportFailure(state) {
            state.getWigReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getOrganizationWigReport(state, actions: ReportsRequestActionPayload) {
            state.getOrganizationWigReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getOrganizationWigReportSuccess(state, actions) {
            state.getOrganizationWigReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationWigReportFailure(state) {
            state.getOrganizationWigReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getOrganizationOverallWigReport(state) {
            state.getOrganizationOverallWigReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getOrganizationOverallWigReportSuccess(state, actions) {
            state.getOrganizationOverallWigReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getOrganizationOverallWigReportFailure(state) {
            state.getOrganizationOverallWigReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getSandboxSalesForecast(state, actions: ReportsRequestActionPayload) {
            state.getSandboxSalesForecast = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSandboxSalesForecastSuccess(state, actions) {
            state.getSandboxSalesForecast = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSandboxSalesForecastFailure(state) {
            state.getSandboxSalesForecast = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getSandboxSalesForecastLoading(state) {
            state.getSandboxSalesForecast = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSandboxWig(state, actions: ReportsRequestActionPayload) {
            state.getSandboxWig = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSandboxWigSuccess(state, actions) {
            state.getSandboxWig = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSandboxWigFailure(state) {
            state.getSandboxWig = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getSandboxWigLoading(state) {
            state.getSandboxWig = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getConversionBenchmark(
            state,
            actions: GetConverionBenchmarkRequestActionPayload
        ) {
            state.getConversionBenchmark = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getConversionBenchmarkSuccess(state, actions) {
            state.getConversionBenchmark = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getConversionBenchmarkFailure(state) {
            state.getConversionBenchmark = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getConversionBenchmarkLoading(state) {
            state.getConversionBenchmark = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getRevenueGap(state, actions: ReportsRequestActionPayload) {
            state.getRevenueGap = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getRevenueGapSuccess(state, actions) {
            state.getRevenueGap = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getRevenueGapFailure(state) {
            state.getRevenueGap = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getRevenueGapLoading(state) {
            state.getRevenueGap = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getCoachedClientCombinedProgress(state) {
            state.getCoachedClientCombinedProgress = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getCoachedClientCombinedProgressSuccess(state, actions) {
            state.getCoachedClientCombinedProgress = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getCoachedClientCombinedProgressFailure(state) {
            state.getCoachedClientCombinedProgress = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getCoachedClientCombinedProgressLoading(state) {
            state.getCoachedClientCombinedProgress = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        clearReports(state) {
            state = initialState;
        },
        getEightWeekProgress(state) {
            state.getEightWeekProgress = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getEightWeekProgressSuccess(state, actions) {
            state.getEightWeekProgress = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getEightWeekProgressFailure(state) {
            state.getEightWeekProgress = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getEightWeekProgressLoading(state) {
            state.getEightWeekProgress = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSalesAppointmentReport(state, actions: ReportsRequestActionPayload) {
            state.getSalesAppointmentReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getSalesAppointmentReportSuccess(state, actions) {
            state.getSalesAppointmentReport = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getSalesAppointmentReportFailure(state) {
            state.getSalesAppointmentReport = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getSalesAppointmentReportLoading(state) {
            state.getSalesAppointmentReport = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
    },
});

export const {
    getActiveMembersReport,
    getActiveMembersReportFailure,
    getActiveMembersReportSuccess,
    getTaskLeaderboardReport,
    getTaskLeaderboardReportFailure,
    getTaskLeaderboardReportSuccess,
    getSalesTrackerReport,
    getSalesTrackerReportFailure,
    getSalesTrackerReportSuccess,
    getCoachedClientsReport,
    getCoachedClientsReportFailure,
    getCoachedClientsReportSuccess,
    getDashboardTotal,
    getDashboardTotalFailure,
    getDashboardTotalSuccess,
    getDashboardPercentage,
    getDashboardPercentageFailure,
    getDashboardPercentageSuccess,
    getMembershipSalesReport,
    getMembershipSalesReportFailure,
    getMembershipSalesReportSuccess,
    getAllMembersReport,
    getAllMembersReportFailure,
    getAllMembersReportSuccess,
    getAllLeadsReport,
    getAllLeadsReportFailure,
    getAllLeadsReportSuccess,
    getCoachTaskReport,
    getCoachTaskReportFailure,
    getCoachTaskReportSuccess,
    getSalesAgreementReport,
    getSalesAgreementReportFailure,
    getSalesAgreementReportSuccess,
    getCoachedClientsSalesReport,
    getCoachedClientsSalesReportFailure,
    getCoachedClientsSalesReportSuccess,
    getMemberEnrollmentReport,
    getMemberEnrollmentReportFailure,
    getMemberEnrollmentReportSuccess,
    getWigReport,
    getWigReportFailure,
    getWigReportSuccess,
    getOrganizationWigReport,
    getOrganizationWigReportFailure,
    getOrganizationWigReportSuccess,
    getOrganizationOverallWigReport,
    getOrganizationOverallWigReportFailure,
    getOrganizationOverallWigReportSuccess,
    getSandboxSalesForecast,
    getSandboxSalesForecastFailure,
    getSandboxSalesForecastSuccess,
    getSandboxSalesForecastLoading,
    getSandboxWig,
    getSandboxWigFailure,
    getSandboxWigSuccess,
    getSandboxWigLoading,
    getConversionBenchmark,
    getConversionBenchmarkFailure,
    getConversionBenchmarkSuccess,
    getConversionBenchmarkLoading,
    getRevenueGap,
    getRevenueGapFailure,
    getRevenueGapSuccess,
    getRevenueGapLoading,
    getCoachedClientCombinedProgress,
    getCoachedClientCombinedProgressFailure,
    getCoachedClientCombinedProgressSuccess,
    getCoachedClientCombinedProgressLoading,
    clearReports,
    getEightWeekProgress,
    getEightWeekProgressFailure,
    getEightWeekProgressSuccess,
    getEightWeekProgressLoading,
    getSalesAppointmentReport,
    getSalesAppointmentReportFailure,
    getSalesAppointmentReportSuccess,
    getSalesAppointmentReportLoading,
} = reportsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getActiveMembersReport,
            getTaskLeaderboardReport,
            getSalesTrackerReport,
            getCoachedClientsReport,
            getDashboardTotal,
            getDashboardPercentage,
            getMembershipSalesReport,
            getAllMembersReport,
            getAllLeadsReport,
            getCoachTaskReport,
            getSalesAgreementReport,
            getCoachedClientsSalesReport,
            getMemberEnrollmentReport,
            getWigReport,
            getOrganizationWigReport,
            getOrganizationOverallWigReport,
            getSandboxSalesForecast,
            getSandboxWig,
            getConversionBenchmark,
            getRevenueGap,
            getCoachedClientCombinedProgress,
            clearReports,
            getEightWeekProgress,
            getSalesAppointmentReport,
        },
        useDispatch()
    );
};

export default reportsSlice.reducer;
