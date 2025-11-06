import httpClient from "../../clients/httpClient";
import {
    GetUsersQuery,
    CreateAdminUserParam,
    ChangePassword,
} from "../../interfaces/user.interface";

export const getAdminUsersRequest = (query: GetUsersQuery) => {
    return httpClient.get("/api/v1/admin/users?include=organization,roles", {
        params: {
            ...query,
            search: query?.search ? query?.search : undefined,
        },
    });
};

export const createAdminUserRequest = (body: CreateAdminUserParam) => {
    return httpClient.post("/api/v1/admin/users", body);
};

export const deleteAdminUserRequest = (id: number) => {
    return httpClient.delete(`/api/v1/admin/users/${id}`);
};

export const updateAdminUserRequest = (body: CreateAdminUserParam) => {
    return httpClient.patch(`/api/v1/admin/users/${body?.id}`, body);
};

export const getUsersRequest = (query: GetUsersQuery) => {
    return httpClient.get(
        "/api/v1/users?include=organization,roles,user_gyms",
        {
            params: {
                ...query,
                search: query?.search ? query?.search : undefined,
            },
        }
    );
};

export const getUserRequest = (id: number) => {
    return httpClient.get(
        `/api/v1/users/${id}/?include=organization,roles,user_gyms`
    );
};

export const getGymUsersRequest = (query: GetUsersQuery) => {
    return httpClient.get(
        `/api/v1/gyms/${query.gym_id}/users?include=organization,roles,user_gyms`,
        {
            params: {
                ...query,
                search: query?.search ? query?.search : undefined,
            },
        }
    );
};

export const createUserRequest = (body: CreateAdminUserParam) => {
    return httpClient.post("/api/v1/users", body);
};

export const deleteUserRequest = (id: number) => {
    return httpClient.delete(`/api/v1/users/${id}`);
};

export const updateUserRequest = (body: CreateAdminUserParam) => {
    return httpClient.patch(`/api/v1/users/${body?.id}`, body);
};

export const changePassword = (body: ChangePassword) => {
    return httpClient.patch(`/api/v1/users/${body?.id}/change-password`, body);
};

// Organization
export const getAdminOrganizationUsersRequest = (query: GetUsersQuery) => {
    return httpClient.get(
        `/api/v1/admin/organizations/${query?.id}/users?include=organization,roles`,
        {
            params: {
                ...query,
                search: query?.search ? query?.search : undefined,
            },
        }
    );
};
