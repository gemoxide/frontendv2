import { UpdateGym } from "./../state/types/gyms";
import { IMeta, IMetaQuery } from "./common.interface";

export interface IGymRevenue {
    type: string;
    id: any;
    attributes: {
        month_year: string;
        membership_revenue: string;
        pt_revenue: string;
        month: string;
        year: string;
        formatted_month_year: string;
        membership_count?: number;
        pt_count?: number;
    };
    relationships: any;
}

export interface IGymMonthlyWigTableProperties {
    wig_table: any;
    total_draft_revenue: number;
    columns: any;
}

export interface IGymMonthlyWigTable {
    data: IGymMonthlyWigTableData;
}

export interface IGymRevenueResponse {
    data: IGymRevenue[];
    meta: IMeta;
}

export interface IGymRevenueMonth {
    data: IGymRevenue;
}

export type GetGymRevenuesQuery = IMetaQuery & {
    gym_id?: string;
};

export type CreateGymRevenueParam = {
    id: string;
    gym_id?: string;
    month_year?: string;
    membership_revenue: string;
    pt_revenue: string;
};

export type UpdateGymRevenueParam = {
    id: string;
    gym_id?: string;
};

export type GetGymMonthRevenueParam = {
    gym_id?: string;
    month_year?: string;
};

export type IGymMonthlyWigData = {
    id?: string;
    gym_id?: string;
    month: string;
    membership_revenue: string;
    pt_revenue: string;
    membership_count: number;
    pt_count: number;
    month_year: string;
    year_month: string;
};

export type IGymMonthlyWig = {
    data?: IGymMonthlyWigData[];
};

export type IGymMonthlyWigTableData = {
    data?: IGymMonthlyWigTableProperties[];
};

type IMembershipGapAnalysis = {
    first_month?: number;
    last_month?: number;
    gap?: number;
    agreements_needed?: number;
    projected_new_member_draft?: number;
};

type IPersonalTrainingGapAnalysis = {
    first_month?: number;
    last_month?: number;
    gap?: number;
    agreements_needed?: number;
    projected_new_member_draft?: number;
};

export type IGapAnalysis = {
    data: {
        membership: IMembershipGapAnalysis;
        pt: IPersonalTrainingGapAnalysis;
        previous_month_year?: string;
        current_month_year?: string;
    };
};
