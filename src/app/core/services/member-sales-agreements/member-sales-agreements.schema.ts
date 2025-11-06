import * as Yup from "yup";

export const CreateMemberSalesAgreementScheme = Yup.object().shape({
    sales_agreement_id: Yup.number()
        .required("Sales agreement is required")
        .moreThan(0, "Sales agreement is required"),
    start_date: Yup.date().required("Start Date is required"),
    end_date: Yup.date()
        .min(Yup.ref("start_date"), "End Date must be after the start date")
        .required("End date is required"),
});

export const CancelMemberSalesAgreementScheme = Yup.object().shape({
    canceled_at: Yup.date().required("Canceled at is required"),
    canceled_reason: Yup.string().required("Canceled reason is required"),
});
