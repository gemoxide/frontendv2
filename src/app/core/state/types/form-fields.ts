import { PayloadAction } from "@reduxjs/toolkit";
import {
    IFormFieldsResponse,
    GetFormFieldsQuery,
    IFormField,
    CreateFormFieldParam,
    SortFormFieldsParam,
} from "../../interfaces/form-fields.interface";
import { LoadingResult } from "../../interfaces/common.interface";
import { IForm } from "../../interfaces/forms.interface";

export interface FormFields {
    getFormFields: GetFormFields;
    createFormField: CreateFormField;
    deleteFormField: DeleteFormField;
    updateFormField: UpdateFormField;
    getFormField: GetFormField;
    sortFormFields: SortFormFields;
}

export type GetFormFields = LoadingResult & {
    data?: IFormFieldsResponse;
};

export type GetFormFieldsRequestActionPayload = PayloadAction<{
    id: number;
    query: GetFormFieldsQuery;
}>;

export type CreateFormField = LoadingResult & {
    data?: IFormField;
};

export type SortFormFields = LoadingResult & {
    data?: IForm
}

export type CreateFormFieldRequestActionPayload = PayloadAction<{
    id: number;
    body: CreateFormFieldParam;
}>;

export type UpdateFormField = LoadingResult & {
    data?: IFormField;
};

export type DeleteFormField = LoadingResult;

export type GetFormField = LoadingResult & {
    data?: IFormField;
};

export type DeleteFormFieldRequestActionPayload = PayloadAction<{
    id: number;
    form_field_id: number;
}>;

export type GetFormFieldRequestActionPayload = PayloadAction<{
    id: number;
    form_field_id: number;
}>;

export type UpdateFormFieldRequestActionPayload = PayloadAction<{
    id: number;
    body: CreateFormFieldParam;
}>;

export type SortFormFieldsRequestActionPayload = PayloadAction<{ id: number; body: SortFormFieldsParam }>