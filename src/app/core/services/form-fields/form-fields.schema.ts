import * as Yup from "yup";

export const CreateFormFieldScheme = Yup.object().shape({
    label: Yup.string().required("Label is required"),
    type: Yup.string().required("Type is required"),
    is_required: Yup.boolean(),
});
