import httpClient from "../../clients/httpClient";
import { downloadFile } from "../../helpers/download-file";
import {
    DashboardReportParam,
    FavoriteReportParam,
    ReportsQuery,
} from "../../interfaces/reports.interface";

import {
    SalesTrackerData,
    SandboxWigData,
    ConversionBenchmarkData,
} from "../../interfaces/gyms.interface";

export const getActiveMembersReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/members/active`, {
        params: query,
    });
};

export const getActiveMembersReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/members/active/export`,
        fileName,
        query
    );
};

export const getTaskLeaderboardReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/staff/leaderboard`, {
        params: query,
    });
};

export const getTaskLeaderboardReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/staff/leaderboard/export`,
        fileName,
        query
    );
};

export const getSalesTrackerReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/sales/tracker`, {
        params: { ...query, ...query.filter },
    });
};

export const getSalesTrackerReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/sales/tracker/export`,
        fileName,
        query
    );
};

export const getCoachedClientsReportRequest = (query: ReportsQuery) => {
    //remove property from object with specific key
    const filters = query.filter;
    delete query.filter;

    return httpClient.get(
        `/api/v1/reports/members/coached?include=user,roles`,
        {
            params: { ...query, ...filters },
        }
    );
};

export const getCoachedClientsReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/members/coached/export`,
        fileName,
        query
    );
};

export const updateDashboardReportsRequest = (body: DashboardReportParam) => {
    return httpClient.patch(`/api/v1/reports/dashboard`, body);
};

export const addFavoriteReportRequest = (body: FavoriteReportParam) => {
    return httpClient.patch(`/api/v1/reports/favorite/add`, body);
};

export const removeFavoriteReportRequest = (body: FavoriteReportParam) => {
    return httpClient.patch(`/api/v1/reports/favorite/remove`, body);
};

export const getDashboardTotalReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/totals/`, {
        params: query,
    });
};

export const getDashboardPercentageRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/percentage/`, {
        params: query,
    });
};

export const getMembershipSalesReportRequest = (query: ReportsQuery) => {
    return httpClient.get(
        `/api/v1/reports/sales/memberships?include=user,gym`,
        {
            params: query,
        }
    );
};

export const getMembershipSalesReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/sales/memberships/export`,
        fileName,
        query
    );
};

export const getAllMembersReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/members/all?include=gym`, {
        params: query,
    });
};

export const getAllMembersReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(`/api/v1/reports/members/all/export`, fileName, query);
};

export const getCoachTasksReportRequest = (query: ReportsQuery) => {
    return httpClient.get(
        `/api/v1/reports/staff/tasks/?include=tasks,user_gyms,roles,member`,
        {
            params: query,
        }
    );
};

export const getSalesAgreementsReportRequest = (query: ReportsQuery) => {
    return httpClient.get(
        `/api/v1/reports/sales/products?include=salesAgreement,member`,
        {
            params: query,
        }
    );
};

export const getMembersHealthReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/members/all/export/health`,
        fileName,
        query
    );
};

export const getMemberPerformanceReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/members/all/export/performance`,
        fileName,
        query
    );
};

export const getAllLeadsReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/members/leads?include=gym`, {
        params: query,
    });
};

export const getCoachTasksReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(`/api/v1/reports/staff/tasks/export`, fileName, query);
};

export const getSalesAgreementsReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/sales/products/export?include=salesAgreement,member`,
        fileName,
        query
    );
};

export const getAllLeadsReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/members/leads/export`,
        fileName,
        query
    );
};

export const getCoachedClientsSalesReportRequest = (query: ReportsQuery) => {
    return httpClient.get(
        `/api/v1/reports/sales/coached-clients/?include=gym,user,roles,user_gyms`,
        {
            params: query,
        }
    );
};

export const getCoachedClientsSalesReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/sales/coached-clients/export?include=gym,user,roles,user_gyms`,
        fileName,
        query
    );
};

export const getMemberEnrollmentReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/members/enrollment`, {
        params: query,
    });
};

export const getMemberEnrollmentReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/members/enrollment/export`,
        fileName,
        query
    );
};

export const getWigFiguresReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/wig/gym`, {
        params: query,
    });
};

export const getOrganizationWigFiguresReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/wig/organization`, {
        params: query,
    });
};

export const getOrganizationOverallWigFiguresReportRequest = (
    query: ReportsQuery
) => {
    return httpClient.get(`/api/v1/reports/wig/overall`, {
        params: query,
    });
};

export const getSandboxSalesTrackerDataRequest = (body: SalesTrackerData) => {
    return httpClient.post(
        `/api/v1/reports/sandbox/${body.id}/sales-forecast`,
        body
    );
};

export const getSandboxWigRequest = (body: SandboxWigData) => {
    return httpClient.post(`/api/v1/reports/sandbox/${body.id}/wig`, body);
};

export const getConversionBenchmarkRequest = (id: number) => {
    return httpClient.get(`/api/v1/reports/sandbox/${id}/conversion`);
};

export const getRevenueGapRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/sandbox/${query.gym}/gap`);
};

export const getCoachedClientCombinedProgressRequest = (
    query: ReportsQuery
) => {
    return httpClient.get(`/api/v1/reports/deck-figures/combined-progress`, {
        params: query,
    });
};

export const getEightWeekProgressRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/deck-figures/eight-week-progress`, {
        params: query,
    });
};

export const getSalesAppointmentReportRequest = (query: ReportsQuery) => {
    return httpClient.get(`/api/v1/reports/sales/appointments?include=gym`, {
        params: query,
    });
};

export const getSalesAppointmentReportExportRequest = (
    query: ReportsQuery,
    fileName: string
) => {
    return downloadFile(
        `/api/v1/reports/sales/appointments/export`,
        fileName,
        query
    );
};
