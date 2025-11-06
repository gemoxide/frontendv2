import { PayloadAction } from "@reduxjs/toolkit";
import {
    IOrganizationResponse,
    GetOrganizationsQuery,
    IOrganization,
    CreateAdminOrganizationParam,
    UpdateOrganizationLogoParam,
    UpdateOrganizationLeadManagementParam,
    UpdateOrganizationCoachAssessmentParam,
    IOrganizationsResponse,
} from "../../interfaces/organizations.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface AdminOrganizations {
    getAdminOrganization: GetAdminOrganization;
    getAdminOrganizations: GetAdminOrganizations;
    createAdminOrganization: CreateAdminOrganization;
    updateAdminOrganization: UpdateAdminOrganization;
    deleteAdminOrganization: DeleteAdminOrganization;
}

export type GetAdminOrganization = LoadingResult & {
    data?: IOrganizationResponse;
};

export type GetAdminOrganizations = LoadingResult & {
    data?: IOrganizationsResponse;
};

export type GetAdminOrganizationsRequestActionPayload =
    PayloadAction<GetOrganizationsQuery>;

export type CreateAdminOrganization = LoadingResult & {
    data?: IOrganization;
};

export type UpdateAdminOrganization = LoadingResult & {
    data?: IOrganization;
};

export type DeleteAdminOrganization = LoadingResult;

export type CreateAdminOrganizationRequestActionPayload =
    PayloadAction<CreateAdminOrganizationParam>;

export type UpdateOrganizationLogoRequestActionPayload =
    PayloadAction<UpdateOrganizationLogoParam>;

export type UpdateOrganizationLeadManagementParamRequestActionPayload =
    PayloadAction<UpdateOrganizationLeadManagementParam>;

export type UpdateOrganizationCoachAssessmentParamRequestActionPayload =
    PayloadAction<UpdateOrganizationCoachAssessmentParam>;
