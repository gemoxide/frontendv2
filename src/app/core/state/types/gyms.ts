import { PayloadAction } from "@reduxjs/toolkit";
import {
    IGymResponse,
    GetGymsQuery,
    IGym,
    CreateGymParam,
    CreateGymDefaults,
    LeadMeasuresResponse,
    LeadMeasuresSandbox,
} from "../../interfaces/gyms.interface";
import { IMember } from "../../interfaces/members.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Gyms {
    getOrganizationGyms: GetGyms;
    getGyms: GetGyms;
    createGym: CreateGym;
    createOrganizationGym: CreateGym;
    deleteGym: DeleteGym;
    updateGym: UpdateGym;
    getGym: GetGym;
    updateDefaults: UpdateDefaults;
    updateWig: UpdateWig;
    leadMeasures: LeadMeasures;
    getMembersByGym: GetMembersByGym;
}

export type GetGyms = LoadingResult & {
    data?: IGymResponse;
};

export type GetGymsRequestActionPayload = PayloadAction<GetGymsQuery>;

export type GetLeadMeasuresRequestActionPayload =
    PayloadAction<LeadMeasuresSandbox>;

export type CreateGym = LoadingResult & {
    data?: IGym;
};

export type CreateGymRequestActionPayload = PayloadAction<CreateGymParam>;

export type UpdateGym = LoadingResult & {
    data?: IGym;
};

export type GetGym = LoadingResult & {
    data?: IGym;
};

export type DeleteGym = LoadingResult;

export type UpdateDefaultsRequestActionPayload =
    PayloadAction<CreateGymDefaults>;

export type UpdateDefaults = LoadingResult & {
    data?: IGym;
};

export type UpdateWig = LoadingResult & {
    data?: IGym;
};

export type LeadMeasures = LoadingResult & {
    data?: LeadMeasuresResponse;
};

export type GetMembersByGym = LoadingResult & {
    data?: IMember[];
};
