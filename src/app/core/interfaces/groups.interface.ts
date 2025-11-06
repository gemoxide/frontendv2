import { IMeta, IMetaQuery } from "./common.interface";
import { IGym } from "./gyms.interface";
import { IUser } from "./user.interface";

export interface IGroup {
    type: string;
    id: any;
    attributes: {
        name: string;
    };
    relationships: {
        users?: IUser[];
        gyms?: IGym[];
    };
}

export interface IGroupsResponse {
    data: IGroup[];
    meta: IMeta;
}

export type GetGroupsQuery = IMetaQuery;

export type CreateGroupParam = {
    id?: string;
    name: string;
    user_ids?: string[];
    gym_ids?: string[];
};
