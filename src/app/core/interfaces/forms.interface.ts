import { IMemberAnswer } from "./answers.interface";
import { IMeta, IMetaQuery } from "./common.interface";
import { IFormField } from "./form-fields.interface";

export interface IForm {
    type: string;
    id: any;
    attributes: {
        name: string;
        description: string;
        is_active: boolean;
        type: 'admin' | 'org' | 'gym';
        is_admin_active: boolean;
    };
    relationships: {
        form_fields: IFormField[]
    };
}

export interface IFormsResponse {
    data: IForm[];
    meta: IMeta;
}

export type GetFormsQuery = IMetaQuery & {
    is_active?: boolean;
    search?: string;
};

export type CreateFormParam = {
    id?: string;
    name: string;
    description: string;
    is_active?: boolean;
};

export interface IFormContactField {
    type: string;
    id: any;
    attributes: {
        label: string;
        field_name: string;
    }
}

export interface UpdateFormStatusParam {
    id?: any;
    is_active: boolean;
}