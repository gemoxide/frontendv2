import { IMeta, IMetaQuery } from "./common.interface";
import { IPresentationDeck } from "./presentation-decks.interface";
import { IUser } from "./user.interface";

export interface IGroupAssessmentMember {
    type: string;
    id: string;
    attributes: {
        first_name: string;
        last_name: string;
        avatar: string;
        type: string;
        nickname?: string;
        gender?: string;
        cell_phone?: string;
        email_address?: string;
        custom_fields?: Object;
        birthday?: string;
        has_heart_disease?: boolean;
        has_high_blood_pressure?: boolean;
        has_chest_pain?: boolean;
        has_respiratory_disease?: boolean;
        has_diabetes?: boolean;
        has_surgeries?: boolean;
        has_loose_balance_dizziness?: boolean;
        has_bone_joint_soft_tissue?: boolean;
        has_prescribed_meds_for_chronic?: boolean;
        has_mental_health_learning_dis?: boolean;
        has_other_med_conditions?: boolean;
        is_employer_paying_dues?: boolean;
        language?: string;
        performance_test_type: string;
        is_functional_movement_complete: boolean;
        is_performance_test_complete: boolean;
        is_training_focus_complete: boolean;
        is_pre_assessment_complete: boolean;
        is_post_assessment_complete: boolean;
        is_body_scan_complete?: boolean;
        chest: number;
        waist: number;
        hips: number;
        weight: number;
        muscle_mass: number;
        fat_mass: number;
        percent_body_fat: number;
        lunge_left: number;
        lunge_right: number;
        shoulder_left: number;
        shoulder_right: number;
        chair_stand: number;
        seated_arm_curls: number;
        chair_sit_reach: number;
        back_scratch: number;
        eight_up_go: number;
        two_min_step_test: number;
        is_anterior_feet_turned_out_left: boolean;
        is_anterior_feet_turned_out_right: boolean;
        is_anterior_feet_flatten_left: boolean;
        is_anterior_feet_flatten_right: boolean;
        is_anterior_knees_move_inward_left: boolean;
        is_anterior_knees_move_inward_right: boolean;
        is_lateral_lphc_excessive_forward_lean_left: boolean;
        is_lateral_lphc_excessive_forward_lean_right: boolean;
        is_lateral_lphc_lower_back_arches_left: boolean;
        is_lateral_lphc_lower_back_arches_right: boolean;
        is_lateral_shoulder_complex_arms_fall_forward_left: boolean;
        is_lateral_shoulder_complex_arms_fall_forward_right: boolean;
        is_posterior_feet_flatten_left: boolean;
        is_posterior_feet_flatten_right: boolean;
        is_posterior_lphc_asymmetric_weight_shift_left: boolean;
        is_posterior_lphc_asymmetric_weight_shift_right: boolean;
        chair_stand_notes?: string;
        seated_arm_curls_notes?: string;
        chair_sit_reach_notes?: string;
        back_scratch_notes?: string;
        eight_up_go_notes?: string;
        two_min_step_test_notes?: string;
        overhead_squat_notes?: string;
        lunge_notes?: string;
        shoulder_notes?: string;
        member_presentation_deck_id: string;
        member_training_focus_deck_id?: string;
        member_pre_assessment_deck_id?: string;
        member_post_assessment_deck_id?: string;
        twelve_step_up_weight?: number;
        db_floor_press_weight?: number;
        dbl_kb_dl_weight?: number;
        goblet_squat_weight?: number;
        kb_oh_press_weight?: number;
        kb_swing_weight?: number;
        dbl_racked_squat_weight?: number;
        cable_press_weight?: number;
        sets_completed: number;
        previous_sets_completed: number;
        overhead_squat_score?: number;
        lunge_score?: number;
        shoulder_score?: number;
        chair_stand_score?: number;
        seated_arm_curls_score?: number;
        chair_sit_reach_score?: number;
        back_scratch_score?: number;
        eight_up_go_score?: number;
        two_min_step_test_score?: number;
        completed_reps?: number;
        min_weight?: number;
        max_weight?: number;
        previous_performance_test_score?: number;
        current_performance_test_score?: number;
    };
}

export interface IProgressReport {
    measurement: string;
    start: number;
    prev: number;
    current: number;
}

