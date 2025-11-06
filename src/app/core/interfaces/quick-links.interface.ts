import { IMeta, IMetaQuery } from "./common.interface";
import { IOrganization } from "./organizations.interface";

export interface IQuickLink {
    type: string;
    id: any;
    attributes: {
        title: string;
        url: string;
        description: string;
        created_at: string;
    };
    relationships: {
        organization?: IOrganization;
    };
}

export interface IQuickLinkResponse {
    data: IQuickLink[];
    meta: IMeta;
}

export type GetQuickLinksQuery = {
    organization_id: string;
    query: IMetaQuery;
};

export type CreateQuickLinkParam = {
    id?: string;
    title?: string;
    url?: string;
    description?: string;
    organization_id?: string;
};
