import { PayloadAction } from "@reduxjs/toolkit";
import {
    IFormsResponse,
    GetFormsQuery,
    IForm,
    CreateFormParam,
    UpdateFormStatusParam,
} from "../../interfaces/forms.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Forms {
    getForms: GetForms;
    createForm: GetForm;
    deleteForm: LoadingResult;
    updateForm: GetForm;
    updateAdminFormStatus: GetForm;
    getForm: GetForm;
    cloneForm: GetForm;
}

export type GetForms = LoadingResult & {
    data?: IFormsResponse;
};

export type GetFormsRequestActionPayload = PayloadAction<GetFormsQuery>;


export type CreateFormRequestActionPayload = PayloadAction<CreateFormParam>;

export type GetForm = LoadingResult & {
    data?: IForm;
};


export type UpdateFormStatusRequestActionPayload = PayloadAction<UpdateFormStatusParam>;