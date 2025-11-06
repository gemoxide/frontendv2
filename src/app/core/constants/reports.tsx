import { TableColumn } from "react-data-table-component";
import { IMember } from "../interfaces/members.interface";
import {
    IConversionBenchMark,
    IMemberEnrollment,
    IRevenueGap,
    ISalesForecast,
    ISalesTracker,
    ITaskLeaderboard,
    LeadConversion,
    ReportsQuery,
} from "../interfaces/reports.interface";
import {
    getActiveMembersReportExportRequest,
    getSalesTrackerReportExportRequest,
    getTaskLeaderboardReportExportRequest,
    getCoachedClientsReportExportRequest,
    getMembershipSalesReportExportRequest,
    getAllMembersReportExportRequest,
    getMembersHealthReportExportRequest,
    getMemberPerformanceReportExportRequest,
    getAllLeadsReportExportRequest,
    getCoachTasksReportExportRequest,
    getSalesAgreementsReportExportRequest,
    getCoachedClientsSalesReportExportRequest,
    getMemberEnrollmentReportExportRequest,
    getSalesAppointmentReportExportRequest,
} from "../services/reports/reports.service";

import { ROUTES } from "../constants/routes";
import UserIcon from "../../../../assets/icons/user.svg";
import { IUser } from "../interfaces/user.interface";
import { getCurrentDate } from "../services/utils/utils.service";
import { ITask } from "../interfaces/tasks.interface";
import { IMemberSalesAgreement } from "../interfaces/member-sales-agreement.interface";
import { formatDate } from "../services/utils/utils.service";
import moment from "moment";
import Input from "../components/Forms/Input";
import { member } from "../services/routes/user-routes";

export const SALES_DROPDOWN = [
    { value: "Sales 1", label: "Sales 1" },
    { value: "Sales 2", label: "Sales 2" },
    { value: "Sales 3", label: "Sales 3" },
    { value: "Sales 4", label: "Sales 4" },
];

export const PRODUCT_DROPDOWN = [
    { value: "Product 1", label: "Product 1" },
    { value: "Product 2", label: "Product 2" },
    { value: "Product 3", label: "Product 3" },
    { value: "Product 4", label: "Product 4" },
];

export const PT_CLIENTS_DROPDOWN = [
    { value: "PT Client 1", label: "PT Client 1" },
    { value: "PT Client 2", label: "PT Client 2" },
    { value: "PT Client 3", label: "PT Client 3" },
    { value: "PT Client 4", label: "PT Client 4" },
];

export const MISC_DROPDOWN = [
    { value: "Misc 1", label: "Misc 1" },
    { value: "Misc 2", label: "Misc 2" },
    { value: "Misc 3", label: "Misc 3" },
    { value: "Misc 4", label: "Misc 4" },
];

export const DUMMY_REPORT_DATA: LeadConversion[] = [
    {
        lead_type: "Type 1",
        leads_added: 5,
        lead_type_update: 6,
        membership_conversion: 10,
        conversion_to_pt_client: 7,
        conversion: 30,
    },
    {
        lead_type: "Type 2",
        leads_added: 5,
        lead_type_update: 6,
        membership_conversion: 10,
        conversion_to_pt_client: 7,
        conversion: 30,
    },
    {
        lead_type: "Type 3",
        leads_added: 5,
        lead_type_update: 6,
        membership_conversion: 10,
        conversion_to_pt_client: 7,
        conversion: 30,
    },
    {
        lead_type: "Type 4",
        leads_added: 5,
        lead_type_update: 6,
        membership_conversion: 10,
        conversion_to_pt_client: 7,
        conversion: 30,
    },
];

interface ReportProps {
    organization: number;
    gym: number;
    startDate: string;
    endDate: string;
}

export interface IReport {
    label: string;
    columns?: TableColumn<any>[];
    dashboardColumns?: TableColumn<any>[];
    dateFilters: "range" | "month";
    exportRequest?: (query: ReportsQuery, fileName: string) => void;
    isExpandable?: boolean;
    subColumns?: Array<TableColumn<any>>;
}

export interface IReportType {
    type: string;
    reports: IReport[];
}

export const MONTHLY_SALES_TRACKER: IReport = {
    label: "Monthly Sales Tracker",
    columns: [
        {
            name: "",
            cell: (sales: ISalesTracker) => sales.name,
        },
        {
            name: "Goal",
            cell: (sales: ISalesTracker) => sales.goal,
            right: true,
        },
        {
            name: "MTD",
            cell: (sales: ISalesTracker) => sales.mtd,
            right: true,
        },
        {
            name: "PTG",
            cell: (sales: ISalesTracker) => sales.ptg,
            right: true,
        },
        {
            name: "PTG %",
            cell: (sales: ISalesTracker) => sales.ptg_percent,
            right: true,
        },
    ],
    exportRequest: getSalesTrackerReportExportRequest,
    dateFilters: "month",
};

export const SALES_FORECAST_SANDBOX: IReport = {
    label: "Sales Forecast Sandbox",
    columns: [
        {
            name: "",
            cell: (sales: ISalesForecast) => sales.name,
            width: "40%",
        },
        {
            name: "Actual",
            width: "20%",
            right: true,
            cell: (sales: ISalesForecast) => sales.actual,
        },
        {
            name: "Member Sandbox",
            width: "20%",
            right: true,
            cell: (sales: ISalesForecast) => sales.member_sandbox,
        },
        {
            name: "PT Sandbox",
            width: "20%",
            right: true,
            cell: (sales: ISalesForecast) => sales.pt_sandbox,
        },
    ],
    exportRequest: getSalesTrackerReportExportRequest,
    dateFilters: "month",
};

