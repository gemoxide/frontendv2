import httpClient from "../../clients/httpClient";
import { IMetaQuery } from "../../interfaces/common.interface";
import { CreateUserNoteParam } from "../../interfaces/user-notes.interface";

export const getUserNotesRequest = (user_id: string, query: IMetaQuery) => {
    return httpClient.get(`/api/v1/notes/${user_id}?include=user`, {
        params: query,
    });
};

export const createUserNoteRequest = (body: CreateUserNoteParam) => {
    return httpClient.post(`/api/v1/notes/${body?.user_id}?include=user`, body);
};

export const updateUserNoteRequest = (body: CreateUserNoteParam) => {
    return httpClient.patch(
        `/api/v1/notes/${body?.user_id}/${body.id}?include=user`,
        body
    );
};

export const deleteUserNoteRequest = (user_id: string, id: string) => {
    return httpClient.delete(`/api/v1/notes/${user_id}/${id}?include=user`);
};
