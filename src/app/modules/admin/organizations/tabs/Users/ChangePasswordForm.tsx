import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import Input from "../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { IInvitation } from "../../../../../core/interfaces/invitation.interface";
import { ChangePasswordSchema } from "../../../../../core/services/invitations/invitations.scheme";
import { changePassword } from "../../../../../core/services/users/users.service";

type Props = {
    selectedUser?: IInvitation;
    modalClose: () => void;
};

const ChangePasswordForm: React.FC<Props> = ({ selectedUser, modalClose }) => {
    const { loading: createInvitationLoading } = useSelector(
        (state: RootState) => state.invitations.createInvitation
    );

    const { loading: updateUserLoading } = useSelector(
        (state: RootState) => state.users.updateUser
    );

    const formik = useFormik({
        initialValues: {
            id: selectedUser?.id || "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: async (values) => {
            const result = await changePassword({
                password: values.password,
                password_confirmation: values.password_confirmation,
                id: selectedUser?.id,
            });

            if (result.data) {
                modalClose();
            }
        },
    });

    const loading = createInvitationLoading || updateUserLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">Change Password</h1>
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeHolder="Password"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Confirmed Password"
                        name="password_confirmation"
                        type="password"
                        placeHolder="Confirmed Password"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className={"w-full btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default ChangePasswordForm;
