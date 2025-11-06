import { Draggable } from "@hello-pangea/dnd";
import { IFormField } from "../../../../core/interfaces/form-fields.interface";
import draggableIcon from "../../../../../../assets/icons/draggable-icon.svg";
import KebabDropdown from "../../../../core/components/KebabDropdown";
import { confirmDelete } from "../../../../core/helpers/prompt";
import { mapDispatchToProps } from "../../../../core/state/reducer/form-fields";
import { useParams } from "react-router-dom";
import { removeUnderScoreText } from "../../../../core/services/utils/utils.service";

interface Props {
    formField: IFormField;
    index: number;
    setSelectedFormField: (formField: IFormField) => void;
}

const FormFieldRow: React.FC<Props> = ({
    formField,
    index,
    setSelectedFormField,
}) => {
    const { deleteFormField } = mapDispatchToProps();
    const { id } = useParams();

    return (
        <Draggable draggableId={String(formField.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="grid grid-cols-12 mt-2 mb-2 py-1"
                    key={formField.id}
                >
                    <div className="col-span-1">
                        <img src={draggableIcon} />
                    </div>
                    <div className="col-span-3">
                        <p>
                            {formField?.attributes?.label.length >= 50
                                ? `${formField?.attributes?.label.substring(
                                      0,
                                      50
                                  )}...`
                                : formField?.attributes?.label}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p>{formField?.attributes?.type_parsed}</p>
                    </div>
                    <div className="col-span-3">
                        <p className="capitalize">
                            {formField?.relationships?.form_contact_field
                                    ?.attributes?.label || ""}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p>
                            {formField?.attributes?.is_required
                                ? "Required"
                                : ""}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <div className="w-full flex justify-end">
                            <KebabDropdown
                                placement="top"
                                lists={[
                                    {
                                        label: "Edit",
                                        action: () => {
                                            setSelectedFormField(formField);
                                        },
                                    },
                                    {
                                        label: "Delete",
                                        action: async () => {
                                            const { isConfirmed } =
                                                await confirmDelete("Form");
                                            if (isConfirmed && id) {
                                                const parsedId = parseInt(id);
                                                deleteFormField({
                                                    id: parsedId,
                                                    form_field_id: Number(
                                                        formField?.id
                                                    ),
                                                });
                                            }
                                        },
                                        isDanger: true,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default FormFieldRow;