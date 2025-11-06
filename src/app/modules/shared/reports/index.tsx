import { useEffect, useMemo, useState } from "react";
import Section from "../../../core/components/Section";
import ReportSelection from "./components/ReportSelection";
import Table from "./components/Table";
import { IReport } from "../../../core/constants/reports";
import Filters from "./components/Filters";
import { mapDispatchToProps } from "../../../core/state/reducer/reports";
import { ReportsQuery } from "../../../core/interfaces/reports.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { getCurrentDate } from "../../../core/services/utils/utils.service";
import { COACH_TASKS } from "../../../core/constants/reports";
import { IMember } from "../../../core/interfaces/members.interface";
import { customFormatDateUseBrowserTZ } from "../../../core/services/utils/utils.service";
import moment from "moment";

const UserReports: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<IReport>();
    const [data, setData] = useState<any[]>([]);
    const [isExpandable, setIsExpandable] = useState<boolean | undefined>(
        false
    );
    const [subColumns, setSubColumns] = useState<any[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [query, setQuery] = useState<ReportsQuery>({
        start_date: getCurrentDate(),
        end_date: getCurrentDate(),
        month: new Date().toISOString().slice(0, 7),
    });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [isRange, setIsRange] = useState<boolean>(true);

    const {
        getActiveMembersReport,
        getTaskLeaderboardReport,
        getSalesTrackerReport,
        getCoachedClientsReport,
        getMembershipSalesReport,
        getAllMembersReport,
        getAllLeadsReport,
        getCoachTaskReport,
        getSalesAgreementReport,
        getCoachedClientsSalesReport,
        getMemberEnrollmentReport,
        getSalesAppointmentReport,
    } = mapDispatchToProps();

    const {
        data: getAllMembersReportData,
        success: getAllMembersReportSuccess,
        loading: getAllMembersReportLoading,
    } = useSelector((state: RootState) => state.reports.getAllMembersReport);

    const {
        data: getAllLeadsReportData,
        success: getAllLeadsReportSuccess,
        loading: getAllLeadsReportLoading,
    } = useSelector((state: RootState) => state.reports.getAllLeadsReport);

    const {
        data: getActiveMembersReportData,
        success: getActiveMembersReportSuccess,
        loading: getActiveMembersReportLoading,
    } = useSelector((state: RootState) => state.reports.getActiveMembersReport);

    const {
        data: getTaskLeaderboardReportData,
        success: getTaskLeaderboardReportSuccess,
        loading: getTaskLeaderboardReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getTaskLeaderboardReport
    );

    const {
        data: getSalesTrackerReportData,
        success: getSalesTrackerReportSuccess,
        loading: getSalesTrackerReportLoading,
    } = useSelector((state: RootState) => state.reports.getSalesTrackerReport);

    const {
        data: getCoachedClientsReportData,
        success: getCoachedClientsReportSuccess,
        loading: getCoachedClientsReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getCoachedClientsReport
    );

    const {
        data: getMembershipSalesReportData,
        success: getMembershipSalesReportSuccess,
        loading: getMembershipSalesReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getMembershipSalesReport
    );

    const {
        data: getCoachTaskReportData,
        success: getCoachTaskReportSuccess,
        loading: getCoachTaskReportLoading,
    } = useSelector((state: RootState) => state.reports.getCoachTaskReport);

    const {
        data: getSalesAgreementReportData,
        success: getSalesAgreementReportSuccess,
    } = useSelector(
        (state: RootState) => state.reports.getSalesAgreementReport
    );

    const {
        data: getCoachedClientsSalesReportData,
        success: getCoachedClientsSalesReportSuccess,
        loading: getCoachedClientsSalesReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getCoachedClientsSalesReport
    );

    const {
        data: getMemberEnrollmentReportData,
        success: getMemberEnrollmentReportSuccess,
        loading: getMemberEnrollmentReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getMemberEnrollmentReport
    );

    const {
        data: currentUser,
        loading: currentUserLoading,
        success: currentUserSuccess,
    } = useSelector((state: RootState) => state.auth.user);

    const {
        data: getSalesAppointmentReportData,
        success: getSalesAppointmentReportSuccess,
        loading: getSalesAppointmentReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getSalesAppointmentReport
    );

    const [dynamicColumns, setDynamicColumns] = useState<any[]>([]);

    useEffect(() => {
        if (!getActiveMembersReportLoading && getActiveMembersReportSuccess) {
            setData(getActiveMembersReportData?.data || []);
            setTotalRows(getActiveMembersReportData?.meta.total || 0);
        }
    }, [getActiveMembersReportSuccess, getActiveMembersReportLoading]);

    useEffect(() => {
        if (!getCoachedClientsReportLoading && getCoachedClientsReportSuccess) {
            setData(getCoachedClientsReportData?.data || []);
            setTotalRows(getCoachedClientsReportData?.meta.total || 0);
        }
    }, [getCoachedClientsReportSuccess, getCoachedClientsReportLoading]);

    useEffect(() => {
        if (
            !getMembershipSalesReportLoading &&
            getMembershipSalesReportSuccess
        ) {
            setData(getMembershipSalesReportData?.data || []);
            setTotalRows(getMembershipSalesReportData?.meta.total || 0);
        }
    }, [getMembershipSalesReportSuccess, getMembershipSalesReportLoading]);

    useEffect(() => {
        if (
            !getSalesAppointmentReportLoading &&
            getSalesAppointmentReportSuccess
        ) {
            setData(getSalesAppointmentReportData?.data || []);
            setTotalRows(getSalesAppointmentReportData?.meta.total || 0);
        }
    }, [getSalesAppointmentReportSuccess, getSalesAppointmentReportLoading]);

    useEffect(() => {
        if (
            !getTaskLeaderboardReportLoading &&
            getTaskLeaderboardReportSuccess
        ) {
            setData(getTaskLeaderboardReportData?.data || []);
            setTotalRows(getTaskLeaderboardReportData?.meta.total || 0);
        }
    }, [getTaskLeaderboardReportSuccess, getTaskLeaderboardReportLoading]);

    useEffect(() => {
        if (!getSalesTrackerReportLoading && getSalesTrackerReportSuccess) {
            setData(getSalesTrackerReportData?.data || []);
            setTotalRows(getSalesTrackerReportData?.data.length || 0);
        }
    }, [getSalesTrackerReportSuccess, getSalesTrackerReportLoading]);

    useEffect(() => {
        setData([]);
        if (!getAllMembersReportLoading && getAllMembersReportSuccess) {
            setData(getAllMembersReportData?.data || []);
            setTotalRows(getAllMembersReportData?.meta.total || 0);
        }
    }, [getAllMembersReportSuccess, getAllMembersReportLoading]);

    useEffect(() => {
        setData([]);
        if (!getAllLeadsReportLoading && getAllLeadsReportSuccess) {
            setData(getAllLeadsReportData?.data || []);
            setTotalRows(getAllLeadsReportData?.meta.total || 0);
        }
    }, [getAllLeadsReportSuccess, getAllLeadsReportLoading]);

    useEffect(() => {
        if (getCoachTaskReportSuccess) {
            setData(getCoachTaskReportData?.data || []);
            setTotalRows(getCoachTaskReportData?.meta.total || 0);
        }
    }, [getCoachTaskReportSuccess]);

    useEffect(() => {
        if (getSalesAgreementReportSuccess) {
            setData(getSalesAgreementReportData?.data || []);
            setTotalRows(getSalesAgreementReportData?.meta.total || 0);
        }
    }, [getSalesAgreementReportSuccess]);

    useEffect(() => {
        if (
            getCoachedClientsSalesReportSuccess &&
            !getCoachedClientsSalesReportLoading
        ) {
            setData(getCoachedClientsSalesReportData?.data || []);
            setTotalRows(getCoachedClientsSalesReportData?.meta.total || 0);
        }
    }, [
        getCoachedClientsSalesReportSuccess,
        getCoachedClientsSalesReportLoading,
    ]);

    useEffect(() => {
        if (
            getMemberEnrollmentReportSuccess &&
            !getMemberEnrollmentReportLoading
        ) {
            setData(getMemberEnrollmentReportData?.data || []);
            setTotalRows(getMemberEnrollmentReportData?.data.length || 0);
        }
    }, [getMemberEnrollmentReportSuccess, getMemberEnrollmentReportLoading]);

    useEffect(() => {
        if (
            selectedReport?.label === "Sales Appointment Report" &&
            data?.length > 0
        ) {
            // Get all unique deck_data keys from all members
            const deckKeys = new Set<string>();
            data.forEach((member: IMember) => {
                if (member?.attributes?.deck_data) {
                    Object.keys(member.attributes.deck_data).forEach((key) =>
                        deckKeys.add(key)
                    );
                }
            });

            // Create columns for each deck_data key
            const newColumns = Array.from(deckKeys).map((deckKey) => ({
                name: deckKey,
                cell: (member: IMember) =>
                    member?.attributes?.deck_data?.[deckKey] ?? "",
            }));

            setDynamicColumns(newColumns);
        }
    }, [selectedReport?.label, data]);

    // Merge base columns with dynamic columns for Sales Appointment Report
    const getReportColumns = useMemo(() => {
        if (
            selectedReport?.label === "Sales Appointment Report" &&
            selectedReport.columns
        ) {
            // Find the index where we want to insert the dynamic columns (before "Member Since")
            const memberSinceIndex = selectedReport.columns.findIndex(
                (col) => col.name === "Member Since"
            );

            if (memberSinceIndex !== -1) {
                return [
                    ...selectedReport.columns.slice(0, memberSinceIndex),
                    ...dynamicColumns,
                    ...selectedReport.columns.slice(memberSinceIndex),
                ];
            }
        }
        return selectedReport?.columns || [];
    }, [selectedReport, dynamicColumns]);

    const loading =
        getSalesTrackerReportLoading ||
        getTaskLeaderboardReportLoading ||
        getActiveMembersReportLoading ||
        getCoachedClientsReportLoading ||
        getMembershipSalesReportLoading ||
        getAllMembersReportLoading ||
        getAllLeadsReportLoading ||
        getMemberEnrollmentReportLoading ||
        getSalesAppointmentReportLoading;

    useEffect(() => {
        const getData = setTimeout(() => {
            switch (selectedReport?.label) {
                case "Active Members":
                    getActiveMembersReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Task Leaderboard":
                    getTaskLeaderboardReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Monthly Sales Tracker":
                    // if (
                    //     query.gym ||
                    //     currentUser?.relationships.user_gyms?.length
                    // ) {
                    getSalesTrackerReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    // }
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Coached Client Audit":
                    getCoachedClientsReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Membership Sales Report":
                    getMembershipSalesReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Coach Tasks":
                    getCoachTaskReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(true);
                    setSubColumns(COACH_TASKS.subColumns ?? []);
                    setIsRange(true);
                    break;
                case "All Members Report":
                    getAllMembersReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "All Leads Report":
                    getAllLeadsReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Members Health":
                    getAllMembersReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Members Performance":
                    getAllMembersReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Sales Agreement Report":
                    getSalesAgreementReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Coached Client Sales Report":
                    getCoachedClientsSalesReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                case "Member Enrollment":
                    getMemberEnrollmentReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(false);
                case "Sales Appointment Report":
                    getSalesAppointmentReport({
                        ...query,
                        page: page,
                        per_page: perPage,
                    });
                    setIsExpandable(false);
                    setSubColumns([]);
                    setIsRange(true);
                    break;
                default:
                    break;
            }
        }, 1000);

        return () => clearTimeout(getData);
    }, [selectedReport?.label, query, page, perPage]);

    const handleExport = () => {
        if (selectedReport?.exportRequest)
            selectedReport?.exportRequest(
                query,
                `${selectedReport?.label} for ${reportDateRange}`
            );
    };

    const reportDateRange = useMemo(() => {
        if (selectedReport?.dateFilters === "month" && query.month) {
            // Create moment object for the first day of the month
            const startDate = moment(query.month).startOf("month");
            const endDate = moment(query.month).endOf("month");

            const firstDay = customFormatDateUseBrowserTZ(
                startDate.toISOString(),
                "date",
                "MMMM DD, YYYY"
            );

            const lastDay = customFormatDateUseBrowserTZ(
                endDate.toISOString(),
                "date",
                "MMMM DD, YYYY"
            );

            return `${firstDay} - ${lastDay}`;
        }

        const start = customFormatDateUseBrowserTZ(
            query.start_date || "",
            "date",
            "MMMM DD, YYYY"
        );
        const end = customFormatDateUseBrowserTZ(
            query.end_date || "",
            "date",
            "MMMM DD, YYYY"
        );

        return `${start} - ${end}`;
    }, [
        selectedReport?.dateFilters,
        query.start_date,
        query.end_date,
        query.month,
    ]);

    return (
        <Section title="Reports">
            <div className="flex flex-row w-full gap-x-3">
                <ReportSelection setSelectedReport={setSelectedReport} />
                <div className="flex flex-col w-3/4 gap-y-2">
                    <Filters
                        dateFilters={selectedReport?.dateFilters}
                        isRange={isRange}
                        query={query}
                        setQuery={setQuery}
                    />
                    {selectedReport && (
                        <Table
                            data={data}
                            totalRows={totalRows}
                            columns={selectedReport?.columns || []}
                            report={selectedReport?.label || ""}
                            dateRange={reportDateRange}
                            page={page}
                            perPage={perPage}
                            setPage={setPage}
                            setPerPage={setPerPage}
                            handleExport={handleExport}
                            loading={loading}
                            isExpandable={isExpandable}
                            subColumns={subColumns}
                        />
                    )}
                </div>
            </div>
        </Section>
    );
};

export default UserReports;
