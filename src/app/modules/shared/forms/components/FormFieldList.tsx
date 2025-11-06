import { IFormField } from "../../../../core/interfaces/form-fields.interface";
import FormFieldRow from "./FormFieldRow";

interface Props {
    formFields: IFormField[];
    setSelectedFormField: (formField: IFormField) => void;
}

const FormFieldList: React.FC<Props> = ({
    formFields,
    setSelectedFormField,
}) => {
    return (
        <>
            <div className="w-full">
                {formFields?.map((formField, index: number) => (
                    <FormFieldRow
                        formField={formField}
                        index={index}
                        setSelectedFormField={setSelectedFormField}
                        key={formField.id}
                    />
                ))}
            </div>
        </>
    );
};

export default FormFieldList;
