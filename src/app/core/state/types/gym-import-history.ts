import { PayloadAction } from "@reduxjs/toolkit";
import {
    IGymImportHistoryResponse,
    GetGymImportHistoryQuery,
    IGymImportHistory,
    CreateGymImportHistoryParam,
} from "../../interfaces/gym-import-history.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface GymImportHistory {
    getGymImportHistory: GetGymImportHistories;
    createGymImportHistory: CreateGymImportHistory;
}

export type GetGymImportHistories = LoadingResult & {
    data?: IGymImportHistoryResponse;
};

export type GetGymImportHistoryRequestActionPayload =
    PayloadAction<GetGymImportHistoryQuery>;

export type CreateGymImportHistory = LoadingResult & {
    data?: IGymImportHistory;
};

export type CreateGymImportHistoryRequestActionPayload =
    PayloadAction<CreateGymImportHistoryParam>;

export type GetGymImportHistory = LoadingResult & {
    data?: IGymImportHistory;
};
