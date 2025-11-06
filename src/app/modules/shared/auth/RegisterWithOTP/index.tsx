import { Form, FormikProvider, useFormik } from "formik";
import { ForgotPasswordSchema } from "../../../../core/services/auth/auth.schema";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import Link from "../../../../core/components/Link";

const RegisterWithOTP = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: ForgotPasswordSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2500);
        },
    });

    return (
        <div className="w-[350px] mx-auto ">
            <FormikProvider value={formik}>
                <Form className="space-y-4">
                    <div className="space-y-2 text-center">
                        <div className="text-2xl font-semibold ">
                            Register With OTP
                        </div>
                        <div>
                            OTP (One time password) has been sent to your mobile
                            number xxx-xxxx-xxx
                        </div>
                    </div>
                    <Input type="text" name="otpCode" placeHolder="OTP Code" />
                    <div className="text-center">
                        <Button label="Resend OTP" />
                    </div>
                    <div>
                        <Button
                            variant="secondary"
                            label="Verify Phone Number"
                            isSubmitting={formik.isSubmitting}
                            className={"w-full"}
                            type="submit"
                        />
                    </div>
                    <div className="text-center">
                        <Link label="Login via e-mail?" to="/" />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default RegisterWithOTP;
