import { Form, FormikProvider, useFormik } from "formik";
import { RegisterSchema } from "../../../../core/services/auth/auth.schema";
import Input from "../../../../core/components/Forms/Input";
import Link from "../../../../core/components/Link/index";
import Button from "../../../../core/components/Button/index";
import { useLocation, useNavigate } from "react-router-dom";
import { mapDispatchToProps } from "../../../../core/state/reducer/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import { useEffect } from "react";
import { ROUTES } from "../../../../core/constants/routes";
import { toast } from "react-toastify";
import Select from "../../../../core/components/Forms/Select";
import { genderDropdown } from "../../../../core/constants/gender";

const Register = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const firstName = searchParams.get("first_name");
    const lastName = searchParams.get("last_name");
    const { registerUser, resetRegisterUser } = mapDispatchToProps();

    const { loading, success } = useSelector(
        (state: RootState) => state.auth.registerUser
    );

    const formik = useFormik({
        initialValues: {
            first_name: firstName || "",
            last_name: lastName || "",
            nickname: "",
            email: email || "",
            gender: "",
            password: "",
            password_confirmation: "",
            token: token || "",
            phone: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            registerUser(values);
        },
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && success) {
            navigate(ROUTES.AUTH.login.key);
            resetRegisterUser();
            formik.resetForm();
            toast.success(
                "Successfully registered account. redirecting to login page..."
            );
        }
    }, [loading, success]);

    return (
        <div className="w-[350px] mx-auto ">
            <FormikProvider value={formik}>
                <Form className="space-y-4">
                    <div className="space-y-2 text-center">
                        <div className="text-2xl font-semibold ">
                            Account Setup
                        </div>
                        <div>Please provide required details</div>
                    </div>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        disabled={Boolean(email) || loading}
                        placeHolder="Email Address"
                        autoComplete
                    />
                    <Input
                        label="First Name"
                        type="text"
                        name="first_name"
                        disabled={Boolean(firstName) || loading}
                        placeHolder="First Name"
                        autoComplete
                    />
                    <Input
                        label="Last Name"
                        type="text"
                        name="last_name"
                        disabled={Boolean(lastName) || loading}
                        placeHolder="Last Name"
                        autoComplete
                    />
                    <Input
                        label="Nickname"
                        type="text"
                        name="nickname"
                        placeHolder="Nickname"
                        autoComplete
                    />
                    <Input
                        label="Phone"
                        type="tel"
                        name="phone"
                        placeHolder="Phone"
                        autoComplete
                        disabled={loading}
                        value={formik.values.phone}
                        onValueChange={(val) =>
                            formik.setFieldValue("phone", val)
                        }
                    />
                    <Select
                        label="Gender"
                        name="gender"
                        placeHolder="Select Gender"
                        autoComplete
                        variant="primary"
                        options={genderDropdown}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeHolder="Password"
                        autoComplete
                        disabled={loading}
                    />
                    <Input
                        label="Verify Password"
                        type="password"
                        name="password_confirmation"
                        placeHolder="Verify Password"
                        autoComplete
                        disabled={loading}
                    />
                    <div>
                        <Button
                            label="Register"
                            className={"w-full"}
                            isSubmitting={loading}
                            onClick={formik.submitForm}
                        />
                    </div>
                    <div className="text-center">
                        <span className="text-xs text-grey-secondary">
                            By signing up, you are agreeing to our
                        </span>
                        <br />
                        <Link
                            variant="primary"
                            to={"#"}
                            label="Privacy Policy and "
                        />
                        <Link
                            variant="primary"
                            to={"#"}
                            label="Terms of Use "
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default Register;
