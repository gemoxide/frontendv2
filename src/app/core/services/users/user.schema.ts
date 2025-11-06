import * as Yup from "yup";

// export const phoneRegExp =
//     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const CreateUserSchema = Yup.object().shape({
    organization_id: Yup.string().when("type", {
        is: "user",
        then: Yup.string().required("Type is required."),
        otherwise: Yup.string(),
    }),
    type: Yup.string().required("Type is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string().min(6).max(16).required("Password is required."),
    password_confirmation: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
    gender: Yup.string().required("Gender is required"),
    nickname: Yup.string().notRequired(),
    roles: Yup.string().required("Role is required"),
});


export const UpdateUserSchema = Yup.object().shape({
    organization_id: Yup.string().when("type", {
        is: "user",
        then: Yup.string().required("Type is required."),
        otherwise: Yup.string(),
    }),
    type: Yup.string().required("Type is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required."),
    gender: Yup.string().required("Gender is required"),
    nickname: Yup.string().notRequired(),
    roles: Yup.string().required("Role is required"),
});
