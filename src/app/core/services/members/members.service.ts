import httpClient from "../../clients/httpClient";
import { downloadFile } from "../../helpers/download-file";
import {
    GetMembersQuery,
    CreateMemberParam,
    CreateMemberMediaParam,
    CreateMemberLeadParam,
    GetGymMembersQuery,
    UpdateMemberAvatarParam,
} from "../../interfaces/members.interface";
import { objectToFormData } from "../utils/utils.service";

export const getMembersRequest = (query: GetMembersQuery) => {
    return httpClient.get("/api/v1/members?include=gym,user", {
        params: query,
    });
};

export const getGymMembersRequest = (query: GetGymMembersQuery) => {
    return httpClient.get("/api/v1/members/gym", {
        params: query,
    });
};

export const exportMembersRequest = (query: GetMembersQuery) => {
    return downloadFile(
        "/api/v1/members/export",
        `${query.member_type === "members" ? "Members" : "Leads"}.xlsx`,
        query
    );
};

export const createMemberRequest = (body: CreateMemberParam) => {
    return httpClient.post("/api/v1/members?include=gym", body);
};

export const deleteMemberRequest = (id: number) => {
    return httpClient.delete(`/api/v1/members/${id}`);
};

export const updateMemberRequest = (body: CreateMemberParam) => {
    return httpClient.patch(
        `/api/v1/members/${body?.id}?include=gym,user`,
        body
    );
};

export const updateMemberAvatarRequest = (payload: UpdateMemberAvatarParam) => {
    const formData = new FormData();
    formData.append("avatar", payload.file);
    return httpClient.post(
        `/api/v1/members/${payload?.id}/avatar?include=gym`,
        formData
    );
};

export const getMemberRequest = (id: number) => {
    return httpClient.get(`/api/v1/members/${id}?include=gym,user`);
};

export const createMemberFileRequest = (
    member_id: number,
    body: CreateMemberMediaParam
) => {
    const formData = objectToFormData(body);
    return httpClient.post(`/api/v1/members/${member_id}/files`, formData);
};

export const getMemberFileRequest = (member_id: number) => {
    return httpClient.get(`/api/v1/members/${member_id}/files`);
};

export const createMemberLeadRequest = (body: CreateMemberLeadParam) => {
    return httpClient.post("/api/v1/leads?include=gym", body);
};

export const updateMemberLeadRequest = (body: CreateMemberLeadParam) => {
    return httpClient.patch(`/api/v1/leads/${body.id}?include=gym`, body);
};
