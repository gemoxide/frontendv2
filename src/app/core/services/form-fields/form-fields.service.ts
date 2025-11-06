import httpClient from "../../clients/httpClient";
import {
    GetFormFieldsQuery,
    CreateFormFieldParam,
    SortFormFieldsParam,
} from "../../interfaces/form-fields.interface";

export const getFormFieldsRequest = (id: number, query: GetFormFieldsQuery) => {
    return httpClient.get(
        `/api/v1/forms/${id}/fields?include=fields,contact_field`,
        {
            params: query,
        }
    );
};

export const createFormFieldRequest = (
    id: number,
    body: CreateFormFieldParam
) => {
    return httpClient.post(
        `/api/v1/forms/${id}/fields?include=fields,contact_field`,
        body
    );
};

export const deleteFormFieldRequest = (id: number, form_field_id: number) => {
    return httpClient.delete(`/api/v1/forms/${id}/fields/${form_field_id}`);
};

export const updateFormFieldRequest = (
    id: number,
    body: CreateFormFieldParam
) => {
    return httpClient.patch(
        `/api/v1/forms/${id}/fields/${body.id}?include=fields,contact_field`,
        body
    );
};

export const getFormFieldRequest = (id: number, form_field_id: number) => {
    return httpClient.get(
        `/api/v1/forms/${id}/fields/${form_field_id}?include=fields,contact_field`
    );
};

export const sortFormFieldsRequest = (
    id: number,
    body: SortFormFieldsParam
) => {
    return httpClient.patch(`/api/v1/forms/${id}/fields/sort`, body);
};
