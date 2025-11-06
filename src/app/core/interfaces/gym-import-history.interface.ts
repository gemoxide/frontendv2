import { IMeta, IMetaQuery } from "./common.interface";

export interface IGymImportHistory {
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

export interface IGymImportHistoryResponse {
    data: IGymImportHistory[];
    meta: IMeta;
}

export type GetGymImportHistoryQuery = IMetaQuery & {
    gym_id?: number;
};

export type CreateGymImportHistoryParam = {
    gym_id?: number;
    type: string;
    file: File;
};
