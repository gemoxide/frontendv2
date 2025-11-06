import httpClient from "../../clients/httpClient";
import {
    CreateOrganizationImportHistoryParam,
    GetOrganizationImportHistoryQuery,
} from "../../interfaces/organization-import-history.interface";

export const getOrganizationImportHistoryRequest = (
    query: GetOrganizationImportHistoryQuery
) => {
    return httpClient.get(`/api/v1/organization/imports?include=user`, {
        params: {
            page: query.page,
            per_page: query.per_page,
        },
    });
};

export const createOrganizationImportHistoryRequest = (
    body: CreateOrganizationImportHistoryParam
) => {
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("type", body.type);
    return httpClient.post(`/api/v1/organization/imports`, formData);
};
