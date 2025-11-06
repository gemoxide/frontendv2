import httpClient from "../../clients/httpClient";
import {
    GetInvitationsQuery,
    CreateInvitationParam,
} from "../../interfaces/invitation.interface";

export const getInvitationsRequest = (query: GetInvitationsQuery) => {
    return httpClient.get("/api/v1/invitations", {
        params: query,
    });
};


export const getOrganizationInvitedUsersRequest = (query: GetInvitationsQuery) => {
    return httpClient.get(`/api/v1/admin/organizations/${query.id}/invitations`, {
        params: query,
    });
};

export const createOrganizationInvitationRequest = (body: CreateInvitationParam) => {
    return httpClient.post(`/api/v1/admin/organizations/${body.organization_id}/invitations`, body);
};

export const resendOrganizationInvitationRequest = (id: number) => {
    return httpClient.post(`/api/v1/admin/invitations/${id}/resend`);
};

export const getGymsInvitationsRequest = (query: GetInvitationsQuery) => {
    return httpClient.get(`/api/v1/gyms/${query.id}/invitations`, {
        params: query,
    });
};

export const createInvitationRequest = (body: CreateInvitationParam) => {
    return httpClient.post("/api/v1/invitations", body);
};

export const deleteInvitationRequest = (id: number) => {
    return httpClient.delete(`/api/v1/invitations/${id}`);
};

export const updateInvitationRequest = (body: CreateInvitationParam) => {
    return httpClient.patch(`/api/v1/invitations/${body?.id}`, body);
};

export const resendInvitationRequest = (id: number) => {
    return httpClient.post(`/api/v1/invitations/${id}/resend`);
};
