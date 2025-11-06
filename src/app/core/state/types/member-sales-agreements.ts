import { PayloadAction } from "@reduxjs/toolkit";
import { IMetaQuery, LoadingResult } from "../../interfaces/common.interface";
import {
    CancelMemberSalesAgreementParam,
    CreateMemberSalesAgreementParam,
    IMemberSalesAgreement,
    IMemberSalesAgreementResponse,
} from "../../interfaces/member-sales-agreement.interface";

export interface MemberSalesAgreement {
    getMemberSalesAgreements: GetMemberSalesAgreements;
    getMemberSalesAgreement: GetMemberSalesAgreement;
    createMemberSalesAgreement: CreateMemberSalesAgreement;
    deleteMemberSalesAgreement: DeleteMemberSalesAgreement;
    updateMemberSalesAgreement: UpdateMemberSalesAgreement;
    cancelMemberSalesAgreement: CancelMemberSalesAgreement;
}

export type GetMemberSalesAgreements = LoadingResult & {
    data?: IMemberSalesAgreementResponse;
};

export type GetMemberSalesAgreementsRequestActionPayload =
    PayloadAction<GetMemberSalesAgreementsQuery>;

export interface GetMemberSalesAgreementsQuery extends IMetaQuery {
    include: string;
}

export type CreateMemberSalesAgreement = LoadingResult & {
    data?: IMemberSalesAgreement;
};

export type CreateMemberSalesAgreementRequestActionPayload =
    PayloadAction<CreateMemberSalesAgreementParam>;

export type UpdateMemberSalesAgreement = LoadingResult & {
    data?: IMemberSalesAgreement;
};

export type GetMemberSalesAgreement = LoadingResult & {
    data?: IMemberSalesAgreement;
};

export type DeleteMemberSalesAgreement = LoadingResult;

export type CancelMemberSalesAgreement = LoadingResult;
