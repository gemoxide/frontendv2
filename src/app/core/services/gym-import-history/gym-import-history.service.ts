import httpClient from "../../clients/httpClient";
import {
    CreateGymImportHistoryParam,
    GetGymImportHistoryQuery,
} from "../../interfaces/gym-import-history.interface";

export const getGymImportHistoryRequest = (query: GetGymImportHistoryQuery) => {
    return httpClient.get(
        `/api/v1/gyms/${query?.gym_id}/imports?include=gym,user`,
        {
            params: {
                ...query,
            },
        }
    );
};

export const createGymImportHistoryRequest = (
    body: CreateGymImportHistoryParam
) => {
    const formData = new FormData();
    formData.append("file", body.file);
    formData.append("type", body.type);
    return httpClient.post(`/api/v1/gyms/${body.gym_id}/imports`, formData);
};
