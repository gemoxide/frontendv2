import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().min(6).max(16).required("Password is required."),
});

export const TwoFASchema = Yup.object().shape({
  "2fa": Yup.string().required("Code is required."),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
});

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required."),
  last_name: Yup.string().required("Last name is required."),
  nickname: Yup.string().notRequired(),
  gender: Yup.string().required("Gender is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  phone: Yup.string().required("Phone number is required."),
  password: Yup.string().min(6).max(16).required("Password is required."),
  password_confirmation: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

export const UpdateUserScheme = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required."),
});

export const SetNewPasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Current password is required."),
  password: Yup.string().min(6).max(16).required("Password is required."),
  password_confirmation: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
