import * as Yup from "yup";

export const CreateOrganizationScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
});

export const CoachingAssessmentUpdateScheme = Yup.object().shape({
    coaching_assessment_frequency: Yup.number().required(
        "Set the frequency of assessment forms in weeks"
    ),
});
