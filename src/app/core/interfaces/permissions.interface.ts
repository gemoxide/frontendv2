import { IMeta, IMetaQuery } from "./common.interface";

export interface IPermissions {
    type: string;
    id: number;
    attributes: {
        type: string;
        name: string;
        description: string;
    };
}

export interface IPermissionsResponse {
    data: IPermissions[];
    meta: IMeta;
}

export type GetPermissionsQuery = IMetaQuery;

export type GetPermissionsByTypeQuery = IMetaQuery & {
    type: string;
};

export interface SortPermissionsParam {
    ids: number[];
}