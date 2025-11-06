import httpClient from "../../clients/httpClient";
import { IMetaQuery } from "../../interfaces/common.interface";
import { CreateQuickLinkParam } from "../../interfaces/quick-links.interface";

export const getQuickLinksRequest = (
    organization_id: string,
    query: IMetaQuery
) => {
    return httpClient.get(
        `/api/v1/organization/${organization_id}/quick-links`,
        {
            params: query,
        }
    );
};

export const createQuickLinkRequest = (body: CreateQuickLinkParam) => {
    return httpClient.post(
        `/api/v1/organization/${body?.organization_id}/quick-links`,
        body
    );
};

export const updateQuickLinkRequest = (body: CreateQuickLinkParam) => {
    return httpClient.patch(
        `/api/v1/organization/${body?.organization_id}/quick-links/${body.id}`,
        body
    );
};

export const deleteQuickLinkRequest = (organization_id: string, id: string) => {
    return httpClient.delete(
        `/api/v1/organization/${organization_id}/quick-links/${id}`
    );
};
