import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/organizations";
import { RootState } from "../../../../core/state/reducer";
import { CreateOrganizationScheme } from "../../../../core/services/organizations/organizations.schema";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import ImageUpload from "../../../../core/components/ImageUpload";

const General = () => {
    const {
        loading: updateOrganizationLogoLoading,
        success: updateOrganizationLogoSuccess,
    } = useSelector(
        (state: RootState) => state.organizations.updateOrganizationLogo
    );

    const { data: getOrganizationData, loading: getOrganizationLoading } =
        useSelector((state: RootState) => state.organizations.getOrganization);

    const { loading: updateOrganizationLoading } = useSelector(
        (state: RootState) => state.organizations.updateOrganization
    );

    const {
        getOrganization,
        updateOrganizationLogo,
        resetUpdateOrganizationLogo,
        updateOrganization,
    } = mapDispatchToProps();

    useEffect(() => {
        getOrganization();
    }, []);

    const formik = useFormik({
        initialValues: {
            id: getOrganizationData?.id,
            name: getOrganizationData?.attributes?.name || "",
            tagline: getOrganizationData?.attributes?.tagline || "",
            logo: getOrganizationData?.attributes?.logo || "",
        },
        enableReinitialize: true,
        validationSchema: CreateOrganizationScheme,
        onSubmit: async (values) => {
            updateOrganization({
                name: values?.name,
                tagline: values?.tagline,
            });
        },
    });

    const loading =
        getOrganizationLoading ||
        updateOrganizationLogoLoading ||
        updateOrganizationLoading;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const logo = acceptedFiles?.[0];
        if (logo) {
            updateOrganizationLogo({ logo });
        }
    }, []);

    useEffect(() => {
        if (!updateOrganizationLogoLoading && updateOrganizationLogoSuccess) {
            resetUpdateOrganizationLogo();
            toast.success("Successfully updated organization logo");
        }
    }, [updateOrganizationLogoLoading, updateOrganizationLogoSuccess]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-extrabold text-secondary">Account</h1>
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full lg:w-3/4 h-full mt-12">
                    <ImageUpload
                        onDrop={onDrop}
                        src={formik?.values?.logo}
                        loading={updateOrganizationLogoLoading}
                    />
                    <Input
                        label="Organization Name"
                        name="name"
                        type="text"
                        placeHolder="Organization name"
                        autoComplete
                        disabled={loading}
                    />
                    <Input
                        label="Organization tagline"
                        name="tagline"
                        type="text"
                        placeHolder="Organization tagline"
                        autoComplete
                        disabled={loading}
                    />
                </Form>
                <hr className="mt-12" />
            </FormikProvider>
            <div className="flex md:justify-end py-4 w-full mt-4">
                <Button
                    isSubmitting={loading}
                    variant="primary"
                    label="Save Changes"
                    className={"w-full lg:w-3/12 btn-md"}
                    onClick={formik?.submitForm}
                />
            </div>
        </div>
    );
};

export default General;
