import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from ".";
import { CreateFormContactFieldParam, IFormContactField, IFormContactFieldsResponse } from "../../interfaces/form-contact-fields.interface";

export interface FormContactFields {
	getFormContactFields: GetFormContactFields;
	createFormContactField: CreateFormContactField;
}

export type GetFormContactFields = LoadingResult & {
	data?: IFormContactFieldsResponse;
}

export type CreateFormContactField = LoadingResult & {
	data?: IFormContactField;
}

export type CreateFormContactFieldRequestActionPayload = PayloadAction<CreateFormContactFieldParam>;