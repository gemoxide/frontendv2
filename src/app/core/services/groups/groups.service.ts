import httpClient from "../../clients/httpClient";
import {
    GetGroupsQuery,
    CreateGroupParam,
} from "../../interfaces/groups.interface";

export const getGroupsRequest = (query: GetGroupsQuery) => {
    return httpClient.get("/api/v1/groups?include=users,gyms", {
        params: query,
    });
};

export const createGroupRequest = (body: CreateGroupParam) => {
    return httpClient.post("/api/v1/groups", body);
};

export const deleteGroupRequest = (id: number) => {
    return httpClient.delete(`/api/v1/groups/${id}`);
};

export const updateGroupRequest = (body: CreateGroupParam) => {
    return httpClient.patch(`/api/v1/groups/${body?.id}`, body);
};
