import { PayloadAction } from "@reduxjs/toolkit";
import {
    ITasksResponse,
    GetTasksQuery,
    ITask,
    CreateTaskParam,
    UpdateCompleteTask,
} from "../../interfaces/tasks.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Tasks {
    getTasks: GetTasks;
    createTask: CreateTask;
    deleteTask: DeleteTask;
    updateTask: UpdateTask;
    getTask: GetTask;
    updateCompleteTask: UpdateTask;
    getMemberTasks: GetTasks;
}

export type GetTasks = LoadingResult & {
    data?: ITasksResponse;
};

export type GetTasksRequestActionPayload = PayloadAction<GetTasksQuery>;

export type CreateTask = LoadingResult & {
    data?: ITask;
};

export type CreateTaskRequestActionPayload = PayloadAction<CreateTaskParam>;

export type UpdateTask = LoadingResult & {
    data?: ITask;
};

export type DeleteTask = LoadingResult;

export type GetTask = LoadingResult & {
    data?: ITask;
};

export type UpdateCompleteTaskRequestActionPayload =
    PayloadAction<UpdateCompleteTask>;

export type GetMemberTasksRequestActionPayload = PayloadAction<{
    id: number;
    query: GetTasksQuery;
}>;
