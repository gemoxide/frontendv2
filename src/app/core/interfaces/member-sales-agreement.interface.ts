import { IMeta } from "./common.interface";
import { IMemberSalesAgreementFreeze } from "./member-sales-agreement-freeze.interface";
import { IMember } from "./members.interface";
import { ISalesAgreement } from "./sales-agreements.interface";

export interface IMemberSalesAgreement {
    type: string;
    id: number;
    attributes: {
        status: string;
        start_date: string;
        end_date: string;
        is_canceled: boolean;
        canceled_at: string;
        canceled_reason: string;
    };
    relationships: {
        sales_agreement: ISalesAgreement;
        current_freeze: IMemberSalesAgreementFreeze;
        member: IMember;
    };
}

export interface IMemberSalesAgreementResponse {
    data: IMemberSalesAgreement[];
    meta: IMeta;
}

export interface CreateMemberSalesAgreementParam {
    member_id?: number;
    id?: number;
    sales_agreement_id?: number;
    start_date: string;
    end_date?: string;
    status?: string;
}

export interface DeleteGetMemberSalesAgreementParam {
    member_id: number;
    id: number;
}

export interface CancelMemberSalesAgreementParam {
    member_id: number;
    id: number;
}

export interface CancelMemberSalesAgreementPayload {
    canceled_reason: string;
    canceled_at: string;
}

export interface LatestMembership {
    agreement_type?: string;
    agreement_name?: string;
    agreement_price?: string;
    agreement_duration?: string;
    agreement_start?: string;
    agreement_end?: string;
    duration_freq?: string;
    wk_trn_freq?: string;
    agreement_value?: number;
    auto_renew?: string;
    agreement_active?: string;
}
