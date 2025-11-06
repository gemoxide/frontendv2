import { IMeta, IMetaQuery } from "./common.interface";

export interface IInvitation {
    type: string;
    id: any;
    attributes: {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        created_at: string;
        type?: string;
    };
    relationships: any;
}

export interface IInvitationResponse {
    data: IInvitation[];
    meta: IMeta;
}

export type GetInvitationsQuery = IMetaQuery;

export type CreateInvitationParam = {
    organization_id?: number| string;
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    gym_id?: string | number;
    role?: string;
};
