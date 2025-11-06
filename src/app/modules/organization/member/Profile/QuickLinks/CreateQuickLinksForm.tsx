import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/quick-links";
import { CreateQuickLinkScheme } from "../../../../../core/services/quick-links/quick-links.scheme";
import { IQuickLink } from "../../../../../core/interfaces/quick-links.interface";
import { useParams } from "react-router-dom";
import Textarea from "../../../../../core/components/Forms/TextArea";
import Input from "../../../../../core/components/Forms/Input";

type Props = {
    selectedQuickLink?: IQuickLink;
    organizationId?: number;
};

const CreateQuickLinkForm: React.FC<Props> = ({
    selectedQuickLink,
    organizationId,
}) => {
    const { createQuickLink, updateQuickLink } = mapDispatchToProps();

    const { loading: createNoteLoading } = useSelector(
        (state: RootState) => state.notes.createNote
    );

    const { loading: updateNoteLoading } = useSelector(
        (state: RootState) => state.notes.updateNote
    );

    const formik = useFormik({
        initialValues: {
            id: selectedQuickLink?.id,
            title: selectedQuickLink?.attributes?.title,
            description: selectedQuickLink?.attributes?.description,
            url: selectedQuickLink?.attributes?.url,
            organization_id:
                selectedQuickLink?.relationships?.organization?.id ||
                organizationId,
        },
        validationSchema: CreateQuickLinkScheme,
        onSubmit: async (values) => {
            if (organizationId) {
                if (values?.id)
                    updateQuickLink({
                        ...values,
                    });
                else
                    createQuickLink({
                        ...values,
                    });
            }
        },
    });

    const loading = createNoteLoading || updateNoteLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedQuickLink?.id
                            ? "Edit Quick Link"
                            : "Add Quick Link"}
                    </h1>
                    <Input
                        label="Create Title"
                        name="title"
                        placeHolder="Enter title"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="Enter URL"
                        name="url"
                        placeHolder="https://"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Textarea
                        label="Create description"
                        name="description"
                        placeHolder="Enter description about the form"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save Quick Link"
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

export default CreateQuickLinkForm;
