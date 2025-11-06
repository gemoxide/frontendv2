export interface IFormContactField {
    type: string;
    id: number;
    attributes: {
        label: string;
        field_name: string;
        field_type: string;
    }
}

export interface IFormContactFieldsResponse {
    data: IFormContactField[];
}

export type CreateFormContactFieldParam = {
    label: string;
    field_type: string;
}