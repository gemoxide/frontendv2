import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import ReportsTable from "../../shared/reports/components/Table";
import {
    MONTHLY_SALES_TRACKER,
    TASK_LEADERBOARD,
    COACHED_CLIENT_AUDIT,
} from "../../../core/constants/reports";
import { formatDateObjectToObjectString } from "../../../core/services/utils/utils.service";
import { endOfMonth, startOfMonth } from "date-fns";
import { TableColumn } from "react-data-table-component";
import { mapDispatchToProps } from "../../../core/state/reducer/reports";
import CoachedClientFilters from "./filters/CoachedClientFilters";

interface Props {
    report: string;
}

const ReportsList: React.FC<Props> = ({ report }) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [taskLeaderboardData, setTaskLeaderboardData] = useState<any[]>([]);
    const [coachedClientData, setCoachedClientData] = useState<any[]>([]);
    const [salesTrackerData, setSalesTrackerData] = useState<any[]>([]);
    const [columns, setColumns] = useState<TableColumn<any>[]>([]);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [totalRows, setTotalRows] = useState(0);
    const [className, setClassName] = useState("cols-span-1");

    const {
        getTaskLeaderboardReport,
        getCoachedClientsReport,
        getSalesTrackerReport,
    } = mapDispatchToProps();

    const {
        data: getTaskLeaderboardReportData,
        success: getTaskLeaderboardReportSuccess,
        loading: getTaskLeaderboardReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getTaskLeaderboardReport
    );

    const {
        data: getCoachedClientsReportData,
        success: getCoachedClientsReportSuccess,
        loading: getCoachedClientsReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getCoachedClientsReport
    );

    const {
        data: getSalesTrackerReportData,
        success: getSalesTrackerReportSuccess,
        loading: getSalesTrackerReportLoading,
    } = useSelector((state: RootState) => state.reports.getSalesTrackerReport);

    const {
        data: currentUser,
        loading: currentUserLoading,
        success: currentUserSuccess,
    } = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (
            !getTaskLeaderboardReportLoading &&
            getTaskLeaderboardReportSuccess
        ) {
            setTaskLeaderboardData(getTaskLeaderboardReportData?.data || []);
            // setTotalRows(getTaskLeaderboardReportData?.meta.total || 0);
        }
    }, [getTaskLeaderboardReportSuccess, getTaskLeaderboardReportLoading]);

    useEffect(() => {
        if (!getCoachedClientsReportLoading && getCoachedClientsReportSuccess) {
            setCoachedClientData(getCoachedClientsReportData?.data || []);
            // setTotalRows(getCoachedClientsReportData?.meta.total || 0);
        }
    }, [getCoachedClientsReportSuccess, getCoachedClientsReportLoading]);

    useEffect(() => {
        if (!getSalesTrackerReportLoading && getSalesTrackerReportSuccess) {
            setSalesTrackerData(getSalesTrackerReportData?.data || []);
            // setTotalRows(getSalesTrackerReportData?.data.length || 0);
        }
    }, [getSalesTrackerReportSuccess, getSalesTrackerReportLoading]);

    useEffect(() => {
        const today = new Date();
        const query = {
            start_date: formatDateObjectToObjectString(startOfMonth(today)),
            end_date: formatDateObjectToObjectString(endOfMonth(today)),
            page: page,
            per_page: perPage,
            gym: currentUser?.relationships.user_gyms?.[0]?.id || undefined,
        };

        switch (report) {
            case "Task Leaderboard":
                getTaskLeaderboardReport(query);
                setColumns(TASK_LEADERBOARD.columns || []);
                setClassName("col-span-3");
                break;
            case "Monthly Sales Tracker":
                getSalesTrackerReport({
                    ...query,
                    page: page,
                    per_page: perPage,
                });
                setColumns(MONTHLY_SALES_TRACKER.columns || []);
                setClassName("col-span-3");
                break;
            case "Coached Client Audit":
                getCoachedClientsReport({
                    ...query,
                    is_dashboard: true,
                    filter: filters,
                });
                setColumns(COACHED_CLIENT_AUDIT.dashboardColumns || []);
                setClassName("col-span-3");
                break;
            default:
                break;
        }
    }, [report, page, perPage, filters]);

    useEffect(() => {
        switch (report) {
            case "Task Leaderboard":
                setTotalRows(getTaskLeaderboardReportData?.meta.total || 0);
                break;
            case "Monthly Sales Tracker":
                setTotalRows(getSalesTrackerReportData?.data.length || 0);
                break;
            case "Coached Client Audit":
                setTotalRows(getCoachedClientsReportData?.meta.total || 0);
                break;
            default:
                break;
        }
    }, [
        getCoachedClientsReportData?.meta.total,
        getSalesTrackerReportData?.data,
        getTaskLeaderboardReportData?.meta.total,
    ]);

    const loading =
        getTaskLeaderboardReportLoading ||
        getCoachedClientsReportLoading ||
        getSalesTrackerReportLoading;

    const currentData =
        report === "Task Leaderboard"
            ? taskLeaderboardData
            : report === "Monthly Sales Tracker"
            ? salesTrackerData
            : coachedClientData;

    let selectedFilter;

    return (
        <div className={`${className}`}>
            {selectedFilter}
            <ReportsTable
                report={report}
                columns={columns}
                data={currentData}
                page={page}
                perPage={perPage}
                setPage={setPage}
                setPerPage={setPerPage}
                totalRows={totalRows}
                loading={loading}
                filters={filters}
                setFilters={setFilters}
            />
        </div>
    );
};

export default ReportsList;