export const ACTIVE_MEMBERS: IReport = {
    label: "Active Members",
    columns: [
        {
            name: "Name",
            cell: (member: IMember) =>
                member.attributes
                    ? `${member.attributes.first_name} ${
                          member.attributes.last_name ?? ""
                      }`
                    : "",
        },
        {
            name: "Email",
            cell: (member: IMember) =>
                member.attributes ? member.attributes.email_address : "",
        },
        {
            name: "Phone Number",
            cell: (member: IMember) =>
                member.attributes ? member.attributes.cell_phone : "",
        },
    ],
    exportRequest: getActiveMembersReportExportRequest,
    dateFilters: "range",
};

export const TASK_LEADERBOARD: IReport = {
    label: "Task Leaderboard",
    columns: [
        {
            name: "Rank",
            cell: (user: ITaskLeaderboard, index: number) => index + 1,
        },
        {
            name: "Name",
            cell: (user: ITaskLeaderboard) =>
                user.attributes ? user.attributes.name : "",
        },
        {
            name: "Tasks",
            cell: (user: ITaskLeaderboard) =>
                user.attributes ? user.attributes.tasks : 0,
        },
        {
            name: "Location",
            cell: (user: ITaskLeaderboard) =>
                user.attributes ? user.attributes.gym || "" : "",
        },
    ],
    exportRequest: getTaskLeaderboardReportExportRequest,
    dateFilters: "range",
};

export const MEMBERSHIP_SALES_REPORT: IReport = {
    label: "Membership Sales Report",
    columns: [
        {
            name: "Gym Location",
            cell: (member: IMember) =>
                member.relationships?.gym
                    ? member?.relationships?.gym?.attributes?.address
                    : "",
        },
        {
            name: "Member ID",
            cell: (member: IMember) => member?.id,
        },
        {
            name: "Last name",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "First name",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Cell phone",
            cell: (member: IMember) => member?.attributes?.cell_phone,
        },
        {
            name: "Email",
            cell: (member: IMember) => member?.attributes?.email_address,
        },
        {
            name: "Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        {
            name: "Lead Source",
            cell: (member: IMember) => member?.attributes?.lead_source,
        },
        {
            name: "Member Since",
            cell: (member: IMember) => member?.attributes?.member_since,
        },
        {
            name: "PT Status",
            cell: (member: IMember) => member?.attributes?.pt_status,
        },
        {
            name: "Agreement Type",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_type,
        },
        {
            name: "Agreement Name",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_name,
        },
        {
            name: "Agreement Price",
            cell: (member: IMember) => (
                <span className="ml-auto">
                    {member?.attributes?.latest_membership?.agreement_price ??
                        0}
                </span>
            ),
        },
        {
            name: "Agreement Duration",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_duration,
        },
        {
            name: "Agrement Start",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_start,
        },
        {
            name: "Agrement End",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_end,
        },
        {
            name: "WkTrnFreq",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.wk_trn_freq,
        },
        {
            name: "Duration Frequency",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.duration_freq,
        },
        {
            name: "AgreementValue",
            cell: (member: IMember) => (
                <span className="ml-auto">
                    ${" "}
                    {member?.attributes?.latest_membership?.agreement_value ??
                        0}
                </span>
            ),
        },
        {
            name: "AutoRenew",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.auto_renew,
        },
        {
            name: "AgreementActive",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_active,
        },
    ],
    exportRequest: getMembershipSalesReportExportRequest,
    dateFilters: "range",
};

