import httpClient from "../../clients/httpClient";
import {
    CancelMemberSalesAgreementParam,
    CancelMemberSalesAgreementPayload,
    CreateMemberSalesAgreementParam,
    DeleteGetMemberSalesAgreementParam,
} from "../../interfaces/member-sales-agreement.interface";

export const getMemberSalesAgreementsRequest = (query: any) => {
    return httpClient.get(`/api/v1/members/${query.id}/sales-agreements`, {
        params: query,
    });
};

export const getMemberSalesAgreementRequest = (
    body: DeleteGetMemberSalesAgreementParam
) => {
    return httpClient.delete(
        `/api/v1/members/${body.member_id}/sales-agreements/${body.id}`
    );
};

export const createMemberSalesAgreementRequest = (
    body: CreateMemberSalesAgreementParam
) => {
    return httpClient.post(
        `/api/v1/members/${body.member_id}/sales-agreements`,
        body
    );
};

export const updateMemberSalesAgreementRequest = (
    body: CreateMemberSalesAgreementParam
) => {
    return httpClient.patch(
        `/api/v1/members/${body.member_id}/sales-agreements/${body.id}`,
        body
    );
};

export const deleteMemberSalesAgreementRequest = (
    body: DeleteGetMemberSalesAgreementParam
) => {
    return httpClient.delete(
        `/api/v1/members/${body.member_id}/sales-agreements/${body.id}`
    );
};

export const cancelMemberSalesAgreementRequest = (
    params: CancelMemberSalesAgreementParam,
    payload: CancelMemberSalesAgreementPayload
) => {
    return httpClient.patch(
        `/api/v1/members/${params.member_id}/sales-agreements/${params.id}/cancel`,
        payload
    );
};
