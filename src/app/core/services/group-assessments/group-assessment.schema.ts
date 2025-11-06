import * as Yup from "yup";

export const CreateGroupAssessmentSchema = Yup.object().shape({
    assessment_type_id: Yup.string().required("Type is required"),
    assessment_mode_id: Yup.string().required("Mode is required"),
    user_id: Yup.number().required("Coach is required").min(1, "Coach is required"),
    training_focus_deck_id: Yup.string().nullable(),
    pre_assessment_deck_id: Yup.string().nullable(),
    post_assessment_deck_id: Yup.string().nullable(),
    assessment_at: Yup.date()
        .min(new Date(), "Assessment date must be on or after today")
        .required("Due date is required"),
    member_ids: Yup.array().of(Yup.string())
});
