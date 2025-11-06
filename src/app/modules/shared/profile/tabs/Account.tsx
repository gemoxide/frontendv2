import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../core/components/Button/index";
import Input from "../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/auth";
import { RootState } from "../../../../core/state/reducer";
import { UpdateUserScheme } from "../../../../core/services/auth/auth.schema";
import AvatarUpload from "../../../../core/components/AvatarUpload";
import Skeleton from "react-loading-skeleton";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Account = () => {
    const { data } = useSelector((state: RootState) => state.auth.user);
    const [uploadedFiles, setUploadedFiles] = useState<any>();

    const { loading: updateUserLoading } = useSelector(
        (state: RootState) => state.auth.updateUser
    );

    const {
        loading: updateUserAvatarLoading,
        success: updateUserAvatarSuccess,
    } = useSelector((state: RootState) => state.auth.updateUserAvatar);

    const { updateUser, updateUserAvatar, resetUpdateUserAvatar } =
        mapDispatchToProps();

    const formik = useFormik({
        initialValues: {
            email: data?.attributes?.email || "",
            first_name: data?.attributes?.first_name || "",
            last_name: data?.attributes?.last_name || "",
            phone: data?.attributes?.phone || "",
        },
        validationSchema: UpdateUserScheme,
        onSubmit: async (values) => {
            updateUser(values);
        },
    });

    const loading = updateUserLoading || updateUserAvatarLoading;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFiles(acceptedFiles);
        const avatarFile = acceptedFiles?.[0];
        if (avatarFile) updateUserAvatar({ file: avatarFile });
    }, []);

    useEffect(() => {
        if (!updateUserAvatarLoading && updateUserAvatarSuccess) {
            setUploadedFiles([]);
            resetUpdateUserAvatar();
            toast.success("Successfully updated account avatar");
        }
    }, [updateUserAvatarLoading, updateUserAvatarSuccess]);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-extrabold text-secondary">Account</h1>
            {updateUserAvatarLoading ? (
                <div className="h-46 flex mt-10">
                    <div className="mr-4">
                        <Skeleton height={300} width={250} />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Skeleton height={40} width={200} />
                        <Skeleton height={15} width={300} />
                        <Skeleton height={15} width={300} />
                    </div>
                </div>
            ) : (
                <AvatarUpload
                    onDrop={onDrop}
                    src={
                        uploadedFiles?.[0]
                            ? URL.createObjectURL(uploadedFiles?.[0])
                            : data?.attributes?.avatar
                    }
                />
            )}
            <FormikProvider value={formik}>
                <Form className="space-y-8 w-full h-full mt-12">
                    <Input
                        label="First name"
                        name="first_name"
                        type="text"
                        placeHolder="First name"
                        autoComplete
                        disabled={loading}
                    />
                    <Input
                        label="Last name"
                        name="last_name"
                        type="text"
                        placeHolder="Last name"
                        autoComplete
                        disabled={loading}
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        type="text"
                        placeHolder="Phone"
                        autoComplete
                        disabled={loading}
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        type="text"
                        placeHolder="Email address"
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

export default Account;
