import { IMeta, IMetaQuery } from "./common.interface";
import { IPermissions } from "./permissions.interface";

export interface IRolesResponse {
    data: IRole[];
    meta: IMeta;
}
export interface IRole {
    id: any;
    type: string;
    attributes: IRolesAttributes;
    relationships: {
        permissions?: IPermissions[];
    };
}

export interface IRolesAttributes {
    type: string;
    name: string;
}

export type GetRolesQuery = IMetaQuery;

export type GetRolesByTypeQuery = IMetaQuery & {
    type: string;
};

export type CreateAdminRoleParam = {
    permissions?: number[];
    name: string;
    type: string;
    id?: string;
};
