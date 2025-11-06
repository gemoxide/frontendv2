import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/forms";
import { IForm } from "../../../core/interfaces/forms.interface";
import { CreateFormScheme } from "../../../core/services/forms/forms.scheme";
import ToggleSwitch from "../../../core/components/Forms/ToggleSwitch";
import Textarea from "../../../core/components/Forms/TextArea";

type Props = {
    selectedForm?: IForm;
};

const CreateForm: React.FC<Props> = ({ selectedForm }) => {
    const { createForm, updateForm } = mapDispatchToProps();

    const { loading: createFormLoading } = useSelector(
        (state: RootState) => state.forms.createForm
    );

    const { loading: updateFormLoading } = useSelector(
        (state: RootState) => state.forms.updateForm
    );

    const formik = useFormik({
        initialValues: {
            id: selectedForm?.id || "",
            name: selectedForm?.attributes?.name || "",
            description: selectedForm?.attributes?.description || "",
            is_active: selectedForm?.attributes.is_active || false,
        },
        validationSchema: CreateFormScheme,
        onSubmit: async (values) => {
            if (values?.id) updateForm(values);
            else createForm(values);
        },
    });

    const loading = createFormLoading || updateFormLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedForm?.id ? "Update Form" : "Create Form"}
                    </h1>
                    <Input
                        label="Form Name"
                        name="name"
                        type="text"
                        placeHolder="Form name here"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Textarea
                        label="Form Description"
                        name="description"
                        placeHolder="Enter description about the form"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <ToggleSwitch
                        label="Active"
                        isToggled={formik.values.is_active}
                        onChange={(bool) =>
                            formik.setFieldValue("is_active", bool)
                        }
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

export default CreateForm;
