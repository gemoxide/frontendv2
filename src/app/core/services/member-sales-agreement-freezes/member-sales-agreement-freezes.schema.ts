import * as Yup from "yup";

export const createMemberSalesAgreementFreezeSchema = (agreement_start: Date, agreement_end: Date) => {
	return Yup.object().shape({
		member_sales_agreement_id: Yup.number().required("Sales agreement is required").moreThan(0, "Sales agreement is required"),
		start_date: Yup.date().min(agreement_start, "Freeze start date must be after the sales agreement start date").max(agreement_end, "Freeze start date must be before the sales agreement end date").required("Start Date is required"),
		end_date: Yup.date().min(Yup.ref('start_date'), "End Date must be after the start date").max(agreement_end, "Freeze end date must be before the sales agreement end date").required('End date is required')
	});
}
