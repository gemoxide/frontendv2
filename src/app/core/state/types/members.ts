import { PayloadAction } from "@reduxjs/toolkit";
import {
    IMembersResponse,
    GetMembersQuery,
    IMember,
    CreateMemberParam,
    CreateMemberMediaParam,
    CreateMemberLeadParam,
    GetGymMembersQuery,
    UpdateMemberAvatarParam,
} from "../../interfaces/members.interface";
import { LoadingResult } from "../../interfaces/common.interface";
import { IMedia } from "../../interfaces/media.interface";

export interface Members {
    getMembers: GetMembers;
    getGymMembers: GetMembers;
    createMember: GetMember;
    deleteMember: DeleteMember;
    updateMember: GetMember;
    getMember: GetMember;
    createMemberMedia: CreateMemberMedia;
    getMemberMedia: GetMemberMedia;
    createMemberLead: GetMember;
    updateMemberLead: GetMember;
    updateMemberAvatar: GetMember;
}

export type GetMembers = LoadingResult & {
    data?: IMembersResponse;
};

export type GetMembersRequestActionPayload = PayloadAction<GetMembersQuery>;

export type GetGymMembersRequestActionPayload =
    PayloadAction<GetGymMembersQuery>;

export type CreateMemberRequestActionPayload = PayloadAction<CreateMemberParam>;

export type UpdateMemberAvatarRequestActionPayload =
    PayloadAction<UpdateMemberAvatarParam>;

export type DeleteMember = LoadingResult;

export type GetMember = LoadingResult & {
    data?: IMember;
};

export type CreateMemberMediaRequestActionPayload = PayloadAction<{
    id: number;
    body: CreateMemberMediaParam;
}>;

export type CreateMemberMedia = LoadingResult & {
    data?: IMedia;
};

export type GetMemberMedia = LoadingResult & {
    data?: IMedia[];
};

export type CreateMemberLeadRequestActionPayload =
    PayloadAction<CreateMemberLeadParam>;
