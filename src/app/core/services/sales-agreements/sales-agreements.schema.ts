import * as Yup from "yup";

export const CreateSalesAgreementSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
        .min(0, "Price cannot be negative")
        .required("Price is required"),
    duration: Yup.number()
        .min(1, "Duration must be at least 1")
        .required("Duration is required"),
    duration_frequency: Yup.string().required("Duration Frequency is required"),
    is_auto_renewal: Yup.boolean().required("Auto renewal is required"),
    is_active: Yup.boolean().required("Is Active is required"),
    type: Yup.string().required("Type is required"),
    weekly_training_frequency: Yup.number().min(
        1,
        "Weekly training frequency must be at least 1"
    ),
    billing_type: Yup.string().required("Billing Type is required"),
});
