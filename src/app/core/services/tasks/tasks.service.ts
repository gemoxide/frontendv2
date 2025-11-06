import httpClient from "../../clients/httpClient";
import {
    GetTasksQuery,
    CreateTaskParam,
    UpdateCompleteTask,
} from "../../interfaces/tasks.interface";

export const getTasksRequest = (query: GetTasksQuery) => {
    return httpClient.get("/api/v1/tasks?include=user,member,gym", {
        params: query,
    });
};

export const createTaskRequest = (body: CreateTaskParam) => {
    return httpClient.post("/api/v1/tasks?include=user,member,gym", body);
};

export const deleteTaskRequest = (id: number) => {
    return httpClient.delete(`/api/v1/tasks/${id}?include=user,member,gym`);
};

export const updateTaskRequest = (body: CreateTaskParam) => {
    return httpClient.patch(
        `/api/v1/tasks/${body?.id}?include=user,member,gym`,
        body
    );
};

export const getTaskRequest = (id: number) => {
    return httpClient.get(`/api/v1/tasks/${id}?include=user,member,gym`);
};

export const updateCompleteTaskRequest = (body: UpdateCompleteTask) => {
    return httpClient.patch(
        `/api/v1/tasks/${body?.id}/complete?include=user,member,gym`,
        body
    );
};

export const getMemberTasksRequest = (id: number, query: GetTasksQuery) => {
    return httpClient.get(
        `/api/v1/tasks/member/${id}?include=user,member,gym`,
        {
            params: query,
        }
    );
};
