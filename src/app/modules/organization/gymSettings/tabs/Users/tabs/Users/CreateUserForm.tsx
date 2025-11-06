import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../../../core/components/Button/index";
import Input from "../../../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../../../core/state/reducer/invitations";
import { IInvitation } from "../../../../../../../core/interfaces/invitation.interface";
import Select from "../../../../../../../core/components/Forms/Select";
import { rolesDropdown } from "../../../../../../../core/constants/roles";
import { CreateInvitationScheme } from "../../../../../../../core/services/invitations/invitations.scheme";
import { mapDispatchToProps as mapDispatchToPropsGyms } from "../../../../../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchToPropsUsers } from "../../../../../../../core/state/reducer/users";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

type Props = {
    selectedUser?: IInvitation;
};

const CreateUserForm: React.FC<Props> = ({ selectedUser }) => {
    const { createInvitation } = mapDispatchToProps();
    const { updateUser } = mapDispatchToPropsUsers();
    const { id } = useParams();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const { loading: createInvitationLoading } = useSelector(
        (state: RootState) => state.invitations.createInvitation
    );

    const { loading: updateUserLoading } = useSelector(
        (state: RootState) => state.users.updateUser
    );

    const { getGyms } = mapDispatchToPropsGyms();

    const { loading: getGymsLoading, data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    useEffect(() => {
        getGyms({ per_page: 100, page: 1 });
    }, []);

    const gymsOptions = useMemo(() => {
        return getGymsData?.data?.map((gym) => {
            return {
                label: gym?.attributes.name,
                value: gym.id,
            };
        });
    }, [getGymsLoading]);

    const formik = useFormik({
        initialValues: {
            id: selectedUser?.id || "",
            first_name: selectedUser?.attributes?.first_name || "",
            last_name: selectedUser?.attributes?.last_name || "",
            email: selectedUser?.attributes?.email || "",

            role:
                selectedUser?.relationships?.roles?.[0]?.attributes?.name ?? "",
            gym_id: id ?? currentUser?.relationships?.user_gyms?.[0]?.id,
            type: selectedUser?.attributes.type ?? "",
        },
        validationSchema: CreateInvitationScheme,
        onSubmit: async (values) => {
            if (selectedUser?.id) updateUser(values);
            else createInvitation(values);
        },
    });

    const loading = createInvitationLoading || updateUserLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">Invite User</h1>
                    <Input
                        label="First Name"
                        name="first_name"
                        type="text"
                        placeHolder="First Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        type="text"
                        placeHolder="First Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="text"
                        placeHolder="Email"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />

                    <Select
                        label="Role"
                        name="role"
                        placeHolder="Select role"
                        autoComplete
                        variant="default"
                        options={rolesDropdown}
                    />

                    <Select
                        label="Gym (optional)"
                        name="gym_id"
                        placeHolder="Select Gym"
                        autoComplete
                        variant="default"
                        disabled
                        options={gymsOptions}
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

export default CreateUserForm;
