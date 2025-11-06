import * as Yup from "yup";

export const CreateSessionSchema = Yup.object().shape({
    user_id: Yup.number()
        .required("Coach is required")
        .min(1, "Coach is required"),
    session_at: Yup.date().required("Session date is required"),
    member_ids: Yup.array().of(Yup.string()),
});
