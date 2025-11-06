import httpClient from "../../clients/httpClient";
import {
    GetOrganizationsQuery,
    CreateAdminOrganizationParam,
    UpdateOrganizationLogoParam,
    UpdateOrganizationParam,
    UpdateOrganizationLeadManagementParam,
    UpdateOrganizationCoachAssessmentParam,
} from "../../interfaces/organizations.interface";
import { objToFormData } from "../utils/utils.service";

export const getAdminOrganizationsRequest = (query: GetOrganizationsQuery) => {
    return httpClient.get("/api/v1/admin/organizations", {
        params: {
            ...query,
            search: query?.search ? query?.search : undefined,
        },
    });
};

export const getAdminOrganizationRequest = (query: GetOrganizationsQuery) => {
    return httpClient.get(`/api/v1/admin/organizations/${query.id}`, {
        params: {
            ...query,
            search: query?.search ? query?.search : undefined,
        },
    });
};

export const createAdminOrganizationRequest = (
    body: CreateAdminOrganizationParam
) => {
    const formData = objToFormData(body);
    return httpClient.post("/api/v1/admin/organizations", formData);
};

export const deleteAdminOrganizationRequest = (id: number) => {
    return httpClient.delete(`/api/v1/admin/organizations/${id}`);
};

export const updateAdminOrganizationRequest = (
    body: CreateAdminOrganizationParam
) => {
    return httpClient.patch(`/api/v1/admin/organizations/${body?.id}`, body);
};

export const updateAdminOrganizationLogoRequest = (body: any) => {
    const formData = objToFormData(body);
    return httpClient.post(`/api/v1/admin/organizations/${body?.id}`, formData);
};

export const getOrganizationRequest = () => {
    return httpClient.get("/api/v1/organization");
};

export const updateOrganizationLogoRequest = (
    body: UpdateOrganizationLogoParam
) => {
    const formData = objToFormData(body);
    return httpClient.post("/api/v1/organization/logo", formData);
};

export const updateOrganizationRequest = (body: UpdateOrganizationParam) => {
    return httpClient.patch("/api/v1/organization", body);
};

export const updateOrganizationLeadManagementRequest = (
    body: UpdateOrganizationLeadManagementParam
) => {
    return httpClient.patch("/api/v1/organization/lead-management", body);
};

export const updateOrganizationCoachAssessmentRequest = (
    body: UpdateOrganizationCoachAssessmentParam
) => {
    return httpClient.patch("/api/v1/organization/coaching-assessment", body);
};
