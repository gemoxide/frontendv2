import { PayloadAction } from "@reduxjs/toolkit";
import { LoadingResult } from "../../interfaces/common.interface";
import { CreateMemberSalesAgreementFreezeParam, IMemberSalesAgreementFreeze } from "../../interfaces/member-sales-agreement-freeze.interface";


export interface MemberSalesAgreementFreeze {
	createMemberSalesAgreementFreeze: CreateMemberSalesAgreementFreeze;
	deleteMemberSalesAgreementFreeze: DeleteMemberSalesAgreementFreeze;
}

export type CreateMemberSalesAgreementFreeze = LoadingResult & {
	data?: IMemberSalesAgreementFreeze;
}

export type CreateMemberSalesAgreementFreezeRequestActionPayload = PayloadAction<CreateMemberSalesAgreementFreezeParam>;

export type DeleteMemberSalesAgreementFreeze = LoadingResult;