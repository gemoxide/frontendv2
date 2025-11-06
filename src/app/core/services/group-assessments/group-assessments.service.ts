import httpClient from "../../clients/httpClient";
import { IMetaQuery } from "../../interfaces/common.interface";
import {
    CreateGroupAssessmentParam,
    GetMemberGroupAssessmentsQuery,
    UpdateMemberAssessmentParam,
    DeleteGroupAssessmentParam,
    StartGroupAssessmentParam,
} from "../../interfaces/group-assessments.interface";

export const getGroupAssessmentsRequest = (query: IMetaQuery) => {
    return httpClient.get("/api/v1/group-assessments?include=coach", {
        params: query,
    });
};

export const getMemberGroupAssessmentsRequest = (
    query: GetMemberGroupAssessmentsQuery
) => {
    return httpClient.get(
        `/api/v1/members/${query.member_id}/assessments?include=coach`,
        {
            params: query,
        }
    );
};

export const getMemberLatestGroupAssessmentsRequest = (
    query: GetMemberGroupAssessmentsQuery
) => {
    return httpClient.get(
        `/api/v1/members/${query.member_id}/assessments/latest`
    );
};

export const getMemberProgressReportRequest = (id: string) => {
    return httpClient.get(`/api/v1/members/${id}/progress-report`);
};

export const getGroupAssessmentRequest = (id: string) => {
    return httpClient.get(
        `/api/v1/group-assessments/${id}?include=coach,members,presentationDeck`
    );
};

export const createGroupAssessmentRequest = (
    body: CreateGroupAssessmentParam
) => {
    return httpClient.post("/api/v1/group-assessments", body);
};

export const updateGroupAssessmentRequest = (
    body: CreateGroupAssessmentParam
) => {
    return httpClient.patch(
        `/api/v1/group-assessments/${body.id}?include=coach,members,presentationDeck`,
        body
    );
};

export const updateMemberAssessmentRequest = (
    body: UpdateMemberAssessmentParam
) => {
    return httpClient.patch(
        `/api/v1/group-assessments/${body.group_assessment_id}/member/${body.member_id}?include=coach,members,presentationDeck`,
        body
    );
};

export const deleteGroupAssessmentRequest = (
    body: DeleteGroupAssessmentParam
) => {
    return httpClient.delete(`/api/v1/group-assessments/${body.id}`);
};

export const startGroupAssessmentRequest = (
    body: StartGroupAssessmentParam
) => {
    return httpClient.post(`/api/v1/group-assessments/${body.id}/start`);
};
