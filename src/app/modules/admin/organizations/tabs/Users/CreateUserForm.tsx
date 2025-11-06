import { Form, FormikProvider, useFormik } from "formik";
import {
    CreateUserSchema,
    UpdateUserSchema,
} from "../../../../../core/services/users/user.schema";
import Button from "../../../../../core/components/Button/index";
import Input from "../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import Select from "../../../../../core/components/Forms/Select";
import { useEffect, useMemo } from "react";
import { mapDispatchToProps } from "../../../../../core/state/reducer/admin-users";
import { mapDispatchToProps as mapDispatchToPropsOrg } from "../../../../../core/state/reducer/admin-organizations";
import { mapDispatchToProps as mapDispatchToPropsRoles } from "../../../../../core/state/reducer/admin-roles";
import { IUser } from "../../../../../core/interfaces/user.interface";
import { genderDropdown } from "../../../../../core/constants/gender";

type Props = {
    selectedUser?: IUser;
    organizationId?: string | number;
};

const CreateUserForm: React.FC<Props> = ({ selectedUser, organizationId }) => {
    const { createAdminUser, updateAdminUser } = mapDispatchToProps();
    const { getAdminOrganizations } = mapDispatchToPropsOrg();
    const { getAdminRolesByType } = mapDispatchToPropsRoles();

    const {
        data: getAdminOrganizationsData,
        loading: getAdminOrganizationsLoading,
    } = useSelector(
        (state: RootState) => state.adminOrganizations.getAdminOrganizations
    );

    const { loading: createAdminUserLoading } = useSelector(
        (state: RootState) => state.adminUsers.createAdminUser
    );

    const { loading: updateAdminUserLoading } = useSelector(
        (state: RootState) => state.adminUsers.updateAdminUser
    );

    const {
        loading: getAdminRolesByTypeLoading,
        data: getAdminRolesByTypeData,
    } = useSelector((state: RootState) => state.adminRoles.getAdminRolesByType);

    const formik = useFormik({
        initialValues: {
            id: selectedUser?.id || "",
            first_name: selectedUser?.attributes?.first_name || "",
            last_name: selectedUser?.attributes?.last_name || "",
            nickname: selectedUser?.attributes?.nickname || "",
            email: selectedUser?.attributes?.email || "",
            phone: selectedUser?.attributes?.phone || "",
            gender: selectedUser?.attributes.gender || "",
            roles: selectedUser?.relationships?.roles?.[0]?.id || "",
            organization_id: organizationId,
            type: "user",
            password: "",
            password_confirmation: "",
        },
        validationSchema: selectedUser ? UpdateUserSchema : CreateUserSchema,
        onSubmit: async (values) => {
            const roles = [];
            roles.push(values?.roles);
            const formData = {
                ...values,
                roles,
            };
            if (values?.id) {
                updateAdminUser(formData);
            } else createAdminUser(formData);
        },
    });

    useEffect(() => {
        getAdminOrganizations({ per_page: 100 });
        getAdminRolesByType({ per_page: 100, type: "user" });
    }, []);

    const orgOptions = useMemo(() => {
        return (
            getAdminOrganizationsData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getAdminOrganizationsData]);

    const rolesOptions = useMemo(() => {
        return (
            getAdminRolesByTypeData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []
        );
    }, [getAdminRolesByTypeData]);

    const loading =
        getAdminOrganizationsLoading ||
        createAdminUserLoading ||
        updateAdminUserLoading ||
        getAdminRolesByTypeLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedUser?.id ? "Update User" : "Create User"}
                    </h1>
                    <Input
                        label="First Name"
                        name="first_name"
                        type="text"
                        placeHolder="First name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        type="text"
                        placeHolder="Last name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Nickname"
                        name="nickname"
                        type="text"
                        placeHolder="Nickname"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeHolder="Email"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        placeHolder="Phone"
                        autoComplete
                        disabled={loading}
                        variant="default"
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
                        variant="default"
                        options={genderDropdown}
                    />
                    <Select
                        label="Role"
                        name="roles"
                        placeHolder="Select role"
                        autoComplete
                        disabled={loading}
                        variant="default"
                        options={rolesOptions}
                    />

                    {!selectedUser && (
                        <>
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
                                label="Password Confirmation"
                                name="password_confirmation"
                                type="password"
                                placeHolder="Password confirmation"
                                autoComplete
                                disabled={loading}
                                variant="default"
                            />
                        </>
                    )}

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
