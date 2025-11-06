import * as Yup from "yup";

export const CreateGroupScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    user_ids: Yup.array().min(1, "Please select a user"),
    gym_ids: Yup.array().min(1, "Please select a gym"),
});
