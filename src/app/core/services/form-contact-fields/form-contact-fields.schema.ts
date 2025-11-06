import * as Yup from "yup";

export const CreateFormContactFieldScheme = Yup.object().shape({
    label: Yup.string().required("Field is required")
});
