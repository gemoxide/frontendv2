export interface LoadingResult {
    success: boolean;
    loading: boolean;
    error: boolean;
}

export interface IMeta {
    current_page: number;
    pages_total: number;
    per_page: number;
    results_total: number;
}

export type Tab = {
    tabElement?: React.ReactNode;
    name: string;
    component?: JSX.Element;
};

