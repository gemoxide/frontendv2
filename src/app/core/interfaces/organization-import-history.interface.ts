import { IMeta, IMetaQuery } from "./common.interface";

export interface IOrganizationImportHistory {
    type: string;
    id: any;
    attributes: {
        file_name: string;
        type: string;
        type_formatted: string;
        total_created: number;
        total_updated: number;
        date_uploaded: string;
    };
    relationships: any;
}

export interface IOrganizationImportHistoryResponse {
    data: IOrganizationImportHistory[];
    meta: IMeta;
}

export type GetOrganizationImportHistoryQuery = IMetaQuery & {
    organization_id?: number;
};

export type CreateOrganizationImportHistoryParam = {
    organization_id?: number;
    type: string;
    file: File;
};
