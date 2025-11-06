import httpClient from "../../clients/httpClient";
import {
    CreateGymRevenueParam,
    UpdateGymRevenueParam,
    GetGymRevenuesQuery,
    GetGymMonthRevenueParam,
} from "../../interfaces/gym-revenue.interface";

export const getGymRevenuesRequest = (query: GetGymRevenuesQuery) => {
    return httpClient.get(`/api/v1/gyms/${query?.gym_id}/revenue?include=gym`, {
        params: {
            ...query,
        },
    });
};

export const createGymRevenueRequest = (body: CreateGymRevenueParam) => {
    return httpClient.post(`/api/v1/gyms/${body.gym_id}/revenue`, body);
};

export const deleteGymRevenueRequest = (body: UpdateGymRevenueParam) => {
    return httpClient.delete(`/api/v1/gyms/${body.gym_id}/revenue/${body.id}`);
};

export const updateGymRevenueRequest = (body: CreateGymRevenueParam) => {
    return httpClient.patch(
        `/api/v1/gyms/${body?.gym_id}/revenue/${body?.id}`,
        body
    );
};

export const getGymMonthRevenueRequest = (body: GetGymMonthRevenueParam) => {
    return httpClient.get(`/api/v1/gyms/${body?.gym_id}/revenue/month`, {
        params: {
            ...body,
        },
    });
};

export const getGymMonthlyWigRequest = (gym_id: number) => {
    return httpClient.get(`/api/v1/gyms/${gym_id}/revenue/wig`);
};

export const getGymMonthlyWigTableRequest = (gym_id: number) => {
    return httpClient.get(`/api/v1/gyms/${gym_id}/revenue/wig-table`);
};

export const getGymWigTotalDraftRequest = (gym_id: number) => {
    return httpClient.get(`/api/v1/gyms/${gym_id}/revenue/total-draft-revenue`);
};

export const getGapAnalysisRequest = (gym_id: number) => {
    return httpClient.get(`/api/v1/gyms/${gym_id}/revenue/wig-gap-analysis`);
};
