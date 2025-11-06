import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import Input from "../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/members";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import FileUpload from "../../../../../core/components/FileUpload";
import File from "../../../../../core/components/File";
import { CreateMemberFileSchema } from "../../../../../core/services/members/members.schema";
import CustomErrorText from "../../../../../core/components/Forms/CustomErrorText";
import Select from "../../../../../core/components/Forms/Select";
import { MEMBER_FILE_TYPE } from "../../../../../core/constants/member-files";

const CreateNoteForm: React.FC = () => {
    const { id } = useParams();
    const { createMemberFile } = mapDispatchToProps();

    const { loading: createMemberMediaLoading } = useSelector(
        (state: RootState) => state.members.createMemberMedia
    );

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            file: "" as unknown as File,
        },
        validationSchema: CreateMemberFileSchema,
        onSubmit: async (values) => {
            if (id && values) {
                createMemberFile({ id: parseInt(id), body: values });
            }
        },
    });

    const loading = createMemberMediaLoading;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles?.[0];
        if (file) formik.setFieldValue("file", file);
    }, []);

    return (
        <div className="w-full md:w-[32rem] h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">Upload file</h1>
                    <Input
                        label="File name"
                        name="name"
                        placeHolder="Enter File Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Select
                        name="type"
                        label="Type"
                        placeHolder="Select File Type"
                        options={MEMBER_FILE_TYPE}
                    />
                    <FileUpload onDrop={onDrop} />
                    {formik?.values?.file?.name && (
                        <File
                            fileName={formik?.values?.file?.name}
                            onClickRemove={() =>
                                formik.setFieldValue("file", undefined)
                            }
                        />
                    )}

                    <CustomErrorText error={formik?.errors?.file} />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Upload File"
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

export default CreateNoteForm;
