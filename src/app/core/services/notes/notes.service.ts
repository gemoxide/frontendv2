import httpClient from "../../clients/httpClient";
import { IMetaQuery } from "../../interfaces/common.interface";
import { CreateNoteParam } from "../../interfaces/notes.interface";

export const getNotesRequest = (member_id: string, query: IMetaQuery) => {
    return httpClient.get(
        `/api/v1/members/${member_id}/notes?include=user,gym`,
        {
            params: query,
        }
    );
};

export const createNoteRequest = (body: CreateNoteParam) => {
    return httpClient.post(
        `/api/v1/members/${body?.member_id}/notes?include=user,gym`,
        body
    );
};

export const updateNoteRequest = (body: CreateNoteParam) => {
    return httpClient.patch(
        `/api/v1/members/${body?.member_id}/notes/${body.id}?include=user,gym`,
        body
    );
};

export const deleteNoteRequest = (member_id: string, id: string) => {
    return httpClient.delete(
        `/api/v1/members/${member_id}/notes/${id}?include=user,gym`
    );
};
