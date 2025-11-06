import { IMeta, IMetaQuery } from "./common.interface";
import { IUser } from "./user.interface";

export interface IUserNote {
    type: string;
    id: any;
    attributes: {
        note: string;
        name: string;
        created_at: string;
    };
    relationships: {
        user?: IUser;
        creator?: IUser;
    };
}

export interface IUserNoteResponse {
    data: IUserNote[];
    meta: IMeta;
}

export type GetUserNotesQuery = {
    user_id: string;
    query: IMetaQuery;
};

export type CreateUserNoteParam = {
    user_id?: string;
    id?: string;
    note?: string;
};
