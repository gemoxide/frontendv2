import { IOrganization } from "../../interfaces/organizations.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Organization {
    getOrganization: GetOrganization;
    updateOrganizationLogo: UpdateOrganizationLogo;
    updateOrganization: UpdateOrganization;
    updateOrganizationLeadManagement: UpdateOrganization;
    updateOrganizationCoachAssessment: UpdateOrganization;
}

export type GetOrganization = LoadingResult & {
    data?: IOrganization;
};

export type UpdateOrganizationLogo = LoadingResult & {
    data?: IOrganization;
};

export type UpdateOrganization = LoadingResult & {
    data?: IOrganization;
};

export type updateOrganizationLeadManagement = LoadingResult & {
    data?: IOrganization;
};
