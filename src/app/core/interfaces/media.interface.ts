import { IMeta, IMetaQuery } from "./common.interface";

export interface IMedia {
    type: string;
    id: number;
    attributes: {
        name: string;
        size: number;
        url: string;
    };
}

export interface IMediaResponse {
    data: IMedia[];
    meta: IMeta;
}

export type GetIMediaQuery = IMetaQuery;
