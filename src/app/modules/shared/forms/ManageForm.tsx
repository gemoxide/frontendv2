import { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import Section from "../../../core/components/Section";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/state/reducer";
import { mapDispatchToProps } from "../../../core/state/reducer/forms";
import { mapDispatchToProps as mapDispatchToPropsFormField } from "../../../core/state/reducer/form-fields";
import Loader from "../../../core/components/Loader";
import Input from "../../../core/components/Forms/Input";
import Textarea from "../../../core/components/Forms/TextArea";
import ToggleSwitch from "../../../core/components/Forms/ToggleSwitch";
import CreateFormField from "./CreateFormField";
import { IFormField } from "../../../core/interfaces/form-fields.interface";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import FormFieldList from "./components/FormFieldList";
import { IForm } from "../../../core/interfaces/forms.interface";

const UpdateForm: React.FC = () => {
    const { id } = useParams();
    const [selectedFormField, setSelectedFormField] = useState<any>();
    const [formFields, setFormFields] = useState<IFormField[]>([]);

    const { getForm, updateForm } = mapDispatchToProps();
    const { getFormFields, sortFormFields } = mapDispatchToPropsFormField();

    const {
        data: getFormFieldsData,
        loading: getFormFieldsLoading,
        success: getFormFieldsSuccess,
    } = useSelector((state: RootState) => state.formFields.getFormFields);

    const { loading: createFormFieldLoading, success: createFormFieldSuccess } =
        useSelector((state: RootState) => state.formFields.createFormField);

    const { loading: updateFormFieldLoading, success: updateFormFieldSuccess } =
        useSelector((state: RootState) => state.formFields.updateFormField);

    const { loading: deleteFormFieldLoading, success: deleteFormFieldSuccess } =
        useSelector((state: RootState) => state.formFields.deleteFormField);

    const { data: getFormData, loading: getFormLoading } = useSelector(
        (state: RootState) => state.forms.getForm
    );

    useEffect(() => {
        if (id) getForm(parseInt(id));
    }, []);

    useEffect(() => {
        if (!createFormFieldLoading && createFormFieldSuccess) {
            setSelectedFormField(undefined);
        }
    }, [createFormFieldLoading, createFormFieldSuccess]);

    useEffect(() => {
        if (!updateFormFieldLoading && updateFormFieldSuccess) {
            setSelectedFormField(undefined);
        }
    }, [updateFormFieldLoading, updateFormFieldSuccess]);

    useEffect(() => {
        if (!getFormFieldsLoading && getFormFieldsSuccess) {
            setFormFields(getFormFieldsData?.data || []);
        }
    }, [getFormFieldsLoading, getFormFieldsSuccess]);

    useEffect(() => {
        if (!deleteFormFieldLoading && deleteFormFieldSuccess) {
            fetch();
        }
    }, [deleteFormFieldLoading, deleteFormFieldSuccess]);

    useEffect(() => {
        if ((getFormFieldsData?.data || []).length > 0) {
            setFormFields(getFormFieldsData?.data || []);
        }
    }, [getFormFieldsData]);

    const fetch = async () => {
        if (id) {
            const parsedId = parseInt(id);
            getFormFields({ id: parsedId, query: { page: 1, per_page: 100 } });
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const reorder = (
        list: IFormField[],
        startIndex: number,
        endIndex: number
    ) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const formFieldsData = reorder(
            formFields,
            result.source.index,
            result.destination.index
        );

        setFormFields(formFieldsData);

        await sortFormFields({
            id: getFormData?.id,
            body: {
                ids: formFieldsData.map((field) => {
                    return field.id;
                }),
            },
        });
    };

    const isToggleForm = (selectedForm: IForm, is_active: boolean) => {
        const values = {
            id: selectedForm?.id || "",
            name: selectedForm?.attributes?.name || "",
            description: selectedForm?.attributes?.description || "",
            is_active: is_active,
        };
        updateForm(values);
    };

    return getFormLoading ? (
        <div className="flex items-center justify-center w-full h-[500px]">
            <Loader />
        </div>
    ) : (
        <Section title="Manage Form">
            <div className="w-full bg-white rounded-lg p-8 shadow-lg">
                <div className="w-1/2">
                    <h1 className="font-bold text-2xl">Form Information </h1>
                    <div className="mt-4">
                        <Input
                            label="Form Name"
                            name="name"
                            type="text"
                            placeHolder="Form name here"
                            autoComplete
                            disabled
                            variant="default"
                            isNotFormHook
                            value={getFormData?.attributes.name}
                        />
                    </div>
                    <div className="mt-4">
                        <Textarea
                            label="Form Description"
                            name="description"
                            placeHolder="Enter description about the form"
                            autoComplete
                            disabled
                            variant="default"
                            isNotFormHook
                            value={getFormData?.attributes.description}
                        />
                    </div>
                    <div className="mt-12">
                        <ToggleSwitch
                            label="Active"
                            isToggled={getFormData?.attributes.is_active}
                            onChange={() =>
                                getFormData &&
                                isToggleForm(
                                    getFormData,
                                    !getFormData?.attributes?.is_active
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-lg p-8 shadow-lg mt-4">
                {id && (
                    <CreateFormField
                        selectedFormField={selectedFormField}
                        id={parseInt(id)}
                        refetchFields={fetch}
                    />
                )}
                <div className="mt-8">
                    <table className="w-full">
                        <thead>
                            <tr className="grid grid-cols-12">
                                <th className="col-span-1"></th>
                                <th className="col-span-3 text-left">Label</th>
                                <th className="col-span-2 text-left">
                                    Field Type
                                </th>
                                <th className="col-span-3 text-left">
                                    Member Field
                                </th>
                                <th className="col-span-2 text-left">
                                    Field Is Required
                                </th>
                                <th className="col-span-1"></th>
                            </tr>
                        </thead>
                    </table>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="list" type="form-fields">
                            {(provided) => (
                                <div className="overflow-visible">
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <FormFieldList
                                            formFields={formFields}
                                            setSelectedFormField={
                                                setSelectedFormField
                                            }
                                        />
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </Section>
    );
};

export default UpdateForm;
