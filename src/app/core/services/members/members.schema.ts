import * as Yup from "yup";

// const phoneRegExp = new RegExp("^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$");

export const CreateMemberSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required "),
    email_address: Yup.string()
        .email("Invalid email")
        .required("Email address is required."),
    sales_status: Yup.string().required("Sales status is required."),
    contact_status: Yup.string().required("Contact status is required."),
    gender: Yup.string().required("Gender is required."),
    lead_source: Yup.string().required("Lead source is required."),
    gym_id: Yup.number().required("Location is required."),
    cell_phone: Yup.string()
        .required("Cell phone number is required."),
    birthday: Yup.date().max(new Date(), 'Birthday must be on or before today').required("Birthday is required."),
});

export const CreateMemberFileSchema = Yup.object().shape({
    name: Yup.string().required("File name is required"),
    type: Yup.string().required("File type is required "),
    file: Yup.string().required("File to upload is required "),
});

export const CreateMemberLeadSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required "),
    gender: Yup.string().required("Gender is required."),
    cell_phone: Yup.string()
        .required("Cell phone number is required."),
    email_address: Yup.string()
        .email("Invalid email")
        .required("Email address is required."),
    lead_acquired_at: Yup.string().required("Lead acquired at is required."),
    lead_source: Yup.string().required("Lead source is required."),
    gym_id: Yup.number().required("Location is required."),
    gym_tour_at: Yup.string().nullable(),
    birthday: Yup.date().max(new Date(), 'Birthday must be on or before today').required("Birthday is required."),
    contact_status: Yup.string().notRequired()
});
