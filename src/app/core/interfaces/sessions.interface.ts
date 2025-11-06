import { IMeta, IMetaQuery } from "./common.interface";
import { IUser } from "./user.interface";

export interface ISessionMember {
    type: string;
    id: string;
    attributes: {
        first_name: string;
        last_name: string;
        avatar: string;
        type: string;
        is_body_scanned: boolean;
        is_no_show: boolean;
        performance_test_type?: string;
        fms_level?: string;
        has_active_membership: boolean;
        has_active_coached_client: boolean;
        is_coached_client_frozen: boolean;
        is_membership_frozen: boolean;
        has_heart_disease?: string;
        has_high_blood_pressure?: string;
        has_chest_pain?: string;
        has_respiratory_disease?: string;
        has_diabetes?: string;
        has_surgeries?: string;
        has_loose_balance_dizziness?: string;
        has_stroke?: string;
        has_bone_joint_soft_tissue?: string;
        has_prescribed_meds_for_chronic?: string;
        has_mental_health_learning_dis?: string;
        has_other_med_conditions?: string;
    };
}

export interface GetMemberSessionsQuery extends IMetaQuery {
    member_id: string;
}

export interface ISession {
    type: string;
    id: number;
    attributes: {
        session_at: string;
        members_count: number;
    };
    relationships: {
        user?: IUser;
        members?: ISessionMember[];
    };
}

export interface GetMemberSessionQuery extends IMetaQuery {
    member_id: string;
}

export interface ISessionResponse {
    data: ISession[];
    meta: IMeta;
}

export type CreateSessionParam = {
    id?: number;
    user_id: number;
    member_ids: string[];
    session_at: string;
};

export type UpdateMemberSessionParam = {
    session_id: number;
    member_id: string;
    is_body_scanned?: boolean;
    is_no_show?: boolean;
    time_zone?: string;
};

export interface SessionQuery extends IMetaQuery {
    sessions?: string;
    user_id?: string;
    current_date?: string;
}

export enum FmsLevel {
    stability = "Stability",
    strength = "Strength",
    power = "Power",
}

export enum PerformanceType {
    optimal = "Optimal Life",
    standard = "Standard",
}
