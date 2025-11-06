import httpClient from "../../clients/httpClient";
import {
    GetGymsQuery,
    CreateGymParam,
    CreateGymDefaults,
    UpdateWigPayload,
    LeadMeasuresSandbox,
} from "../../interfaces/gyms.interface";

export const getOrganizationUsersGymsRequest = (query: GetGymsQuery) => {
    return httpClient.get(`/api/v1/admin/organizations/${query.id}/gyms`, {
        params: query,
    });
};

export const createOrganizationGymsRequest = (body: CreateGymParam) => {
    return httpClient.post(`/api/v1/admin/organizations/${body.id}/gyms`, body);
};

export const getGymsRequest = (query: GetGymsQuery) => {
    return httpClient.get("/api/v1/gyms", {
        params: query,
    });
};

export const createGymRequest = (body: CreateGymParam) => {
    return httpClient.post("/api/v1/gyms", body);
};

export const deleteGymRequest = (id: number) => {
    return httpClient.delete(`/api/v1/gyms/${id}`);
};

export const updateGymRequest = (body: CreateGymParam) => {
    return httpClient.patch(`/api/v1/gyms/${body?.id}`, body);
};

export const getGymRequest = (id: number) => {
    return httpClient.get(`/api/v1/gyms/${id}?include=organization`);
};

export const updateGymDefaults = (body: CreateGymDefaults) => {
    return httpClient.patch(`/api/v1/gyms/${body?.id}/defaults`, body);
};

export const updateWigRequest = (body: UpdateWigPayload) => {
    return httpClient.patch(`/api/v1/gyms/${body?.id}/wig`, body);
};

export const leadMeasuresRequest = (payload: LeadMeasuresSandbox) => {
    return httpClient.post(
        `/api/v1/gyms/${payload.gym_id}/lead-measures`,
        payload
    );
};

export const setLeadMeasuresAsSalesTrackerRequest = (gymId: number) => {
    return httpClient.patch(
        `/api/v1/gyms/${gymId}/lead-measures-as-sales-tracker`
    );
};

export const getMembersByGymIdRequest = () => {
    return httpClient.get(`/api/v1/members/all`);
};
