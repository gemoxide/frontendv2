import { IMemberAnswer } from "./answers.interface";
import { IMeta, IMetaQuery } from "./common.interface";
import { IFormContactField } from "./form-contact-fields.interface";

export interface IFormField {
    type: string;
    id: string;
    attributes: {
        label: string;
        type: string;
        type_parsed: string;
        order: number;
        is_required: boolean;
        contact_field: string;
    };
    relationships: {
        form_contact_field: IFormContactField;
        answer: IMemberAnswer;
    };
}

export interface IFormFieldsResponse {
    data: IFormField[];
    meta: IMeta;
}

export type GetFormFieldsQuery = IMetaQuery;

export type CreateFormFieldParam = {
    id?: string;
    label: string;
    type: string;
    form_contact_field_id?: number;
    is_required?: boolean;
};


export interface SortFormFieldsParam {
    ids: string[]
}