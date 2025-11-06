import * as Yup from "yup";

export const CreateRoleSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    type: Yup.string().required("Type is required"),
});
