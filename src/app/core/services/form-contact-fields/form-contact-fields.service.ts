import httpClient from "../../clients/httpClient";
import { CreateFormContactFieldParam } from "../../interfaces/form-contact-fields.interface";

export const getFormContactFieldsRequest = () => {
    return httpClient.get(`/api/v1/form-contact-fields`);
};

export const createFormContactFieldRequest = (
    body: CreateFormContactFieldParam
) => {
    return httpClient.post(`/api/v1/form-contact-fields`, body);
};
