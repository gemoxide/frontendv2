import { IMeta, IMetaQuery } from "./common.interface";
import { IGroupAssessment } from "./group-assessments.interface";
import { IUser } from "./user.interface";

export interface INote {
    type: string;
    id: any;
    attributes: {
        note: string;
        name: string;
        created_at: string;
    };
    relationships: {
        user?: IUser;
        group_assessment?: IGroupAssessment;
    };
}

export interface INoteResponse {
    data: INote[];
    meta: IMeta;
}

export type GetNotesQuery = {
    member_id: string;
    query: IMetaQuery;
};

export type CreateNoteParam = {
    member_id?: string;
    id?: string;
    note?: string;
};
