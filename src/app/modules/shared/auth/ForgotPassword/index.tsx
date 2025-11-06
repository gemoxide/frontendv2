import { Form, FormikProvider, useFormik } from "formik";
import { ForgotPasswordSchema } from "../../../../core/services/auth/auth.schema";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";

const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: ForgotPasswordSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
        },
    });

    return (
        <div className="w-[350px] mx-auto ">
            <FormikProvider value={formik}>
                <Form className="space-y-4">
                    <div className="space-y-2">
                        <div className="text-2xl font-semibold ">
                            Forgot Password
                        </div>
                        <div>Please provide required details</div>
                    </div>
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeHolder="Email Address"
                    />
                    <div>
                        <Button
                            type="submit"
                            label="Submit"
                            isSubmitting={formik.isSubmitting}
                            className={"w-full"}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default ForgotPassword;
