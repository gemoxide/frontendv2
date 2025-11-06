import { IMeta, IMetaQuery } from "./common.interface";
import { IGym } from "./gyms.interface";
import { IMedia } from "./media.interface";
import { LatestMembership } from "./member-sales-agreement.interface";
import { IUser } from "./user.interface";

export interface IMember {
    type: string;
    id: any;
    attributes: {
        first_name: string;
        last_name: string;
        gender: string;
        cell_phone: string;
        email_address: string;
        opt_in_to_use_photo?: boolean;
        sales_status?: string;
        sales_status_formatted?: string;
        contact_status?: string;
        contact_status_formatted?: string;
        lead_source: string;
        lead_source_formatted: string;
        lead_acquired_at: string;
        gym_tour_at?: string;
        js1_at?: string;
        js3_at?: string;
        showed_gym_tour?: string;
        showed_js1?: string;
        showed_js3?: string;
        short_term_reason?: string;
        member_since?: string;
        type?: string;
        pt_since?: string;
        pt_status?: string;
        custom_fields: Object;
        avatar: string;
        membership_agreement_status?: string;
        coached_client_agreement_status?: string;
        fms_level?: string;
        birthday: string;
        latest_membership?: LatestMembership;
        nickname?: string;
        formatted_birthday?: string;
        age?: number;
        days_lead_acq_to_gym_tour?: number;
        lead_to_member_since?: number;
        gym_tour_to_member_since?: number;
        gym_tour_to_js1?: number;
        js1_to_js3?: number;
        lead_to_first_pt?: number;
        mem_task_qty?: number;
        qty_mem_agree?: number;
        qty_pt_agree?: number;
        current_mem_agree_end?: string;
        current_pt_agree_end?: string;
        sessions_last_week?: number;
        sessions_average_four_weeks?: number;
        last_assessment_date?: string;
        js1_assessment_weight?: number;
        latest_assessment_weight?: number;
        js1_assessment_mus_mass?: number;
        latest_assessment_mus_mass?: number;
        js1_assessment_fat_mass?: number;
        latest_assessment_fat_mass?: number;
        latest_assessment_fms_level?: string;
        total_membership_length?: number;
        current_pt_training_freq?: number;
        js1_assessment_fms_level?: string;
        has_heart_disease?: boolean;
        has_high_blood_pressure?: boolean;
        has_chest_pain?: boolean;
        has_respiratory_disease?: boolean;
        has_diabetes?: boolean;
        has_surgeries?: boolean;
        has_loose_balance_dizziness?: boolean;
        has_stroke?: boolean;
        has_bone_joint_soft_tissue?: boolean;
        has_prescribed_meds_for_chronic?: boolean;
        has_mental_health_learning_dis?: boolean;
        has_other_med_conditions?: boolean;
        performance_test_type?: string;
        recent_membership_agreement?: LatestMembership;
        recent_coached_client_agreement?: LatestMembership;
        has_active_membership?: boolean;
        has_active_coached_client?: boolean;
        is_membership_frozen?: boolean;
        is_coached_client_frozen?: boolean;
        last_body_scanned?: string;
        termination_date_of_membership?: string;
        termination_date_of_pt?: string;
        language?: string;
        is_employer_paying_dues?: boolean;
        js1_schedule_date?: string;
        js1_schedule_date_formatted?: string;
        agreed_to_become_a_member?: boolean;
        js3_schedule_date?: string;
        js3_schedule_date_formatted?: string;
        agreed_to_become_a_coached_client?: boolean;
        js1_deck_attached?: string;
        js1_deck_attached_formatted?: string;
        js3_deck_attached?: string;
        js3_deck_attached_formatted?: string;
        total_overdue_tasks?: number;
        total_tasks?: number;
        current_pt_agree_auto_renew: boolean;
        last_body_scanned_at?: string;
        previous_performance_test_score?: number;
        current_performance_test_score?: number;
        deck_data?: any;
    };
    relationships: {
        gym?: IGym;
        media?: IMedia[];
        user?: IUser;
    };
}

export interface IMembersResponse {
    data: IMember[];
    meta: IMeta;
}

export type GetMembersQuery = IMetaQuery & {
    member_type?: "all" | "members" | "leads";
    lead_source?: string;
    sales_agreement?: number;
    gym_id?: number;
    gym_tour?: string;
};

export type GetGymMembersQuery = IMetaQuery & {
    type?: "Standard" | "Optimal Life";
};

export type CreateMemberParam = {
    id?: string;
    first_name: string;
    last_name: string;
    gender?: string;
    cell_phone?: string;
    opt_in_to_use_photo?: boolean;
    sales_status?: string;
    contact_status?: string;
    birthday: string;
    nickname?: string;
    is_employer_paying_dues?: boolean;
    js1_schedule_date?: string;
    agreed_to_become_a_member?: boolean;
    js3_schedule_date?: string;
    lead_acquired_at?: string;
    gym_tour_at?: string;
};

export type CreateMemberMediaParam = {
    file: File;
    name: string;
    type: string;
};

export type CreateMemberLeadParam = {
    id?: string;
    first_name: string;
    last_name: string;
    gender: string;
    cell_phone: string;
    email_address: string;
    lead_source: string;
    lead_acquired_at: string;
    gym_id: string;
    gym_tour_date?: string;
    birthday: string;
    nickname?: string;
    language?: string;
    agreed_to_become_a_coached_client?: boolean;
    agreed_to_become_a_member?: boolean;
};

export type UpdateMemberAvatarParam = {
    id: string;
    file: File;
};
