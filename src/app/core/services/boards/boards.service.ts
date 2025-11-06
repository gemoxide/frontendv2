import httpClient from "../../clients/httpClient";
import { CreateBoardParam } from "../../interfaces/boards.interface";
import { IMetaQuery } from "../../interfaces/common.interface";
import { GetGymsQuery, CreateGymParam } from "../../interfaces/gyms.interface";


export const getBoardsRequest = (query: IMetaQuery) => {
    return httpClient.get("/api/v1/digital-boards", {
        params: query,
    });
};

export const createBoardRequest = (body: CreateBoardParam) => {
    return httpClient.post("/api/v1/digital-boards", body);
};

export const deleteBoardRequest = (id: number) => {
    return httpClient.delete(`/api/v1/digital-boards/${id}`);
};

export const updateBoardRequest = (body: CreateBoardParam) => {
    return httpClient.post(`/api/v1/digital-boards/${body?.id}`, body);
};

export const getBoardRequest = (id: number) => {
    return httpClient.get(`/api/v1/digital-boards/${id}`);
};
