import httpClient from "../../clients/httpClient";
import { GetPermissionsByTypeQuery, SortPermissionsParam } from "../../interfaces/permissions.interface";

export const getAdminPermissionsByTypeRequest = (
    query: GetPermissionsByTypeQuery
) => {
    return httpClient.get(`/api/v1/admin/permissions/${query?.type}`, {
        params: query,
    });
};

export const sortPermissionsRequest = (
    type: string,
    body: SortPermissionsParam
) => {
    return httpClient.patch(`/api/v1/admin/permissions/sort/${type}`, body);
};