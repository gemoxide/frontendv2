import { useContext, useEffect, useState } from "react";
import { ReactComponent as DashboardToggle } from "../../../../../assets/icons/dashboard-toggle.svg";
import FloatingActionButton from "../../../core/components/FloatingActionButton";
import {
    DASHBOARD_REPORTS,
    DASHBOARD_TOTALS,
    DASHBOARD_PERCENT_TILES,
    DASHBOARD_SALES_TILES,
} from "../../../core/constants/dashboard-reports";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import ReportsList from "./ReportsList";
import { DashboardReportsToggleContext } from "../../../core/context/dashboardReportsToggle";
import Totals from "../../../core/components/Totals";
import PercentageTiles from "../../../core/components/PercentageTiles";
import Wig from "../../../core/components/Wig";
import OrganizationWig from "../../../core/components/Wig/Organization";
import { mapDispatchToProps } from "../../../core/state/reducer/reports";
import { IGymWigReportResponse } from "../../../core/interfaces/reports.interface";

const UserDashboard = () => {
    const { setShowToggleReports } = useContext(DashboardReportsToggleContext);
    const {
        getDashboardTotal,
        getWigReport,
        getOrganizationWigReport,
        getOrganizationOverallWigReport,
    } = mapDispatchToProps();
    const [mappedData, setMappedData] = useState<any>([]);
    const [mappedSalesData, setMappedSalesData] = useState<any>([]);
    const [mappedOrganizationWigData, setMappedOrganizationWigData] =
        useState<any>([]);
    const [mapWigData, setMapWigData] = useState<any>();

    const { getDashboardPercentage } = mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { loading: reportsLoading, success: reportsSuccess } = useSelector(
        (state: RootState) => state.auth.updateDashboardReports
    );

    const { data: dashboardTotal } = useSelector(
        (state: RootState) => state.reports.getDashboardTotal
    );

    const {
        data: getWigReportData,
        success: getWigReportSuccess,
        loading: getWigLoading,
    } = useSelector((state: RootState) => state.reports.getWigReport);

    const {
        data: getOrganizationWigReportData,
        success: getOrganizationWigReportSuccess,
        loading: getOrganizationWigReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getOrganizationWigReport
    );

    const {
        data: organizationOverallWigReportData,
        success: organizationOverallWigReportSuccess,
        loading: organizationOverallWigReportLoading,
    } = useSelector(
        (state: RootState) => state.reports.getOrganizationOverallWigReport
    );

    const isOrganizationWig =
        currentUser?.relationships?.user_gyms?.length === 0 ? true : false;

    const processWigData = (reportData: IGymWigReportResponse) => {
        const forMap = reportData;
        const mappedWigData = {
            data: [
                {
                    name: "Total Membership Revenue",
                    value: forMap?.data?.total_membership_revenue || 0,
                },
                {
                    name: "Total PT Revenue",
                    value: forMap?.data?.total_pt_revenue || 0,
                },
                {
                    name: "Remaining",
                    value:
                        forMap?.data?.remaining !== undefined &&
                        forMap.data.remaining >= 0
                            ? forMap.data.remaining
                            : 0,
                },
            ],
            goal: forMap?.data?.goal_formatted || "0",
            total: forMap?.data?.total_revenue_formatted || "0",
            percentage_to_goal: forMap?.data?.percentage_to_goal || "",
            end_date_formatted: forMap?.data?.end_date_formatted || "",
        };
        setMapWigData(mappedWigData);
    };

    useEffect(() => {
        if (!getWigLoading && getWigReportSuccess && getWigReportData) {
            processWigData(getWigReportData);
        }
    }, [getWigLoading, getWigReportSuccess, getWigReportData]);

    useEffect(() => {
        if (
            !organizationOverallWigReportLoading &&
            organizationOverallWigReportSuccess &&
            organizationOverallWigReportData
        ) {
            processWigData(organizationOverallWigReportData);
        }
    }, [
        organizationOverallWigReportLoading,
        organizationOverallWigReportSuccess,
        organizationOverallWigReportData,
    ]);

    useEffect(() => {
        if (getOrganizationWigReportData?.data?.length) {
            const mappedData = getOrganizationWigReportData.data.map(
                (item) => ({
                    name: item.gym_name,
                    membership_revenue: item?.total_membership_revenue || 0,
                    pt_revenue: item?.total_pt_revenue || 0,
                    remaining:
                        item?.remaining !== undefined && item?.remaining >= 0
                            ? item.remaining
                            : 0,
                })
            );
            setMappedOrganizationWigData(mappedData);
        }
    }, [getOrganizationWigReportSuccess]);

    const {
        data: dashboardPercentage,
        loading: dashboardPercentageLoading,
        success: dashboardPercentageSuccess,
    } = useSelector((state: RootState) => state.reports.getDashboardPercentage);

    useEffect(() => {
        if (!reportsLoading && reportsSuccess) {
            setShowToggleReports(false);
        }
    }, [reportsLoading, reportsSuccess]);

    useEffect(() => {
        if (!currentUser || currentUser.attributes.type === "admin") {
            return;
        }

        getDashboardPercentage({});
        getDashboardTotal({});
        if (currentUser?.relationships?.user_gyms?.length) {
            getWigReport({
                gym: currentUser?.relationships?.user_gyms[0].id,
            });
        } else {
            getOrganizationWigReport({});
            getOrganizationOverallWigReport();
        }
    }, [currentUser]);

    useEffect(() => {
        if (dashboardPercentageSuccess) {
            const mappedData = DASHBOARD_PERCENT_TILES.map((item) => ({
                name: item.label,
                value: (dashboardPercentage?.data as any)?.[item.key],
                key: item.key,
            }));
            setMappedData(mappedData);

            const mappedSalesData = DASHBOARD_SALES_TILES.map((item) => ({
                name: item.label,
                value: (dashboardPercentage?.data as any)?.[item.key],
                key: item.key,
            }));
            setMappedSalesData(mappedSalesData);
        }
    }, [dashboardPercentageSuccess]);

    return (
        <div>
            {currentUser?.attributes.dashboard_reports.includes(
                "Wildly Important Goals"
            ) && (
                <div>
                    {!isOrganizationWig ? (
                        <div className="mb-8 text-secondary w-full 2xl:w-1/4 xl:w-1/3">
                            {mapWigData && <Wig data={mapWigData} />}
                        </div>
                    ) : (
                        <div className="flex flex-col 2xl:flex-row 2xl:space-x-5">
                            <div className="mb-8 text-secondary w-full 2xl:w-1/4 xl:w-1/3">
                                {mapWigData && <Wig data={mapWigData} />}
                            </div>
                            <div className="mb-8 text-secondary w-full 2xl:w-3/4">
                                <OrganizationWig
                                    data={mappedOrganizationWigData}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {currentUser?.attributes.dashboard_reports.includes("Totals") && (
                <div className="flex flex-col lg:flex-row space-y-5 space-x-0 lg:space-x-5 lg:space-y-0 mb-8 text-secondary w-full">
                    {DASHBOARD_TOTALS.map((item, i) => (
                        <Totals
                            title={item.label}
                            total={(dashboardTotal?.data as any)?.[item.key]}
                            key={i}
                        />
                    ))}
                </div>
            )}
            {currentUser?.attributes.dashboard_reports.includes(
                "Percent Tiles"
            ) && (
                <div className="flex flex-col lg:flex-row space-y-5 lg:space-x-5 lg:space-y-0 mb-8 text-secondary w-full">
                    {DASHBOARD_PERCENT_TILES.map((item, i) => (
                        <PercentageTiles data={mappedData[i]} key={i} />
                    ))}
                </div>
            )}
            {currentUser?.attributes.dashboard_reports.includes(
                "Sales Tiles"
            ) && (
                <div className="flex flex-col lg:flex-row space-y-5 lg:space-x-5 lg:space-y-0 mb-8 text-secondary w-full">
                    {DASHBOARD_SALES_TILES.map((item, i) => (
                        <PercentageTiles data={mappedSalesData[i]} key={i} />
                    ))}
                </div>
            )}
            <div className="grid grid-cols-3 gap-8">
                {currentUser?.attributes.dashboard_reports
                    .filter(
                        (report) =>
                            DASHBOARD_REPORTS.includes(report) &&
                            ![
                                "Percent Tiles",
                                "Totals",
                                "Wildly Important Goals",
                                "Sales Tiles",
                            ].includes(report)
                    )
                    .map((report, i) => {
                        return <ReportsList report={report} key={i} />;
                    })}
            </div>
            <FloatingActionButton
                icon={<DashboardToggle />}
                onClick={() => setShowToggleReports(true)}
            />
        </div>
    );
};

export default UserDashboard;
