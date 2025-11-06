import httpClient from "../../clients/httpClient";
import { CreateSalesAgreementParam } from "../../interfaces/sales-agreements.interface";

export const getGymSalesAgreementsRequest = (query: any) => {
    return httpClient.get(`/api/v1/gyms/${query.id}/sales-agreements`, {
        params: query,
    });
};

export const getOrganizationSalesAgreementsRequest = (query: any) => {
    return httpClient.get(`/api/v1/organization/sales-agreements`, {
        params: query,
    });
};

export const getSalesAgreementsRequest = (gym_id?: number) => {
    return httpClient.get(`/api/v1/sales-agreements/options/${gym_id || ''}`);
};

export const createSalesAgreementRequest = (body: any) => {
    return httpClient.post(`/api/v1/sales-agreements`, body);
};

export const updateSalesAgreementRequest = ( body: CreateSalesAgreementParam) => {
    return httpClient.patch(`/api/v1/sales-agreements/${body.sales_agreement_id}`, body);
};

export const deleteSalesAgreementRequest = (body: any) => {
    return httpClient.delete(`/api/v1/sales-agreements/${body.sales_agreement_id}`);
};