export interface IGroupAssessment {
    type: string;
    id: number;
    attributes: {
        assessment_mode_id: string;
        assessment_type_id: string;
        type: string;
        mode: string;
        assessment_at: string;
        members_count: number;
        post_assessment_custom_deck?: string;
        pre_assessment_custom_deck?: string;
        training_focus_custom_deck?: string;
    };
    relationships: {
        user?: IUser;
        members?: IGroupAssessmentMember[];
        training_focus_deck?: IPresentationDeck;
        pre_assessment_deck?: IPresentationDeck;
        post_assessment_deck?: IPresentationDeck;
    };
}

export interface GetMemberGroupAssessmentsQuery extends IMetaQuery {
    member_id: string;
}

export interface IGroupAssessmentResponse {
    data: IGroupAssessment[];
    meta: IMeta;
}

export interface IProgressReportResponse {
    firstAssessmentDate?: string;
    data: IProgressReport[];
}

export type CreateGroupAssessmentParam = {
    id?: number;
    user_id: number;
    assessment_mode_id: string;
    training_focus_custom_deck?: string;
    training_focus_deck_id?: number;
    pre_assessment_custom_deck?: string;
    pre_assessment_deck_id?: number;
    post_assessment_custom_deck?: string;
    post_assessment_deck_id?: number;
    assessment_type_id: string;
    member_ids: string[];
    assessment_at: string;
};

export interface ProgressReportTableData {
    name: string;
    value: number;
}

export type UpdateMemberAssessmentParam = {
    group_assessment_id: number;
    member_id: string;
    performance_test_type?: "Stability" | "Power" | "Strength";
    is_functional_movement_complete?: boolean;
    is_performance_test_complete?: boolean;
    is_training_focus_complete?: boolean;
    is_pre_assessment_complete?: boolean;
    is_post_assessment_complete?: boolean;
    is_body_scan_complete?: boolean;
    chest?: number;
    waist?: number;
    hips?: number;
    weight?: number;
    muscle_mass?: number;
    fat_mass?: number;
    percent_body_fat?: number;
    lunge_left?: number;
    lunge_right?: number;
    shoulder_left?: number;
    shoulder_right?: number;
    chair_stand?: number;
    seated_arm_curls?: number;
    chair_sit_reach?: number;
    back_scratch?: number;
    eight_up_go?: number;
    two_min_step_test?: number;
    is_anterior_feet_turned_out_left?: boolean;
    is_anterior_feet_turned_out_right?: boolean;
    is_anterior_feet_flatten_left?: boolean;
    is_anterior_feet_flatten_right?: boolean;
    is_anterior_knees_move_inward_left?: boolean;
    is_anterior_knees_move_inward_right?: boolean;
    is_lateral_lphc_excessive_forward_lean_left?: boolean;
    is_lateral_lphc_excessive_forward_lean_right?: boolean;
    is_lateral_lphc_lower_back_arches_left?: boolean;
    is_lateral_lphc_lower_back_arches_right?: boolean;
    is_lateral_shoulder_complex_arms_fall_forward_left?: boolean;
    is_lateral_shoulder_complex_arms_fall_forward_right?: boolean;
    is_posterior_feet_flatten_left?: boolean;
    is_posterior_feet_flatten_right?: boolean;
    is_posterior_lphc_asymmetric_weight_shift_left?: boolean;
    is_posterior_lphc_asymmetric_weight_shift_right?: boolean;
    chair_stand_notes?: string;
    seated_arm_curls_notes?: string;
    chair_sit_reach_notes?: string;
    back_scratch_notes?: string;
    eight_up_go_notes?: string;
    two_min_step_test_notes?: string;
    overhead_squat_notes?: string;
    lunge_notes?: string;
    shoulder_notes?: string;
    twelve_step_up_weight?: number;
    db_floor_press_weight?: number;
    dbl_kb_dl_weight?: number;
    goblet_squat_weight?: number;
    kb_oh_press_weight?: number;
    kb_swing_weight?: number;
    dbl_racked_squat_weight?: number;
    sets_completed?: number;
    overhead_squat_score?: number;
    lunge_score?: number;
    shoulder_score?: number;
    completed_reps?: number;
    min_weight?: number;
    max_weight?: number;
    started_by?: string;
    started_at?: string;
    time_zone?: string;
};

export interface DeleteGroupAssessmentParam {
    id: number;
}

export interface StartGroupAssessmentParam {
    id: number;
}