export const COACHED_CLIENT_SALES_REPORT: IReport = {
    label: "Coached Client Sales Report",
    columns: [
        { name: "MemberID", cell: (member: IMember) => member?.id },
        {
            name: "Member Name Last",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "Member Name First",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Member Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Member Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        {
            name: "Member Age",
            cell: (member: IMember) => member?.attributes?.age,
        },
        {
            name: "Member GymLocation",
            cell: (member: IMember) =>
                member?.relationships?.gym?.attributes?.address,
        },
        {
            name: "User Name Last",
            cell: (member: IMember) =>
                member?.relationships?.user?.attributes?.last_name,
        },
        {
            name: "User Nickname (Coach)",
            cell: (member: IMember) =>
                member?.relationships?.user?.attributes?.nickname,
        },
        {
            name: "User Gender",
            cell: (member: IMember) =>
                member?.relationships?.user?.attributes?.gender,
        },
        {
            name: "User GymLocation",
            cell: (member: IMember) =>
                member?.relationships?.user?.relationships?.user_gyms?.[0]
                    ?.attributes?.address,
        },
        {
            name: "User Role",
            cell: (member: IMember) =>
                member?.relationships?.user?.relationships?.roles?.[0]
                    ?.attributes?.name,
        },
        {
            name: "LeadAcquired",
            cell: (member: IMember) => member?.attributes?.lead_acquired_at,
        },
        {
            name: "LeadSource",
            cell: (member: IMember) => member?.attributes?.lead_source,
        },
        {
            name: "MemberSince",
            cell: (member: IMember) => member?.attributes?.member_since,
        },
        {
            name: "Member PTSince",
            cell: (member: IMember) => member?.attributes?.pt_since,
        },
        {
            name: "Days_LeadAcq_GymTour",
            cell: (member: IMember) =>
                member?.attributes?.days_lead_acq_to_gym_tour,
        },
        { name: "Days_toCompleteGymTour" },
        {
            name: "Days_LeadAcq_MemberSince",
            cell: (member: IMember) => member?.attributes?.lead_to_member_since,
        },
        {
            name: "Days_GymTour_MemberSince",
            cell: (member: IMember) =>
                member?.attributes?.gym_tour_to_member_since,
        },
        {
            name: "Days_GymTour_JS1_Date",
            cell: (member: IMember) => member?.attributes?.gym_tour_to_js1,
        },
        { name: "Days_JS1_JS1AssessDate" },
        {
            name: "Days_JS1_JS3Date",
            cell: (member: IMember) => member?.attributes?.js1_to_js3,
        },
        { name: "Days_JS3_JS3BodyScan" },
        {
            name: "Date_1stPTAgreement",
            cell: (member: IMember) => member?.attributes?.pt_since,
        },
        {
            name: "Days_LeadAcq_PCAgree",
            cell: (member: IMember) => member?.attributes?.lead_to_first_pt,
        },
        { name: "_Heart_Cardio_Condition" },
        { name: "_High_Blood_Pressure" },
        { name: "_ChestPain" },
        { name: "_RespiratoryDisease" },
        { name: "_Diabetes" },
        { name: "_Surgeries" },
        { name: "_LoseBalanceDizziness" },
        { name: "_Stroke" },
        { name: "_BoneJointSoftTissue" },
        { name: "_PrescibedMedsforChronic" },
        { name: "_MentalHealth_LearningDis" },
        { name: "_OtherMedConditions" },
        {
            name: "MemTaskQty",
            cell: (member: IMember) => member?.attributes?.mem_task_qty,
        },
        {
            name: "QtyMemAgree",
            cell: (member: IMember) => member?.attributes?.qty_mem_agree,
        },
        {
            name: "QtyPTAgree",
            cell: (member: IMember) => member?.attributes?.qty_pt_agree,
        },
        { name: "NowDate", cell: () => getCurrentDate() },
    ],
    dateFilters: "range",
    exportRequest: getCoachedClientsSalesReportExportRequest,
};

export const COACHED_CLIENT_AUDIT: IReport = {
    label: "Coached Client Audit",
    columns: [
        {
            name: "Name",
            cell: (member: IMember) =>
                `${member?.attributes?.first_name} ${member?.attributes?.last_name}`,
        },
        {
            name: "Goes to Auto Renew",
            cell: (member: IMember) =>
                member?.attributes?.current_pt_agree_auto_renew
                    ? moment(member.attributes.current_pt_agree_end).format(
                          "MM.DD.YYYY"
                      )
                    : "N/A",
        },
        {
            name: "Training Frequency",
            cell: (member: IMember) =>
                member?.attributes?.current_pt_training_freq,
        },
        {
            name: "# of Sessions last week",
            cell: (member: IMember) => member?.attributes?.sessions_last_week,
        },
        {
            name: "Ave Sessions/week last 4 weeks",
            cell: (member: IMember) =>
                member?.attributes?.sessions_average_four_weeks,
        },
        {
            name: "BIRTHDAYS",
            cell: (member: IMember) => {
                if (!member?.attributes?.birthday) return "";

                const birthday = new Date(member?.attributes?.birthday);
                birthday.setFullYear(new Date().getFullYear());

                return (
                    <span
                        className={
                            moment(birthday).isBetween(
                                moment().startOf("week"),
                                moment().endOf("week")
                            )
                                ? "text-emerald-500"
                                : ""
                        }
                    >
                        {moment(birthday).format("MM.DD")}
                    </span>
                );
            },
        },
        {
            name: "Last Assessment",
            cell: (member: IMember) =>
                member?.attributes?.last_assessment_date && (
                    <span
                        className={
                            moment(member?.attributes?.birthday).isBetween(
                                moment().subtract(8, "weeks"),
                                moment()
                            )
                                ? "text-emerald-500"
                                : "text-red-500"
                        }
                    >
                        {moment(member.attributes.last_assessment_date).format(
                            "MM.DD.YYYY"
                        )}
                    </span>
                ),
        },
        {
            name: "Last Body Scan",
            cell: (member: IMember) =>
                member?.attributes?.last_body_scanned_at
                    ? moment(member.attributes.last_body_scanned_at).format(
                          "MM.DD.YYYY"
                      )
                    : "",
        },
        {
            name: "Training Frequency to Agreement",
            cell: (member: IMember) =>
                (member?.attributes?.sessions_last_week ?? 0) >=
                (member?.attributes?.current_pt_training_freq ?? 0) ? (
                    <span className="text-emerald-500">Yes</span>
                ) : (
                    <span className="text-red-500">No</span>
                ),
        },
        {
            name: "View Profile",
            cell: (member: IMember) => (
                <div className="w-full flex justify-center">
                    <a
                        href={ROUTES.USER.member.parse(member.id)}
                        target="_blank"
                    >
                        <img src={UserIcon} alt="View Profile" />
                    </a>
                </div>
            ),
        },
    ],
    dashboardColumns: [
        {
            name: "Name",
            cell: (member: IMember) =>
                `${member?.attributes?.first_name} ${member?.attributes?.last_name}`,
        },
        {
            name: "Goes to Auto Renew",
            cell: (member: IMember) =>
                member?.attributes?.current_pt_agree_auto_renew
                    ? moment(member.attributes.current_pt_agree_end).format(
                          "MM.DD.YYYY"
                      )
                    : "N/A",
        },
        {
            name: "Training Frequency",
            cell: (member: IMember) =>
                member?.attributes?.current_pt_training_freq,
        },
        {
            name: "# of Sessions last week",
            cell: (member: IMember) => member?.attributes?.sessions_last_week,
        },
        {
            name: "Ave Sessions/week last 4 weeks",
            cell: (member: IMember) =>
                member?.attributes?.sessions_average_four_weeks,
        },
        {
            name: "BIRTHDAYS",
            cell: (member: IMember) => {
                const birthday = new Date(member?.attributes?.birthday);
                birthday.setFullYear(new Date().getFullYear());

                return (
                    <span
                        className={
                            moment(birthday).isBetween(
                                moment().startOf("week"),
                                moment().endOf("week")
                            )
                                ? "text-emerald-500"
                                : ""
                        }
                    >
                        {moment(birthday).format("MM.DD")}
                    </span>
                );
            },
        },
        {
            name: "Last Assessment",
            cell: (member: IMember) =>
                member?.attributes?.last_assessment_date && (
                    <span
                        className={
                            moment(
                                member?.attributes?.last_assessment_date
                            ).isBetween(moment().subtract(8, "weeks"), moment())
                                ? "text-emerald-500"
                                : "text-red-500"
                        }
                    >
                        {moment(member.attributes.last_assessment_date).format(
                            "MM.DD.YYYY"
                        )}
                    </span>
                ),
        },
        {
            name: "Last Body Scan",
            cell: (member: IMember) =>
                member?.attributes?.last_body_scanned_at
                    ? moment(member.attributes.last_body_scanned_at).format(
                          "MM.DD.YYYY"
                      )
                    : "",
        },
        {
            name: "Training Frequency to Agreement",
            cell: (member: IMember) =>
                (member?.attributes?.sessions_last_week ?? 0) >=
                (member?.attributes?.current_pt_training_freq ?? 0) ? (
                    <span className="text-emerald-500">Yes</span>
                ) : (
                    <span className="text-red-500">No</span>
                ),
        },
        {
            name: "View Profile",
            cell: (member: IMember) => (
                <div className="w-full flex justify-center">
                    <a
                        href={ROUTES.USER.member.parse(member.id)}
                        target="_blank"
                    >
                        <img src={UserIcon} alt="View Profile" />
                    </a>
                </div>
            ),
        },
    ],
    exportRequest: getCoachedClientsReportExportRequest,
    dateFilters: "range",
};

export const ALL_MEMBERS_REPORT: IReport = {
    label: "All Members Report",
    columns: [
        { name: "Member ID", cell: (member: IMember) => member?.id },
        {
            name: "Name Last",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "Name First",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Cell Phone",
            cell: (member: IMember) => member?.attributes?.cell_phone,
        },
        {
            name: "email",
            cell: (member: IMember) => member?.attributes?.email_address,
        },
        {
            name: "Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        {
            name: "DateOfBirth",
            cell: (member: IMember) => member?.attributes?.formatted_birthday,
        },
        { name: "Age", cell: (member: IMember) => member?.attributes?.age },
        {
            name: "GymLocation",
            cell: (member: IMember) =>
                member?.relationships?.gym?.attributes?.address,
        },
        {
            name: "LeadAcquired",
            cell: (member: IMember) => member?.attributes?.lead_acquired_at,
        },
        {
            name: "LeadSource",
            cell: (member: IMember) => member?.attributes?.lead_source,
        },
        {
            name: "GymTourDate",
            cell: (member: IMember) => member?.attributes?.gym_tour_at,
        },
        { name: "GymTourDeckTitle" },
        {
            name: "MemberSince",
            cell: (member: IMember) => member?.attributes?.member_since,
        },
        {
            name: "JS1Date",
            cell: (member: IMember) => member?.attributes?.js1_at,
        },
        { name: "JS1DeckTitle" },
        { name: "JS1Assessment_Date" },
        {
            name: "JS3Date",
            cell: (member: IMember) => member?.attributes?.js3_at,
        },
        { name: "JS3DeckTitle" },
        { name: "JS3Assessment_Date" },
        {
            name: "PTSince",
            cell: (member: IMember) => member?.attributes?.pt_since,
        },
        {
            name: "Days_LeadAcq_GymTour",
            cell: (member: IMember) =>
                member?.attributes?.days_lead_acq_to_gym_tour,
        },
        { name: "Days_toCompleteGymTour" },
        {
            name: "Days_LeadAcq_MemberSince",
            cell: (member: IMember) => member?.attributes?.lead_to_member_since,
        },
        {
            name: "Days_GymTour_MemberSince",
            cell: (member: IMember) =>
                member?.attributes?.gym_tour_to_member_since,
        },
        {
            name: "Days_GymTour_JS1_Date",
            cell: (member: IMember) => member?.attributes?.gym_tour_to_js1,
        },
        { name: "Days_JS1_JS1AssessDate" },
        {
            name: "Days_JS1_JS3Date",
            cell: (member: IMember) => member?.attributes?.js1_to_js3,
        },
        { name: "Days_JS3_JS3BodyScan" },
        {
            name: "Date_1stPTAgreement",
            cell: (member: IMember) => member?.attributes?.pt_since,
        },
        {
            name: "Days_LeadAcq_PCAgree",
            cell: (member: IMember) => member?.attributes?.lead_to_first_pt,
        },
        {
            name: "Heart_Disease",
            cell: (member: IMember) =>
                member?.attributes?.has_heart_disease ? "Yes" : "No",
        },
        {
            name: "High_Blood_Pressure",
            cell: (member: IMember) =>
                member?.attributes?.has_high_blood_pressure ? "Yes" : "No",
        },
        {
            name: "ChestPain",
            cell: (member: IMember) =>
                member?.attributes?.has_chest_pain ? "Yes" : "No",
        },
        {
            name: "RespiratoryDisease",
            cell: (member: IMember) =>
                member?.attributes?.has_respiratory_disease ? "Yes" : "No",
        },
        {
            name: "Diabetes",
            cell: (member: IMember) =>
                member?.attributes?.has_diabetes ? "Yes" : "No",
        },
        {
            name: "Surgeries",
            cell: (member: IMember) =>
                member?.attributes?.has_surgeries ? "Yes" : "No",
        },
        {
            name: "LoseBalanceDizziness",
            cell: (member: IMember) =>
                member?.attributes?.has_loose_balance_dizziness ? "Yes" : "No",
        },
        {
            name: "Stroke",
            cell: (member: IMember) =>
                member?.attributes?.has_stroke ? "Yes" : "No",
        },
        {
            name: "BoneJointSoftTissue",
            cell: (member: IMember) =>
                member?.attributes?.has_bone_joint_soft_tissue ? "Yes" : "No",
        },
        {
            name: "PrescribedMedsforChronic",
            cell: (member: IMember) =>
                member?.attributes?.has_prescribed_meds_for_chronic
                    ? "Yes"
                    : "No",
        },
        {
            name: "MentalHealth_LearningDis",
            cell: (member: IMember) =>
                member?.attributes?.has_mental_health_learning_dis
                    ? "Yes"
                    : "No",
        },
        {
            name: "OtherMedConditions",
            cell: (member: IMember) =>
                member?.attributes?.has_other_med_conditions ? "Yes" : "No",
        },
        {
            name: "MemTaskQty",
            cell: (member: IMember) => member?.attributes?.mem_task_qty,
        },
        {
            name: "QtyMemAgree",
            cell: (member: IMember) => member?.attributes?.qty_mem_agree,
        },
        {
            name: "QtyPTAgree",
            cell: (member: IMember) => member?.attributes?.qty_pt_agree,
        },
        {
            name: "CurrentMem_AgreeEnd",
            cell: (member: IMember) =>
                member?.attributes?.current_mem_agree_end,
        },
        {
            name: "CurrentPT_AgreeEnd",
            cell: (member: IMember) => member?.attributes?.current_pt_agree_end,
        },
        // {
        //     name: "CurrentPT_TrainingFreq",
        //     cell: (member: IMember) =>
        //         member?.attributes?.current_pt_training_freq,
        // },
        {
            name: "CurrentPT_LastWkAttendRate",
            cell: (member: IMember) => member?.attributes?.sessions_last_week,
        },
        { name: "NowDate", cell: () => getCurrentDate() },
        {
            name: "LastAssessmentDate",
            cell: (member: IMember) => member?.attributes?.last_assessment_date,
        },
        {
            name: "WeightStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_weight,
        },
        {
            name: "WeightNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_weight,
        },
        {
            name: "MuscleMassStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_mus_mass,
        },
        {
            name: "MuscleMassNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_mus_mass,
        },
        {
            name: "FatMassStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_fat_mass,
        },
        {
            name: "FatMassNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_fat_mass,
        },
        { name: "Current #1 8wk Goal" },
        { name: "Current 12mo Goal" },
        {
            name: "FMSLevelStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_fms_level,
        },
        {
            name: "FMSLevelNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_fms_level,
        },
        {
            name: "LastBodyScanDate",
            cell: (member: IMember) => member?.attributes?.last_body_scanned,
        },
        {
            name: "TerminationDateMember",
            cell: (member: IMember) =>
                member?.attributes?.termination_date_of_membership,
        },
        {
            name: "TerminationDatePT",
            cell: (member: IMember) =>
                member?.attributes?.termination_date_of_pt,
        },
        {
            name: "TotalMembershipDays",
            cell: (member: IMember) =>
                member?.attributes?.total_membership_length,
        },
    ],
    dateFilters: "range",
    exportRequest: getAllMembersReportExportRequest,
};

export const ALL_LEADS: IReport = {
    label: "All Leads Report",
    columns: [
        { name: "Member ID", cell: (member: IMember) => member?.id },
        {
            name: "Name Last",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "Name First",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Cell Phone",
            cell: (member: IMember) => member?.attributes?.cell_phone,
        },
        {
            name: "email",
            cell: (member: IMember) => member?.attributes?.email_address,
        },
        {
            name: "Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        {
            name: "DateOfBirth",
            cell: (member: IMember) => member?.attributes?.formatted_birthday,
        },
        { name: "Age", cell: (member: IMember) => member?.attributes?.age },
        {
            name: "GymLocation",
            cell: (member: IMember) =>
                member?.relationships?.gym?.attributes?.address,
        },
        {
            name: "LeadAcquired",
            cell: (member: IMember) => member?.attributes?.lead_acquired_at,
        },
        {
            name: "LeadSource",
            cell: (member: IMember) => member?.attributes?.lead_source,
        },
        {
            name: "GymTourDate",
            cell: (member: IMember) => member?.attributes?.gym_tour_at,
        },
        {
            name: "MemTaskQty",
            cell: (member: IMember) => member?.attributes?.mem_task_qty,
        },
    ],
    dateFilters: "range",
    exportRequest: getAllLeadsReportExportRequest,
};

export const MEMBER_HEALTH: IReport = {
    label: "Members Health",
    columns: [
        { name: "Member ID", cell: (member: IMember) => member?.id },
        {
            name: "Name Last",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "Name First",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Cell Phone",
            cell: (member: IMember) => member?.attributes?.cell_phone,
        },
        {
            name: "email",
            cell: (member: IMember) => member?.attributes?.email_address,
        },
        {
            name: "Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        { name: "Age", cell: (member: IMember) => member?.attributes?.age },
        {
            name: "GymLocation",
            cell: (member: IMember) =>
                member?.relationships?.gym?.attributes?.address,
        },
        {
            name: "Heart_Disease",
            cell: (member: IMember) =>
                member?.attributes?.has_heart_disease ? "Yes" : "No",
        },
        {
            name: "High_Blood_Pressure",
            cell: (member: IMember) =>
                member?.attributes?.has_high_blood_pressure ? "Yes" : "No",
        },
        {
            name: "ChestPain",
            cell: (member: IMember) =>
                member?.attributes?.has_chest_pain ? "Yes" : "No",
        },
        {
            name: "RespiratoryDisease",
            cell: (member: IMember) =>
                member?.attributes?.has_respiratory_disease ? "Yes" : "No",
        },
        {
            name: "Diabetes",
            cell: (member: IMember) =>
                member?.attributes?.has_diabetes ? "Yes" : "No",
        },
        {
            name: "Surgeries",
            cell: (member: IMember) =>
                member?.attributes?.has_surgeries ? "Yes" : "No",
        },
        {
            name: "LoseBalanceDizziness",
            cell: (member: IMember) =>
                member?.attributes?.has_loose_balance_dizziness ? "Yes" : "No",
        },
        {
            name: "Stroke",
            cell: (member: IMember) =>
                member?.attributes?.has_stroke ? "Yes" : "No",
        },
        {
            name: "BoneJointSoftTissue",
            cell: (member: IMember) =>
                member?.attributes?.has_bone_joint_soft_tissue ? "Yes" : "No",
        },
        {
            name: "PrescribedMedsforChronic",
            cell: (member: IMember) =>
                member?.attributes?.has_prescribed_meds_for_chronic
                    ? "Yes"
                    : "No",
        },
        {
            name: "MentalHealth_LearningDis",
            cell: (member: IMember) =>
                member?.attributes?.has_mental_health_learning_dis
                    ? "Yes"
                    : "No",
        },
        {
            name: "OtherMedConditions",
            cell: (member: IMember) =>
                member?.attributes?.has_other_med_conditions ? "Yes" : "No",
        },
        {
            name: "MemTaskQty",
            cell: (member: IMember) => member?.attributes?.mem_task_qty,
        },
        {
            name: "QtyMemAgree",
            cell: (member: IMember) => member?.attributes?.qty_mem_agree,
        },
    ],
    dateFilters: "range",
    exportRequest: getMembersHealthReportExportRequest,
};

export const MEMBER_PERFORMANCE: IReport = {
    label: "Members Performance",
    columns: [
        { name: "Member ID", cell: (member: IMember) => member?.id },
        {
            name: "Name Last",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "Name First",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        { name: "Age", cell: (member: IMember) => member?.attributes?.age },
        {
            name: "GymLocation",
            cell: (member: IMember) =>
                member?.relationships?.gym?.attributes?.address,
        },
        {
            name: "MemberSince",
            cell: (member: IMember) => member?.attributes?.member_since,
        },
        { name: "JS1Assessment_Date" },
        {
            name: "PTSince",
            cell: (member: IMember) => member?.attributes?.pt_since,
        },
        {
            name: "CurrentMem_AgreeEnd",
            cell: (member: IMember) =>
                member?.attributes?.current_mem_agree_end,
        },
        {
            name: "CurrentPT_AgreeEnd",
            cell: (member: IMember) => member?.attributes?.current_pt_agree_end,
        },
        // {
        //     name: "CurrentPT_TrainingFreq",
        //     cell: (member: IMember) =>
        //         member?.attributes?.current_pt_training_freq,
        // },
        {
            name: "CurrentPT_LastWkAttendRate",
            cell: (member: IMember) => member?.attributes?.sessions_last_week,
        },
        { name: "NowDate", cell: () => getCurrentDate() },
        {
            name: "LastAssessmentDate",
            cell: (member: IMember) => member?.attributes?.last_assessment_date,
        },
        {
            name: "WeightStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_weight,
        },
        {
            name: "WeightNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_weight,
        },
        {
            name: "MuscleMassStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_mus_mass,
        },
        {
            name: "MuscleMassNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_mus_mass,
        },
        {
            name: "FatMassStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_fat_mass,
        },
        {
            name: "FatMassNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_fat_mass,
        },
        { name: "Current #1 8wk Goal" },
        { name: "Current 12mo Goal" },
        {
            name: "FMSLevelStart",
            cell: (member: IMember) =>
                member?.attributes?.js1_assessment_fms_level,
        },
        {
            name: "FMSLevelNow",
            cell: (member: IMember) =>
                member?.attributes?.latest_assessment_fms_level,
        },
        {
            name: "Performance Score Start",
            cell: (member: IMember) =>
                member?.attributes?.previous_performance_test_score,
        },
        {
            name: "Performance Score Now",
            cell: (member: IMember) =>
                member?.attributes?.current_performance_test_score,
        },
        {
            name: "LastBodyScanDate",
            cell: (member: IMember) => member?.attributes?.last_body_scanned,
        },
    ],
    dateFilters: "range",
    exportRequest: getMemberPerformanceReportExportRequest,
};

export const COACH_TASKS_DATA: IReport = {
    label: "Task Assigned",
    columns: [
        { name: "Task Type", cell: (task: ITask) => task?.attributes?.type },
        {
            name: "Task Status",
            cell: (task: ITask) => task?.attributes?.priority,
        },
        {
            name: "Task Due Date",
            cell: (task: ITask) => task?.attributes?.due_at,
        },
        { name: "Task Name", cell: (task: ITask) => task?.attributes?.name },
        {
            name: "Task Description",
            cell: (task: ITask) => task?.attributes?.description,
        },
        {
            name: "Task Member",
            cell: (task: ITask) => (
                <span>
                    {task?.relationships?.member?.attributes?.last_name},{" "}
                    {task?.relationships?.member?.attributes?.first_name}
                </span>
            ),
        },
    ],
    dateFilters: "range",
};

export const SALES_AGREEMENTS_REPORT: IReport = {
    label: "Sales Agreement Report",
    columns: [
        {
            name: "First Name",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.member?.attributes
                    ?.first_name,
        },
        {
            name: "Last Name",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.member?.attributes
                    ?.last_name,
        },
        {
            name: "E-mail",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.member?.attributes
                    ?.email_address,
        },
        { name: "AgreementLocation" },
        {
            name: "AgreementType",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.sales_agreement?.attributes
                    ?.type,
        },
        {
            name: "AgreementName",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.sales_agreement?.attributes
                    ?.name,
        },
        {
            name: "AgreementPrice",
            cell: (memberSalesAgreement: IMemberSalesAgreement) => (
                <span className="ml-auto">
                    ${" "}
                    {
                        memberSalesAgreement?.relationships?.sales_agreement
                            ?.attributes?.price
                    }
                </span>
            ),
        },
        {
            name: "AgreementDuration",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.sales_agreement?.attributes
                    ?.duration,
        },
        {
            name: "AgreementStart",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                formatDate(memberSalesAgreement?.attributes?.start_date),
        },
        {
            name: "AgreementEnd",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                formatDate(memberSalesAgreement?.attributes?.end_date),
        },
        {
            name: "DurationFreq",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.sales_agreement?.attributes
                    ?.duration_frequency,
        },
        {
            name: "WkTrnFreq",
            cell: (memberSalesAgreement: IMemberSalesAgreement) =>
                memberSalesAgreement?.relationships?.sales_agreement?.attributes
                    ?.weekly_training_frequency,
        },
        {
            name: "AgreementValue",
            cell: (memberSalesAgreement: IMemberSalesAgreement) => (
                <span className="ml-auto">
                    $
                    {
                        memberSalesAgreement?.relationships?.sales_agreement
                            ?.attributes?.agreement_value
                    }
                </span>
            ),
        },
        {
            name: "AutoRenewable",
            cell: (memberSalesAgreement: IMemberSalesAgreement) => (
                <span className="ml-auto">
                    {memberSalesAgreement?.relationships?.sales_agreement
                        ?.attributes?.is_auto_renewal
                        ? "Yes"
                        : "No"}
                </span>
            ),
        },
        {
            name: "Active",
            cell: (memberSalesAgreement: IMemberSalesAgreement) => (
                <span className="ml-auto">
                    {memberSalesAgreement?.relationships?.sales_agreement
                        ?.attributes?.is_active
                        ? "Yes"
                        : "No"}
                </span>
            ),
        },
    ],
    dateFilters: "range",
    exportRequest: getSalesAgreementsReportExportRequest,
};

export const COACH_TASKS: IReport = {
    label: "Coach Tasks",
    columns: [
        {
            name: "User Name Last",
            cell: (user: IUser) => user?.attributes?.last_name,
        },
        {
            name: "User Name First",
            cell: (user: IUser) => user?.attributes?.first_name,
        },
        {
            name: "User Nickname",
            cell: (user: IUser) => user?.attributes?.nickname,
        },
        {
            name: "User Gender",
            cell: (user: IUser) => user?.attributes?.gender,
        },
        {
            name: "Gym Location",
            cell: (user: IUser) =>
                user?.relationships?.user_gyms
                    ? user?.relationships?.user_gyms[0]?.attributes?.address
                    : "",
        },
        {
            name: "User Role",
            cell: (user: IUser) =>
                user?.relationships?.roles?.[0]?.attributes?.name,
        },
        { name: "User Email", cell: (user: IUser) => user?.attributes?.email },
        { name: "Now Date", cell: (user: IUser) => getCurrentDate() },
    ],
    dateFilters: "range",
    subColumns: COACH_TASKS_DATA.columns,
    exportRequest: getCoachTasksReportExportRequest,
};

export const MEMBER_ENROLLMENT: IReport = {
    label: "Member Enrollment",
    columns: [
        {
            name: "Month",
            cell: (data: IMemberEnrollment) => data?.month,
            style: { "text-align": "right" },
        },
        {
            name: "Start",
            cell: (data: IMemberEnrollment) => data?.start,
        },
        { name: "End", cell: (data: IMemberEnrollment) => data?.end },
        { name: "New", cell: (data: IMemberEnrollment) => data?.new },
        {
            name: "Terminated",
            cell: (data: IMemberEnrollment) => data?.terminated,
        },
        { name: "Net Changed", cell: (data: IMemberEnrollment) => data?.net },
        {
            name: "Retention Rate",
            cell: (data: IMemberEnrollment) => data?.retention,
        },
        {
            name: "Growth Rate",
            cell: (data: IMemberEnrollment) => data?.growth,
        },
    ],
    dateFilters: "range",
    exportRequest: getMemberEnrollmentReportExportRequest,
};

export const CONVERSION_BENCHMARK: IReport = {
    label: "Conversion Benchmark",
    columns: [
        {
            name: "Conversion Rate Benchmarks",
            cell: (data: IConversionBenchMark) => data?.name,
        },
        {
            name: "Actual",
            cell: (data: IConversionBenchMark) => data?.actual,
            right: true,
        },
        {
            name: "Benchmark",
            cell: (data: IConversionBenchMark) => data?.benchmark,
            right: true,
        },
    ],
    dateFilters: "range",
};

export const REVENUE_GAP: IReport = {
    label: "Revenue Gap",
    columns: [
        {
            name: "Revenue Gap",
            cell: (data: IRevenueGap) => data?.name,
        },
        {
            name: "Agreements Needed",
            cell: (data: IRevenueGap) => data?.needed,
            center: true,
        },
    ],
    dateFilters: "range",
};

export const SALES_APPOINTMENT_REPORT: IReport = {
    label: "Sales Appointment Report",
    columns: [
        {
            name: "Gym Location",
            cell: (member: IMember) =>
                member.relationships?.gym
                    ? member?.relationships?.gym?.attributes?.address
                    : "",
        },
        {
            name: "Member ID",
            cell: (member: IMember) => member?.id,
        },
        {
            name: "Last name",
            cell: (member: IMember) => member?.attributes?.last_name,
        },
        {
            name: "First name",
            cell: (member: IMember) => member?.attributes?.first_name,
        },
        {
            name: "Nickname",
            cell: (member: IMember) => member?.attributes?.nickname,
        },
        {
            name: "Cell phone",
            cell: (member: IMember) => member?.attributes?.cell_phone,
        },
        {
            name: "Email",
            cell: (member: IMember) => member?.attributes?.email_address,
        },
        {
            name: "Gender",
            cell: (member: IMember) => member?.attributes?.gender,
        },
        {
            name: "Lead Source",
            cell: (member: IMember) => member?.attributes?.lead_source,
        },
        {
            name: "Lead Acquired Date",
            cell: (member: IMember) => member?.attributes?.lead_acquired_at,
        },
        {
            name: "Gym Tour Date",
            cell: (member: IMember) => member?.attributes?.gym_tour_at,
        },
        {
            name: "Agreed to Become Member",
            cell: (member: IMember) =>
                member?.attributes?.agreed_to_become_a_member,
        },
        {
            name: "JS1 Schedule Date",
            cell: (member: IMember) => member?.attributes?.js1_schedule_date,
        },
        {
            name: "JS1 Date",
            cell: (member: IMember) => member?.attributes?.js1_at,
        },
        {
            name: "JS3 Schedule Date",
            cell: (member: IMember) => member?.attributes?.js3_schedule_date,
        },
        {
            name: "JS3 Date",
            cell: (member: IMember) => member?.attributes?.js3_at,
        },
        {
            name: "Member Since",
            cell: (member: IMember) => member?.attributes?.member_since,
        },
        {
            name: "PT Status",
            cell: (member: IMember) => member?.attributes?.pt_status,
        },
        {
            name: "Agreement Type",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_type,
        },
        {
            name: "Agreement Name",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_name,
        },
        {
            name: "Agreement Price",
            cell: (member: IMember) => (
                <span className="ml-auto">
                    {member?.attributes?.latest_membership?.agreement_price ??
                        0}
                </span>
            ),
        },
        {
            name: "Agreement Duration",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_duration,
        },
        {
            name: "Agrement Start",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_start,
        },
        {
            name: "Agrement End",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_end,
        },
        {
            name: "WkTrnFreq",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.wk_trn_freq,
        },
        {
            name: "Duration Frequency",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.duration_freq,
        },
        {
            name: "AgreementValue",
            cell: (member: IMember) => (
                <span className="ml-auto">
                    ${" "}
                    {member?.attributes?.latest_membership?.agreement_value ??
                        0}
                </span>
            ),
        },
        {
            name: "AutoRenew",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.auto_renew,
        },
        {
            name: "AgreementActive",
            cell: (member: IMember) =>
                member?.attributes?.latest_membership?.agreement_active,
        },
    ],
    exportRequest: getSalesAppointmentReportExportRequest,
    dateFilters: "range",
};

export const REPORT_TYPES: IReportType[] = [
    {
        type: "Sales",
        reports: [
            MONTHLY_SALES_TRACKER,
            MEMBERSHIP_SALES_REPORT,
            SALES_AGREEMENTS_REPORT,
            COACHED_CLIENT_SALES_REPORT,
            SALES_APPOINTMENT_REPORT,
            {
                label: "Sales 3",
                dateFilters: "range",
            },
        ],
    },
    {
        type: "Members",
        reports: [
            ACTIVE_MEMBERS,
            ALL_MEMBERS_REPORT,
            ALL_LEADS,
            MEMBER_HEALTH,
            MEMBER_PERFORMANCE,
            MEMBER_ENROLLMENT,
            {
                label: "Member Attrition",
                dateFilters: "range",
            },
            {
                label: "Frozen Members",
                dateFilters: "range",
            },
            COACHED_CLIENT_AUDIT,
        ],
    },

    {
        type: "Staff",
        reports: [
            TASK_LEADERBOARD,
            COACH_TASKS,
            {
                label: "Staff 2",
                dateFilters: "range",
            },
            {
                label: "Staff 3",
                dateFilters: "range",
            },
        ],
    },
    {
        type: "Products",
        reports: [
            {
                label: "Products 1",
                dateFilters: "range",
            },
            {
                label: "Products 2",
                dateFilters: "range",
            },
            {
                label: "Products 3",
                dateFilters: "range",
            },
        ],
    },
    {
        type: "PT Clients",
        reports: [
            {
                label: "PT Clients 1",
                dateFilters: "range",
            },
            {
                label: "PT Clients 2",
                dateFilters: "range",
            },
            {
                label: "PT Clients 3",
                dateFilters: "range",
            },
        ],
    },
    {
        type: "Misc",
        reports: [
            {
                label: "Misc 1",
                dateFilters: "range",
            },
            {
                label: "Misc 2",
                dateFilters: "range",
            },
            {
                label: "Misc 3",
                dateFilters: "range",
            },
        ],
    },
];
