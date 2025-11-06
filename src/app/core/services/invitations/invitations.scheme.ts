import * as Yup from "yup";

export const CreateInvitationScheme = Yup.object().shape({
    first_name: Yup.string().required("First Name is required."),
    last_name: Yup.string().required("Last Name is required."),
    email: Yup.string().email("Invalid email").required("Email is required."),
    role: Yup.string().required("Role is required"),
});

export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    password_confirmation: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
