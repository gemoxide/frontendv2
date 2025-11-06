import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from ".";
import { IMetaQuery } from "../../interfaces/common.interface";
import {
    CreateGroupAssessmentParam,
    GetMemberGroupAssessmentsQuery,
    IGroupAssessment,
    IGroupAssessmentMember,
    IGroupAssessmentResponse,
    IProgressReport,
    IProgressReportResponse,
    UpdateMemberAssessmentParam,
} from "../../interfaces/group-assessments.interface";

export interface GroupAssessments {
    getGroupAssessments: GetGroupAssessments;
    getMemberGroupAssessments: GetGroupAssessments;
    getMemberLatestGroupAssessment: GetMemberLatestGroupAssessment;
    createGroupAssessment: CreateGroupAssessment;
    updateGroupAssessment: UpdateGroupAssessment;
    getGroupAssessment: GetGroupAssessment;
    updateMemberAssessment: UpdateMemberAssessment;
    getMemberProgressReport: GetMemberProgressReport;
    deleteGroupAssessment: DeleteGroupAssessment;
    startGroupAssessment: StartGroupAssessment;
}

export type GetGroupAssessments = LoadingResult & {
    data?: IGroupAssessmentResponse;
};

export type GetMemberLatestGroupAssessment = LoadingResult & {
    data?: IGroupAssessmentMember;
};

export type GetGroupAssessmentsRequestActionPayload = PayloadAction<IMetaQuery>;

export type GetMemberGroupAssessmentsRequestActionPayload =
    PayloadAction<GetMemberGroupAssessmentsQuery>;

export type CreateGroupAssessment = LoadingResult & {
    data?: IGroupAssessment;
};

export type GetMemberProgressReport = LoadingResult & {
    data?: IProgressReportResponse;
};

export type CreateGroupAssessmentRequestActionPayload =
    PayloadAction<CreateGroupAssessmentParam>;
export type UpdateMemberAssessmentRequestActionPayload =
    PayloadAction<UpdateMemberAssessmentParam>;

export type UpdateGroupAssessment = LoadingResult & {
    data?: IGroupAssessment;
};

export type GetGroupAssessment = LoadingResult & {
    data?: IGroupAssessment;
};

export type UpdateMemberAssessment = LoadingResult & {
    data?: IGroupAssessment;
};

export type DeleteGroupAssessment = LoadingResult;

export type StartGroupAssessment = LoadingResult;
