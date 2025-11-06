import httpClient from "../../clients/httpClient";
import {
    GetRolesQuery,
    CreateAdminRoleParam,
    GetRolesByTypeQuery,
} from "../../interfaces/roles.interface";

export const getAdminRolesRequest = (query: GetRolesQuery) => {
    return httpClient.get("/api/v1/admin/roles", {
        params: {
            ...query,
            search: query?.search ? query?.search : undefined,
        },
    });
};

export const createAdminRoleRequest = (body: CreateAdminRoleParam) => {
    return httpClient.post("/api/v1/admin/roles", body);
};

export const deleteAdminRoleRequest = (id: number) => {
    return httpClient.delete(`/api/v1/admin/roles/${id}`);
};

export const updateAdminRoleRequest = (body: CreateAdminRoleParam) => {
    return httpClient.patch(`/api/v1/admin/roles/${body?.id}`, body);
};

export const getAdminRolesByTypeRequest = (query: GetRolesByTypeQuery) => {
    return httpClient.get(`/api/v1/admin/roles/${query?.type}`, {
        params: query,
    });
};

export const getUserRolesRequest = (query: GetRolesQuery) => {
    return httpClient.get(`/api/v1/roles/`, {
        params: query,
    });
};
