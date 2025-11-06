import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/admin-organizations";
import { IOrganization } from "../../../core/interfaces/organizations.interface";
import { CreateOrganizationScheme } from "../../../core/services/organizations/organizations.schema";
import FileUpload from "../../../core/components/ImageUpload";
import { useCallback } from "react";

type Props = {
    selectedOrganization?: IOrganization;
};

const CreateUserForm: React.FC<Props> = ({ selectedOrganization }) => {
    const { createAdminOrganization, updateAdminOrganization } =
        mapDispatchToProps();

    const { loading: createAdminUserLoading } = useSelector(
        (state: RootState) => state.adminOrganizations.createAdminOrganization
    );

    const { loading: updateAdminOrganizationLoading } = useSelector(
        (state: RootState) => state.adminOrganizations.updateAdminOrganization
    );

    const formik = useFormik({
        initialValues: {
            id: selectedOrganization?.id || "",
            name: selectedOrganization?.attributes?.name || "",
            tagline: selectedOrganization?.attributes?.tagline || "",
            logo: selectedOrganization?.attributes?.logo || "",
        },
        validationSchema: CreateOrganizationScheme,
        onSubmit: async (values) => {
            let body = {
                ...values,
            };
            if (typeof body?.logo === "string") body.logo = undefined as any;
            if (body?.id) updateAdminOrganization(body as any);
            else createAdminOrganization(body as any);
        },
    });

    const loading = createAdminUserLoading || updateAdminOrganizationLoading;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles?.[0];
        if (file) formik.setFieldValue("logo", file);
    }, []);

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedOrganization?.id
                            ? "Update Organization"
                            : "Create Organization"}
                    </h1>
                    <div className="w-full  ">
                        <FileUpload
                            onDrop={onDrop}
                            src={formik?.values?.logo}
                        />
                    </div>
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
                        label="Tagline"
                        name="tagline"
                        type="text"
                        placeHolder="Tagline"
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

export default CreateUserForm;
