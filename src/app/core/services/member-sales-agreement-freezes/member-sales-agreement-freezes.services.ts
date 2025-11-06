import httpClient from "../../clients/httpClient";
import { CreateMemberSalesAgreementFreezeParam, DeleteMemberSalesAgreementFreezeParam } from "../../interfaces/member-sales-agreement-freeze.interface";

export const createMemberSalesAgreementFreezeRequest = (body: CreateMemberSalesAgreementFreezeParam) => {
    return httpClient.post(`/api/v1/members/${body.member_id}/sales-agreements/${body.member_sales_agreement_id}/freeze`, body);
};

export const deleteMemberSalesAgreementFreezeRequest = (body: DeleteMemberSalesAgreementFreezeParam) => {
    return httpClient.delete(`/api/v1/members/${body.member_id}/sales-agreements/${body.member_sales_agreement_id}/freeze/${body.id}`);
};