export interface IMemberSalesAgreementFreeze {
	type: string;
	id: number;
	attributes: {
		start_date: string;
		end_date: string;
		notes: string;
	}
}

export interface CreateMemberSalesAgreementFreezeParam {
	member_id: number;
	member_sales_agreement_id: number;
	start_date: string;
	end_date?: string;
	notes?: string;
}

export interface DeleteMemberSalesAgreementFreezeParam {
	id: number;
	member_id: number;
	member_sales_agreement_id: number;
}
