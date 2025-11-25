import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import Select from "../../../core/components/Forms/Select";
import { useEffect, useMemo } from "react";
import { mapDispatchToProps } from "../../../core/state/reducer/admin-users";
import { mapDispatchToProps as mapDispatchToPropsOrg } from "../../../core/state/reducer/admin-organizations";
import { mapDispatchToProps as mapDispatchToPropsRoles } from "../../../core/state/reducer/admin-roles";
import { IUser } from "../../../core/interfaces/user.interface";

type Props = {
  selectedUser?: IUser;
};
const CreateUserForm: React.FC<Props> = ({ selectedUser }) => {
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

  const { loading: getAdminRolesByTypeLoading, data: getAdminRolesByTypeData } =
    useSelector((state: RootState) => state.adminRoles.getAdminRolesByType);

  const formik = useFormik({
    initialValues: {
      id: selectedUser?.id || "",
      name: selectedUser?.attributes?.name || "",
      email: selectedUser?.attributes?.email || "",
      mobile: selectedUser?.attributes?.mobile || "",
      role: selectedUser?.attributes?.role || "",
      password: "",
      password_confirmation: "",
      roles: selectedUser?.relationships?.roles?.[0]?.id || "",
    },
    // validationSchema: selectedUser ? UpdateUserSchema : CreateUserSchema,
    onSubmit: async (values) => {
      const roles = [];
      roles.push(values?.roles);
      if (values?.id)
        updateAdminUser({
          ...values,
          roles,
          type: "user",
        });
      else
        createAdminUser({
          ...values,
          roles,
          type: "user",
        });
    },
  });

  useEffect(() => {
    getAdminOrganizations({ per_page: 100 });
  }, []);

  useEffect(() => {
    if (selectedUser?.relationships?.roles?.[0]) {
      const roleType = selectedUser.relationships.roles[0].attributes?.type;

      if (roleType) {
        formik.setFieldValue("role", roleType);
        // Fetch roles for the role type
        getAdminRolesByType({ per_page: 100, type: roleType });
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    if (formik?.values?.role)
      getAdminRolesByType({ per_page: 100, type: formik?.values?.role });
  }, [formik?.values?.role]);

  const rolesOptions = useMemo(() => {
    return (
      getAdminRolesByTypeData?.data?.map((val) => {
        return { label: val?.attributes?.name, value: val?.id };
      }) || []
    );
  }, [getAdminRolesByTypeData]);

  // Set the role ID once roles are loaded
  useEffect(() => {
    if (
      selectedUser?.relationships?.roles?.[0]?.id &&
      rolesOptions.length > 0
    ) {
      const roleId = selectedUser.relationships.roles[0].id;
      // Only update if the current value doesn't match
      if (formik.values.roles !== roleId) {
        formik.setFieldValue("roles", roleId);
      }
    }
  }, [rolesOptions, selectedUser]);

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
            label="Name"
            name="name"
            type="text"
            placeHolder="Name"
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
            label="Mobile"
            name="mobile"
            type="tel"
            placeHolder="Mobile"
            autoComplete
            disabled={loading}
            variant="default"
            value={formik.values.mobile}
            onValueChange={(val) => formik.setFieldValue("mobile", val)}
          />
          <Select
            label="Type"
            name="role"
            placeHolder="Select a type"
            autoComplete
            disabled={loading || selectedUser?.id !== undefined}
            variant="default"
            options={[
              {
                value: "user",
                label: "User",
              },
              {
                value: "admin",
                label: "Admin",
              },
            ]}
          />
          <Select
            label="Role"
            name="roles"
            placeHolder="Select role"
            autoComplete
            disabled={loading || !formik?.values?.role}
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
