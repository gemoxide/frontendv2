import { PayloadAction } from "@reduxjs/toolkit";
import {
    ISalesAgreementResponse,
    GetSalesAgreementQuery,
    ISalesAgreement,
    CreateSalesAgreementParam,
    IAllSalesAgreementResponse,
} from "../../interfaces/sales-agreements.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface SalesAgreement {
    getGymSalesAgreements: GetSalesAgreements;
    getOrganizationSalesAgreements: GetSalesAgreements;
    getSalesAgreements: GetAllSalesAgreements;
    createSalesAgreement: CreateSalesAgreement;
    deleteSalesAgreement: DeleteSalesAgreement;
    updateSalesAgreement: UpdateSalesAgreement;
    
}

export type GetSalesAgreements = LoadingResult & {
    data?: ISalesAgreementResponse;
};

export type GetAllSalesAgreements = LoadingResult & {
    data?: IAllSalesAgreementResponse;
};

export type GetSalesAgreementRequestActionPayload = PayloadAction<GetSalesAgreementQuery>;

export type GetSalesAgreementsOptionsRequestActionPayload = PayloadAction<number | undefined>;

export type CreateSalesAgreement = LoadingResult & {
    data?: ISalesAgreement;
};

export type CreateSalesAgreementRequestActionPayload = PayloadAction<CreateSalesAgreementParam>;

export type UpdateSalesAgreement = LoadingResult & {
    data?: ISalesAgreement;
};

export type DeleteSalesAgreement = LoadingResult;
