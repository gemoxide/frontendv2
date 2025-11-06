import { PayloadAction } from "@reduxjs/toolkit";
import {
    IGymRevenueResponse,
    GetGymRevenuesQuery,
    IGymRevenue,
    CreateGymRevenueParam,
    GetGymMonthRevenueParam,
    IGymRevenueMonth,
    IGymMonthlyWig,
    IGymMonthlyWigTable,
    IGapAnalysis,
} from "../../interfaces/gym-revenue.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface GymRevenues {
    getGymRevenues: GetGymRevenues;
    createGymRevenue: CreateGymRevenue;
    deleteGymRevenue: DeleteGymRevenue;
    updateGymRevenue: UpdateGymRevenue;
    getGymMonthRevenue: GetGymMonthRevenue;
    getGymMonthlyWig: GetGymMonthlyWig;
    getGymMonthlyWigTable: GetGymMonthlyWigTable;
    getGapAnalysis: GetGapAnalysis;
}

export type GetGymRevenues = LoadingResult & {
    data?: IGymRevenueResponse;
};

export type GetGymRevenueRequestActionPayload =
    PayloadAction<GetGymRevenuesQuery>;

export type GetGymMonthRevenueRequestActionPayload =
    PayloadAction<GetGymMonthRevenueParam>;

export type CreateGymRevenue = LoadingResult & {
    data?: IGymRevenue;
};

export type CreateGymRequestActionPayload =
    PayloadAction<CreateGymRevenueParam>;

export type UpdateGymRevenue = LoadingResult & {
    data?: IGymRevenue;
};

export type GetGymRevenue = LoadingResult & {
    data?: IGymRevenue;
};

export type DeleteGymRevenue = LoadingResult;

export type GetGymMonthRevenue = LoadingResult & {
    data?: IGymRevenueMonth;
};

export type GetGymMonthlyWig = LoadingResult & {
    data?: IGymMonthlyWig;
};

export type GetGymMonthlyWigTable = LoadingResult & {
    data?: IGymMonthlyWigTable;
};

export type GetGapAnalysis = LoadingResult & {
    data?: IGapAnalysis;
};
