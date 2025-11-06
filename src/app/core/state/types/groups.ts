import { PayloadAction } from "@reduxjs/toolkit";
import {
    IGroupsResponse,
    GetGroupsQuery,
    IGroup,
    CreateGroupParam,
} from "../../interfaces/groups.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Groups {
    getGroups: GetGroups;
    createGroup: CreateGroup;
    deleteGroup: DeleteGroup;
    updateGroup: UpdateGroup;
}

export type GetGroups = LoadingResult & {
    data?: IGroupsResponse;
};

export type GetGroupsRequestActionPayload = PayloadAction<GetGroupsQuery>;

export type CreateGroup = LoadingResult & {
    data?: IGroup;
};

export type CreateGroupRequestActionPayload = PayloadAction<CreateGroupParam>;

export type UpdateGroup = LoadingResult & {
    data?: IGroup;
};

export type DeleteGroup = LoadingResult;
