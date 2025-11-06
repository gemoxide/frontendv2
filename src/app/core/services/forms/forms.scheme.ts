import * as Yup from "yup";

export const CreateFormScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    is_active: Yup.boolean(),
});
