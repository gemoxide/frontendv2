import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../core/state/reducer/invitations";
import { IInvitation } from "../../../../core/interfaces/invitation.interface";
import Select from "../../../../core/components/Forms/Select";
import { ROUTES } from "../../../../core/constants/routes";
import { CreateInvitationScheme } from "../../../../core/services/invitations/invitations.scheme";
import { mapDispatchToProps as mapDispatchToPropsGyms } from "../../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchToPropsUsers } from "../../../../core/state/reducer/users";
import { mapDispatchToProps as mapDispatchToPropsRoles } from "../../../../core/state/reducer/roles";
import { useEffect, useMemo } from "react";
import { confirmDeactivate } from "../../../../core/helpers/prompt";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { IUser } from "../../../../core/interfaces/user.interface";
import { genderDropdown } from "../../../../core/constants/gender";

type Props = {
    selectedUser?: IUser;
    clearSelectedUser: () => void;
};

const CreateUserForm: React.FC<Props> = ({
    selectedUser,
    clearSelectedUser,
}) => {
    const { createInvitation } = mapDispatchToProps();
    const { updateUser } = mapDispatchToPropsUsers();

    const navigate = useNavigate();

    const { loading: createInvitationLoading } = useSelector(
        (state: RootState) => state.invitations.createInvitation
    );

    const { loading: updateUserLoading } = useSelector(
        (state: RootState) => state.users.updateUser
    );

    const { getGyms } = mapDispatchToPropsGyms();
    const { getUserRoles } = mapDispatchToPropsRoles();
    const { deleteUser } = mapDispatchToPropsUsers();

    const { loading: getGymsLoading, data: getGymsData } = useSelector(
        (state: RootState) => state.gyms.getGyms
    );

    const { data: getUserRolesData } = useSelector(
        (state: RootState) => state.roles.getUserRoles
    );

    useEffect(() => {
        getGyms({ per_page: 100, page: 1 });
    }, []);

    useEffect(() => {
        getUserRoles({ per_page: 100, page: 1 });
    }, []);

    const rolesOptions = useMemo(() => {
        return (
            getUserRolesData?.data?.map((val) => {
                return {
                    label: val?.attributes?.name,
                    value: val?.id,
                };
            }) || []
        );
    }, [getUserRolesData]);

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
            gender: selectedUser?.attributes?.gender || "",
            nickname: selectedUser?.attributes?.nickname || "",
            role: selectedUser?.relationships?.roles?.[0]?.id || "",
            gym_id: selectedUser?.relationships?.user_gyms?.[0]?.id ?? "",
            type: selectedUser?.attributes.type ?? "user",
        },
        validationSchema: CreateInvitationScheme,
        onSubmit: async (values) => {
            const roles = [values?.role];
            if (selectedUser?.id) updateUser({ ...values, roles });
            toast.success("User updated successfully");
        },
    });

    useEffect(() => {
        if (selectedUser) {
            formik.setValues({
                id: selectedUser?.id || "",
                first_name: selectedUser?.attributes?.first_name || "",
                last_name: selectedUser?.attributes?.last_name || "",
                email: selectedUser?.attributes?.email || "",
                gender: selectedUser?.attributes?.gender || "",
                nickname: selectedUser?.attributes?.nickname || "",
                role: selectedUser?.relationships?.roles?.[0]?.id ?? "",
                gym_id: selectedUser?.relationships?.user_gyms?.[0]?.id ?? "",
                type: selectedUser?.attributes.type ?? "user",
            });
        }
    }, [selectedUser]);

    const handleDeactivate = async () => {
        const { isConfirmed } = await confirmDeactivate("User");
        if (isConfirmed) {
            if (selectedUser?.id) {
                deleteUser(selectedUser?.id);
                toast.success("User deactivated successfully");
                clearSelectedUser();
                navigate(ROUTES.USER.organizationSettings.key);
            }
        }
    };

    const loading = createInvitationLoading || updateUserLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">User Information</h1>
                    <Input
                        label="First Name"
                        name="first_name"
                        type="text"
                        placeHolder="First Name"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        type="text"
                        placeHolder="First Name"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        label="Nickname"
                        name="nickname"
                        type="text"
                        placeHolder="Nickname"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="text"
                        placeHolder="Email"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Select
                        label="Gender"
                        name="gender"
                        placeHolder="Select Gender"
                        autoComplete
                        variant="primary"
                        options={genderDropdown}
                    />
                    <Select
                        label="Gym Associated"
                        name="gym_id"
                        placeHolder="Corporate"
                        autoComplete
                        variant="primary"
                        options={gymsOptions}
                    />

                    <Select
                        label="Role"
                        name="roles"
                        placeHolder="Select role"
                        autoComplete
                        variant="primary"
                        options={rolesOptions}
                    />
                    <div className="py-4 flex justify-between items-stretch">
                        <Button
                            variant="danger"
                            label="Deactivate Account"
                            isSubmitting={loading}
                            className="flex-grow border-2 border-red-500 bg-white btn-md mr-4"
                            onClick={handleDeactivate}
                        />
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className="flex-grow btn-md"
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateUserForm;
