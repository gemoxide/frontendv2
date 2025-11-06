import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from ".";
import {
    DashboardReportParam,
    FavoriteReportParam,
    IActiveMembersReportResponse,
    ISalesTrackerReportResponse,
    ITaskLeaderboardReportResponse,
    ICoachedClientsReportResponse,
    IDashboardPercentageReportResponse,
    ReportsQuery,
    IDashboardTotalReportResponse,
    IMembershipSalesReportResponse,
    IAllMembersAndLeadsReportResponse,
    ICoachTasksReportReponse,
    ISalesAgreementReportResponse,
    ICoachedClientsSalesReportResponse,
    IMemberEnrollmentReportResponse,
    IGymWigReportResponse,
    IOrganizationWigReportResponse,
    IConversionBenchMarkReportResponse,
    GetConversionBenchmarkParams,
    IRevenueGapReportResponse,
    ISalesForecastReportResponse,
    ICoachedClientCombinedProgressReportResponse,
    IEightWeekProgressReportResponse,
    ISalesAppointmentReportResponse,
} from "../../interfaces/reports.interface";
import { IUser } from "../../interfaces/user.interface";

export interface Reports {
    getActiveMembersReport: GetActiveMembersReport;
    getTaskLeaderboardReport: GetTaskLeaderboardReport;
    getSalesTrackerReport: GetSalesTrackerReport;
    getCoachedClientsReport: GetCoachedClientsReport;
    getDashboardTotal: GetDashboardTotal;
    getDashboardPercentage: GetDashboardPercentage;
    getMembershipSalesReport: GetMembershipSalesReport;
    getAllMembersReport: GetAllMembersAndLeadsReport;
    getAllLeadsReport: GetAllMembersAndLeadsReport;
    getCoachTaskReport: GetCoachTaskReport;
    getSalesAgreementReport: GetSalesAgreementReport;
    getCoachedClientsSalesReport: GetCoachedClientsSalesReport;
    getMemberEnrollmentReport: GetMemberEnrollmentReport;
    getWigReport: GetGymWigReport;
    getOrganizationWigReport: GetOrganizationWigReport;
    getOrganizationOverallWigReport: GetGymWigReport;
    getSandboxSalesForecast: GetSalesForecastReport;
    getSandboxWig: GetGymWigReport;
    getConversionBenchmark: GetConversionBenchmark;
    getRevenueGap: GetRevenueGap;
    getCoachedClientCombinedProgress: GetCoachedClientCombinedProgress;
    getEightWeekProgress: GetEightWeekProgress;
    getSalesAppointmentReport: GetSalesAppointmentReport;
}

export type GetGymWigReport = LoadingResult & {
    data?: IGymWigReportResponse;
};

export type GetOrganizationWigReport = LoadingResult & {
    data?: IOrganizationWigReportResponse;
};

export type GetActiveMembersReport = LoadingResult & {
    data?: IActiveMembersReportResponse;
};

export type GetTaskLeaderboardReport = LoadingResult & {
    data?: ITaskLeaderboardReportResponse;
};

export type GetDashboardTotal = LoadingResult & {
    data?: IDashboardTotalReportResponse;
};

export type GetSalesTrackerReport = LoadingResult & {
    data?: ISalesTrackerReportResponse;
};

export type GetSalesForecastReport = LoadingResult & {
    data?: ISalesForecastReportResponse;
};

export type GetConversionBenchmark = LoadingResult & {
    data?: IConversionBenchMarkReportResponse;
};

export type GetRevenueGap = LoadingResult & {
    data?: IRevenueGapReportResponse;
};

export type GetCoachedClientsReport = LoadingResult & {
    data?: ICoachedClientsReportResponse;
};

export type GetDashboardPercentage = LoadingResult & {
    data?: IDashboardPercentageReportResponse;
};

export type ReportsRequestActionPayload = PayloadAction<ReportsQuery>;

export type DashboardReports = LoadingResult & {
    data?: IUser;
};

export type DashboardReportsRequestActionPayload =
    PayloadAction<DashboardReportParam>;
export type FavoriteReports = LoadingResult & {
    data?: IUser;
};

export type FavoriteReportsRequestActionPayload =
    PayloadAction<FavoriteReportParam>;

export type GetMembershipSalesReport = LoadingResult & {
    data?: IMembershipSalesReportResponse;
};

export type GetAllMembersAndLeadsReport = LoadingResult & {
    data?: IAllMembersAndLeadsReportResponse;
};
export type GetCoachTaskReport = LoadingResult & {
    data?: ICoachTasksReportReponse;
};
export type GetSalesAgreementReport = LoadingResult & {
    data?: ISalesAgreementReportResponse;
};

export type GetCoachedClientsSalesReport = LoadingResult & {
    data?: ICoachedClientsSalesReportResponse;
};

export type GetMemberEnrollmentReport = LoadingResult & {
    data?: IMemberEnrollmentReportResponse;
};

export type GetConverionBenchmarkRequestActionPayload = PayloadAction<number>;

export type GetCoachedClientCombinedProgress = LoadingResult & {
    data?: ICoachedClientCombinedProgressReportResponse;
};

export type GetEightWeekProgress = LoadingResult & {
    data?: IEightWeekProgressReportResponse;
};

export type GetSalesAppointmentReport = LoadingResult & {
    data?: ISalesAppointmentReportResponse;
};
