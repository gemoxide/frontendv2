import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/auth";
import { RootState } from "../../../../core/state/reducer";
import { SetNewPasswordSchema } from "../../../../core/services/auth/auth.schema";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Security = () => {
    const { loading, success } = useSelector(
        (state: RootState) => state.auth.updateUserPassword
    );

    const { updateUserPassword, resetUpdateUserPassword } =
        mapDispatchToProps();

    const formik = useFormik({
        initialValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: SetNewPasswordSchema,
        onSubmit: async (values) => {
            updateUserPassword(values);
        },
    });

    useEffect(() => {
        if (!loading && success) {
            formik.resetForm();
            resetUpdateUserPassword();
            toast.success("Successfully updated account password");
        }
    }, [loading, success]);

    return (
        <div className="w-full bg-white   rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-extrabold text-secondary">Security</h1>
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full h-full mt-12">
                    <Input
                        label="Current Password"
                        name="current_password"
                        type="password"
                        disabled={loading}
                    />
                    <Input
                        label="New Password"
                        name="password"
                        type="password"
                        disabled={loading}
                    />
                    <Input
                        label="Confirm New Password"
                        name="password_confirmation"
                        type="password"
                        disabled={loading}
                    />
                    <div className="flex md:justify-end py-4 w-full">
                        <Button
                            isSubmitting={loading}
                            variant="primary"
                            label="Update Password"
                            className={"w-full lg:w-3/12 btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default Security;
