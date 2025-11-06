import { IMeta, IMetaQuery } from "./common.interface";

export interface ISalesAgreement {
    type: string;
    id: number;
    attributes: {
        name: string;
        address: string;
        duration?: string;
        duration_frequency?: string;
        is_auto_renewal?: boolean;
        is_active: boolean;
        price: string;
        type: string;
        weekly_training_frequency?: number;
        agreement_value?: number;
        member_sales_agreements_count?: number;
        billing_type?: string;
        organization_id?: number;
        gym_id?: number;
    };
    relationships: any;
}

export interface ISalesAgreementResponse {
    data: ISalesAgreement[];
    meta: IMeta;
}

export interface IAllSalesAgreementResponse {
    data: ISalesAgreement[];
}

export type GetSalesAgreementQuery = IMetaQuery;

export type CreateSalesAgreementParam = {
    gym_id?: number;
    organization_id?: number;
    sales_agreement_id?: number;
    name: string;
    duration?: string;
    duration_frequency?: string;
    is_auto_renewal?: boolean;
    type: string;
    price?: any;
    billing_type?: string;
};
