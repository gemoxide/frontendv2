import httpClient from "../../clients/httpClient";
// import { IMetaQuery } from "../../interfaces/common.interface";
import {
    CreateSessionParam,
    GetMemberSessionsQuery,
    UpdateMemberSessionParam,
    SessionQuery,
} from "../../interfaces/sessions.interface";

export const getSessionsRequest = (query: SessionQuery) => {
    return httpClient.get("/api/v1/sessions?include=coach", {
        params: query,
    });
};

export const getMemberSessionsRequest = (query: GetMemberSessionsQuery) => {
    return httpClient.get(
        `/api/v1/members/${query.member_id}/assessments?include=coach`,
        {
            params: query,
        }
    );
};

export const getSessionRequest = (id: string) => {
    return httpClient.get(`/api/v1/sessions/${id}?include=coach,members`);
};

export const createSessionRequest = (body: CreateSessionParam) => {
    return httpClient.post("/api/v1/sessions", body);
};

export const updateSessionRequest = (body: CreateSessionParam) => {
    return httpClient.patch(
        `/api/v1/sessions/${body.id}?include=coach,members`,
        body
    );
};

export const updateMemberSessionRequest = (body: UpdateMemberSessionParam) => {
    return httpClient.patch(
        `/api/v1/sessions/${body.session_id}/member/${body.member_id}?include=coach,members`,
        body
    );
};
