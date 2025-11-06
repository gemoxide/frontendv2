import { IMeta, IMetaQuery } from "./common.interface";

export interface IOrganization {
    type: string;
    id: any;
    attributes: {
        name: string;
        tagline: string;
        logo: string;
        goal?: number;
        wig_goal_date?: string;
        wig_goal_date_formatted?: string;
        total_members?: string | number;
        total_users?: string | number;
        lead_management_steps: number;
        lead_management_step1_actions?: string[];
        lead_management_step2_actions?: string[];
        lead_management_step3_actions?: string[];
        coaching_assessment_frequency: any;
        coaching_assessment_data: any;
        pt_clients?: string | number;
    };
    relationships: any;
}

export interface IOrganizationsResponse {
    data: IOrganization[];
    meta: IMeta;
}

export interface IOrganizationResponse {
    data: IOrganization;
}

export type GetOrganizationsQuery = IMetaQuery;

export type CreateAdminOrganizationParam = {
    id?: string;
    name: string;
    tagline?: string;
    goal?: number;
    wig_goal_date?: string;
    logo?: File;
};

export type UpdateOrganizationLogoParam = {
    logo: File;
};

export type UpdateOrganizationParam = {
    name: string;
    tagline?: string;
    goal?: number;
    wig_goal_date?: string;
};

export type UpdateOrganizationLeadManagementParam = {
    lead_management_steps: number;
    lead_management_step1_actions?: string[];
    lead_management_step2_actions?: string[];
    lead_management_step3_actions?: string[];
};

export type UpdateOrganizationCoachAssessmentParam = {
    coaching_assessment_frequency: number;
    coaching_assessment_data?: string[];
};
