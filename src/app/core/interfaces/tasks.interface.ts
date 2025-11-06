import { IMeta, IMetaQuery } from "./common.interface";
import { IMember } from "./members.interface";
import { IUser } from "./user.interface";

export interface ITask {
    type: string;
    id: any;
    attributes: {
        name: string;
        created_type: string;
        type: string;
        description?: string;
        notes?: string;
        priority: string;
        created_at: string;
        completed_at?: string;
        due_at: string;
    };
    relationships: {
        member?: IMember;
        user?: IUser;
    };
}

export interface ITasksResponse {
    data: ITask[];
    meta: IMeta;
}

export type GetTasksQuery = IMetaQuery & {
    user?: string;
    priority?: string;
    type?: string;
    status?: string;
};

export type CreateTaskParam = {
    id?: any;
    name: string;
    type: string;
    created_type: string;
    description?: string;
    notes?: string;
    priority: string;
    due_at: string;
    member_id: any;
    user_id: any;
};

export type UpdateCompleteTask = {
    id?: any;
    time_zone?: string;
};
