import httpClient from "../../clients/httpClient";
import {
    GetFormsQuery,
    CreateFormParam,
    UpdateFormStatusParam,
} from "../../interfaces/forms.interface";

export const getFormsRequest = (query: GetFormsQuery) => {
    return httpClient.get("/api/v1/forms?include=users,gyms", {
        params: query,
    });
};

export const cloneFormRequest = (id: number) => {
	return httpClient.post(`/api/v1/forms/${id}/clone`);
};

export const createFormRequest = (body: CreateFormParam) => {
    return httpClient.post("/api/v1/forms", body);
};

export const deleteFormRequest = (id: number) => {
    return httpClient.delete(`/api/v1/forms/${id}`);
};

export const updateFormRequest = (body: CreateFormParam) => {
    return httpClient.patch(`/api/v1/forms/${body?.id}`, body);
};

export const getFormRequest = (id: number) => {
    return httpClient.get(`/api/v1/forms/${id}?include=fields,contact_field`);
};

export const updateAdminFormStatusRequest = (body: UpdateFormStatusParam) => {
	return httpClient.patch(`/api/v1/forms/${body.id}/activate-admin`, body);
};
