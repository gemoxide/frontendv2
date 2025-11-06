import { IMeta, IMetaQuery } from "./common.interface";

export interface IGym {
    type: string;
    id: any;
    attributes: {
        name: string;
        address: string;
        goal?: number;
        monthly_jsi_booked?: number;
        monthly_pt_agreement_value?: string;
        new_members_per_month?: number;
        team_member_review_cadence?: number;
        wig_goal_date_formatted?: string;
        last_month_pt_revenue?: string;
        last_month_membership_revenue?: string;
        leads_to_gym_tours_percent?: number;
        membership_close_rate_percent?: number;
        js1_fc_booked_percent?: number;
        js3_fc_close_rate_percent?: number;
        membership_attrition_rate_percent?: number;
        pt_retention_rate_percent?: number;
        new_leads_per_month: number;
        cancelled_members_per_month: number;
        new_pt_per_month: number;
        monthly_membership_revenue: number;
        default_client_onboarding_id?: string;
        default_assessment_id?: string;
        default_lead_id?: string;
        default_office_staff_id?: string;
        default_call_id?: string;
        default_gym_tour_id?: string;
        default_js1_id?: string;
        default_js3_id?: string;
        default_note_member_onboarding?: string;
        default_note_coached_client_onboarding?: string;
        gym_tour_show_per_month?: number;
        js1_tour_show_per_month?: number;
        js3_tour_show_per_month?: number;
        coached_client_closed?: number;
        coached_client_appointments?: number;
        prospect_to_lead_rate?: number;
        js1_show_rate_percent?: number;
        js3_show_rate_percent?: number;
        scheduled_js3: number;
        new_prospects_per_month?: number;
        api_key: string;
        wig_start_date?: string;
        wig_duration?: number;
        wig_monthly_membership_growth_percentage?: number;
        wig_monthly_pt_growth_percentage?: number;
        wig_pt_average_value?: number;
        wig_membership_average_value?: number;
        lead_measure_sandbox: any;
        wig_start_year?: number;
    };
    relationships: any;
}

export interface IGymResponse {
    data: IGym[];
    meta: IMeta;
}

export type GetGymsQuery = IMetaQuery;

export type CreateGymParam = {
    organization_id?: string;
    id?: string;
    name: string;
    address?: string;
    team_member_review_cadence?: number;
    goal?: number;
    new_members_per_month?: number;
    monthly_jsi_booked?: number;
    monthly_pt_agreement_value?: string;
    last_month_pt_revenue?: string;
    last_month_membership_revenue?: string;
    leads_to_gym_tours_percent?: number;
    membership_close_rate_percent?: number;
    js1_fc_booked_percent?: number;
    js3_fc_close_rate_percent?: number;
    membership_attrition_rate_percent?: number;
    pt_retention_rate_percent?: number;
    new_leads_per_month?: number;
    cancelled_members_per_month?: number;
    new_pt_per_month?: number;
    monthly_membership_revenue?: number;
    gym_tour_show_per_month?: number;
    js1_tour_show_per_month?: number;
    js3_tour_show_per_month?: number;
    coached_client_closed?: number;
    coached_client_appointments?: number;
    prospect_to_lead_rate?: number;
};

export type CreateGymDefaults = {
    id: string;
    default_client_onboarding_id?: string;
    default_assessment_id?: string;
    default_lead_id?: string;
    default_office_staff_id?: string;
    default_note_member_onboarding?: string;
    default_note_coached_client_onboarding?: string;
};

export type SalesTrackerData = Omit<
    CreateGymParam,
    "organization_id" | "name" | "address" | "team_member_review_cadence"
>;

export type ConversionBenchmarkData = {
    id: number;
    prospect_to_lead_rate?: number;
    leads_to_gym_tours_percent?: number;
    membership_close_rate_percent?: number;
    js1_fc_booked_percent?: number;
    js3_fc_close_rate_percent?: number;
    membership_attrition_rate_percent?: number;
    pt_retention_rate_percent?: number;
};

export type SandboxWigData = {
    id?: string;
    goal?: number;
};

export type UpdateWigPayload = {
    id?: string;
    wig_start_date?: string;
    wig_start_year?: number;
    wig_duration?: number;
    wig_monthly_membership_growth_percentage?: number;
    wig_monthly_pt_growth_percentage?: number;
};

export type LeadMeasuresSandbox = {
    gym_id: number;
    proposed_new_membership_goals: number;
    proposed_new_pt_goals: number;
    lead_to_gym_tour_rate: number;
    gym_tour_show_rate: number;
    pos_membership_close_rate: number;
    js1_scheduled_at_pos_rate: number;
    js1_show_rate: number;
    fc_js3_scheduled_at_pos_rate: number;
    fc_js3_show_rate: number;
    js3_close_rate: number;
};

export type LeadMeasureRates = {
    leads_schedule_a_gym_tour_rate: number;
    gym_tour_show_rate: number;
    pos_membership_close_rate: number;
    js1_scheduled_at_pos_rate: number;
    js1_show_rate: number;
    fc_js3_scheduled_at_pos_rate: number;
    fc_js3_show_rate: number;
    js3_close_rate: number;
};

export type LeadMeasuresData = {
    new_pt_goal: number;
    members_that_show_for_js3: number;
    members_scheduled_for_js3: number;
    members_that_show_for_js1: number;
    new_members_to_js1: number;
    leads_to_new_memberships: number;
    leads_that_show_for_tour: number;
    leads_scheduled: number;
    leads_required_to_reach_pt_goal: number;
};

export type LeadMeasures = {
    rates: LeadMeasureRates;
    data: LeadMeasuresData;
};

export type LeadMeasuresResponse = {
    previous_month: LeadMeasures;
    sandbox_rates: LeadMeasures;
};
