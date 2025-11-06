export interface LoadingResult {
    success: boolean;
    loading: boolean;
    error: boolean;
}

export interface IMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface IMetaQuery {
    id?: any;
    per_page?: number;
    page?: number;
    direction?: string;
    order_by?: string;
    search?: string;
    assessment_type_id?: string;
    assessment_mode_id?: string;
    user_id?: string;
    date_from?: string;
    date_to?: string;
}
