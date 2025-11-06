import { IMeta, IMetaQuery } from "./common.interface";
import { IMemberSalesAgreement } from "./member-sales-agreement.interface";
import { IMember } from "./members.interface";
import { IUser } from "./user.interface";

export interface LeadConversion {
    lead_type: string;
    leads_added: number;
    lead_type_update: number;
    membership_conversion: number;
    conversion_to_pt_client: number;
    conversion: number;
}

export interface ITaskLeaderboard {
    id: number;
    type: string;
    attributes: {
        name: string;
        tasks: number;
        gym?: string;
    };
}

export type ReportsQuery = {
    organization?: any;
    gym?: any;
    user?: any;
    start_date?: string;
    end_date?: string;
    month?: string;
    is_dashboard?: boolean;
    filter?: Record<string, any>;
    goal?: number;
} & IMetaQuery;

export interface IActiveMembersReportResponse {
    data: IMember[];
    meta: IMeta;
}

export interface ITaskLeaderboardReportResponse {
    data: ITaskLeaderboard[];
    meta: IMeta;
}

export interface ISalesTracker {
    name: string;
    goal: string;
    mtd: string;
    ptg: number;
    ptg_percent: number;
}

export interface ISalesForecast {
    name: string;
    actual: number;
    member_sandbox: number;
    pt_sandbox: number;
    order: number;
}

export interface IConversionBenchMark {
    name: string;
    actual: number;
    benchmark: number;
    field: string;
}

export interface IRevenueGap {
    name: string;
    value?: number;
    needed?: number;
}

export interface GetConversionBenchmarkParams {
    id?: number;
    prospect_to_lead_rate?: number;
    leads_to_gym_tours_percent?: number;
    membership_close_rate_percent?: number;
    js1_fc_booked_percent?: number;
    js1_show_rate_percent?: number;
    scheduled_js3?: number;
    js3_show_rate_percent?: number;
    js3_fc_close_rate_percent?: number;
}

export interface IWig {
    gym_name: string;
    goal: number;
    start_date?: string;
    end_date?: string;
    total_membership_revenue: number;
    total_pt_revenue: number;
    total_revenue: number;
    month_passed: number;
    total_projected_value_formatted: string;
    percentage_to_goal?: string;
    remaining?: number;
    end_date_formatted?: string;
    goal_formatted?: string;
    total_revenue_formatted?: string;
}

export interface IOrganizationWig {
    data: IWig[];
}

export interface IMemberEnrollment {
    month: string;
    start: number;
    end: number;
    new: number;
    terminated: number;
    net: number;
    retention: number;
    growth: number;
}

export interface ICoachedClientCombinedProgress {
    inches: number;
    body_fat: number;
    number_of_fats: number;
    number_of_muscle: number;
    functional_movement: number;
    performance_test: number;
}

export interface IEightWeekProgress {
    inches: number;
    weight: number;
    body_fat: number;
    performance_test: number;
}

export interface ISalesTrackerReportResponse {
    data: ISalesTracker[];
}

export interface ISalesForecastReportResponse {
    data: ISalesForecast[];
}

export interface DashboardReportParam {
    dashboard_reports: string[];
}
export interface FavoriteReportParam {
    report: string;
}

export interface ICoachedClientsReportResponse {
    data: IMember[];
    meta: IMeta;
}

export interface IDashboardTotalReportResponse {
    prospects: number;
    leads: number;
    coached: number;
    members: number;
    [key: string]: number;
}
export interface IDashboardPercentageReportResponse {
    leads_to_pt: number;
    new_members_to_pt: number;
    attrition: number;
    retention: number;
    [key: string]: number;
}

export interface IGymWigReportResponse {
    data: IWig;
}

export interface IOrganizationWigReportResponse {
    data: IWig[];
}

export interface IMembershipSalesReportResponse {
    data: IMember[];
    meta: IMeta;
}

export interface IAllMembersAndLeadsReportResponse {
    data: IMember[];
    meta: IMeta;
}

export interface ICoachTasksReportReponse {
    data: IUser[];
    meta: IMeta;
}
export interface ISalesAgreementReportResponse {
    data: IMemberSalesAgreement[];
    meta: IMeta;
}

export interface ICoachedClientsSalesReportResponse {
    data: IMember[];
    meta: IMeta;
}

export interface IMemberEnrollmentReportResponse {
    data: IMemberEnrollment[];
}

export interface IConversionBenchMarkReportResponse {
    data: IConversionBenchMark[];
}

export interface IRevenueGapReportResponse {
    data: IRevenueGap[];
}

export interface ICoachedClientCombinedProgressReportResponse {
    data: ICoachedClientCombinedProgress;
}

export interface IEightWeekProgressReportResponse {
    data: IEightWeekProgress;
}

export interface ISalesAppointmentReportResponse {
    data: IMember[];
    meta: IMeta;
}
