import { PayloadAction } from "@reduxjs/toolkit";
import {
    IOrganizationImportHistoryResponse,
    GetOrganizationImportHistoryQuery,
    IOrganizationImportHistory,
    CreateOrganizationImportHistoryParam,
} from "../../interfaces/organization-import-history.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface OrganizationImportHistory {
    getOrganizationImportHistory: GetOrganizationImportHistories;
    createOrganizationImportHistory: CreateOrganizationImportHistory;
}

export type GetOrganizationImportHistories = LoadingResult & {
    data?: IOrganizationImportHistoryResponse;
};

export type GetOrganizationImportHistoryRequestActionPayload =
    PayloadAction<GetOrganizationImportHistoryQuery>;

export type CreateOrganizationImportHistory = LoadingResult & {
    data?: IOrganizationImportHistory;
};

export type CreateOrganizationImportHistoryRequestActionPayload =
    PayloadAction<CreateOrganizationImportHistoryParam>;

export type GetOrganizationImportHistory = LoadingResult & {
    data?: IOrganizationImportHistory;
};
