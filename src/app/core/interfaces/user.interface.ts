import { IMeta, IMetaQuery } from "./common.interface";
import { IGroup } from "./groups.interface";
import { IGym } from "./gyms.interface";
import { IOrganization } from "./organizations.interface";
import { IRole } from "./roles.interface";

export interface IUser {
    id: number;
    type: string;
    attributes: {
        first_name: string;
        last_name: string;
        nickname?: string;
        gender?: string;
        email: string;
        phone: string;
        timezone: string;
        avatar: string;
        type: string;
        active: boolean;
        dashboard_reports: string[];
        favorite_reports: string[];
    };
    relationships: {
        organization?: IOrganization;
        roles?: IRole[];
        user_gyms?: IGym[];
        groups?: IGroup[];
    };
}

export interface IImpersonateUserResponse {
    access_token: string;
    impersonated_user: IUser;
}

export interface IUsersResponse {
    data: IUser[];
    meta: IMeta;
}

export type GetUsersQuery = IMetaQuery & {
    organization?: string;
    gym_id?: string;
    role?: string;
};

export type CreateAdminUserParam = {
    organization_id?: number | string;
    type: string;
    first_name: string;
    last_name: string;
    gym_id?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    phone?: string;
    id?: string | number;
    roles?: any[];
    role?: string;
};

export type ChangePassword = {
    id?: any;
    password_confirmation: string;
    password?: string;
};
