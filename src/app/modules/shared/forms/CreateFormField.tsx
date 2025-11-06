import { useMemo, useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../core/components/Button/index";
import Input from "../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/form-fields";
import { mapDispatchToProps as mapDispatchToContactFieldProps } from "../../../core/state/reducer/form-contact-fields";
import { IFormField } from "../../../core/interfaces/form-fields.interface";
import { CreateFormFieldScheme } from "../../../core/services/form-fields/form-fields.schema";
import Select from "../../../core/components/Forms/Select";
import Textarea from "../../../core/components/Forms/TextArea";
import Checkbox from "../../../core/components/Forms/CheckBox";
import { types } from "../../../core/constants/form-fields-type";
import { IFormContactField } from "../../../core/interfaces/form-contact-fields.interface";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes";

type Props = {
    selectedFormField?: IFormField;
    id: number;
    refetchFields: () => void;
};

const CreateFormField: React.FC<Props> = ({
    selectedFormField,
    id,
    refetchFields,
}) => {
    const navigate = useNavigate();

    const [showAddNewContactField, setShowAddNewContactField] = useState(false);
    const [contactFields, setContactFields] = useState<IFormContactField[]>([]);
    const [newContactField, setNewContactField] = useState("");

    const { createFormField, updateFormField } = mapDispatchToProps();
    const { createFormContactField, getFormContactFields } =
        mapDispatchToContactFieldProps();

    const { loading: createFormFieldLoading } = useSelector(
        (state: RootState) => state.formFields.createFormField
    );

    const { loading: updateFormFieldLoading } = useSelector(
        (state: RootState) => state.formFields.updateFormField
    );

    const {
        loading: getFormContactFieldsLoading,
        data: getFormContactFieldsData,
        success: getFormContactFieldsSuccess,
    } = useSelector(
        (state: RootState) => state.formContactFields.getFormContactFields
    );

    const {
        loading: createFormContactFieldsLoading,
        data: createFormContactFieldsData,
        success: createFormContactFieldsSuccess,
    } = useSelector(
        (state: RootState) => state.formContactFields.createFormContactField
    );

    const formik = useFormik({
        initialValues: {
            id: selectedFormField?.id || "",
            label: selectedFormField?.attributes?.label || "",
            type: selectedFormField?.attributes?.type || "",
            form_contact_field_id: selectedFormField?.relationships
                .form_contact_field
                ? selectedFormField?.relationships.form_contact_field.id
                : undefined,
            is_required: selectedFormField?.attributes.is_required || false,
        },
        enableReinitialize: true,
        validationSchema: CreateFormFieldScheme,
        onSubmit: async (values, { resetForm }) => {
            if (values?.id) updateFormField({ body: values, id });
            else createFormField({ body: values, id });
            refetchFields();
            resetForm();
        },
    });

    useEffect(() => {
        getFormContactFields();
    }, []);

    useEffect(() => {
        if (!createFormContactFieldsLoading && createFormContactFieldsSuccess) {
            getFormContactFields();
            formik.setValues({
                ...formik.values,
                form_contact_field_id: createFormContactFieldsData?.id || 0,
            });
            setShowAddNewContactField(false);
            setNewContactField("");
        }
    }, [createFormContactFieldsLoading]);

    useEffect(() => {
        if (!getFormContactFieldsLoading && getFormContactFieldsSuccess) {
            setContactFields([...(getFormContactFieldsData?.data || [])]);
        }
    }, [getFormContactFieldsLoading]);

    const contactFieldsOptions = useMemo(() => {
        return contactFields.map((field) => ({
            label: field.attributes.label,
            value: field.id,
        }));
    }, [contactFields]);

    const handleAddNewContactField = () => {
        if (showAddNewContactField) {
            if (newContactField && formik.values.type) {
                createFormContactField({
                    label: newContactField,
                    field_type: formik.values.type,
                });
            } else {
                setShowAddNewContactField(false);
            }
        } else {
            setShowAddNewContactField(true);
        }
    };

    useEffect(() => {
        const selectedContactField = contactFields.find(
            (field) =>
                field.id.toString() ===
                formik.values.form_contact_field_id?.toString()
        );
        if (selectedContactField) {
            formik.setFieldValue(
                "type",
                selectedContactField.attributes.field_type
            );
        }
    }, [formik.values.form_contact_field_id]);

    const loading = createFormFieldLoading || updateFormFieldLoading;

    return (
        <div className="w-full  h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-xl">Form Fields</h1>
                        <Button
                            label="Save"
                            onClick={() => navigate(ROUTES.USER.forms.key)}
                        />
                    </div>

                    <div className="flex w-full gap-x-4">
                        <div className="grow">
                            <Textarea
                                label="Label"
                                name="label"
                                placeHolder="Enter label about the field"
                                autoComplete
                                disabled={loading}
                                variant="primary"
                            />
                        </div>

                        <div className="flex flex-col gap-y-3 grow">
                            <Select
                                name="type"
                                label="Field Type"
                                options={types}
                                placeHolder="Select field type"
                                disabled={
                                    !!formik.values.form_contact_field_id &&
                                    !showAddNewContactField
                                }
                            />
                            {formik.values.type !== "header_separator" && (
                                <div className="flex gap-x-2">
                                    <div className="grow-[2]">
                                        {showAddNewContactField ? (
                                            <Input
                                                label="Member Field"
                                                name="label"
                                                isNotFormHook
                                                placeHolder="Member Field"
                                                autoComplete
                                                variant="primary"
                                                value={newContactField}
                                                onChange={(e) =>
                                                    setNewContactField(
                                                        e.currentTarget.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Select
                                                name="form_contact_field_id"
                                                label="Member Field (Optional)"
                                                options={contactFieldsOptions}
                                                placeHolder="Select member field"
                                            />
                                        )}
                                    </div>
                                    <div className="grow flex items-end">
                                        <Button
                                            variant="primary"
                                            label={
                                                showAddNewContactField
                                                    ? newContactField
                                                        ? "Save"
                                                        : "Cancel"
                                                    : "Add New"
                                            }
                                            className={"w-full btn-md"}
                                            isSubmitting={
                                                createFormContactFieldsLoading
                                            }
                                            onClick={handleAddNewContactField}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-2">
                        <Checkbox
                            name="is_required"
                            label={"The field is required"}
                            checked={formik?.values?.is_required}
                            onChange={(bool) =>
                                formik.setFieldValue("is_required", bool)
                            }
                        />
                    </div>
                    <div className="py-4 w-1/2">
                        <Button
                            variant="primary"
                            label={
                                selectedFormField?.id
                                    ? "Update Field"
                                    : "Add Field"
                            }
                            isSubmitting={loading || showAddNewContactField}
                            className={"w-full btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateFormField;
