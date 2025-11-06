import { Fragment } from "react";
import { IForm } from "../../../../../core/interfaces/forms.interface";
import Input from "../../../../../core/components/Forms/Input";
import Textarea from "../../../../../core/components/Forms/TextArea";
import Radio from "../../../../../core/components/Forms/Radio";

interface Props {
    form?: IForm;
    formik?: any;
}

const SlideForm: React.FC<Props> = ({ form, formik }) => {
    return (
        <>
            <h2 className="mb-5 font-semibold text-xl">
                {form?.attributes.description}
            </h2>
            {form?.relationships.form_fields.map((field, i) => {
                const field_name = field.relationships.form_contact_field
                    ? field.relationships.form_contact_field.attributes
                          .field_name
                    : field.attributes.label
                          .toLowerCase()
                          .replaceAll(" ", "_")
                          .replaceAll(",", "")
                          .replaceAll(".", "");

                return (
                    <Fragment key={i}>
                        {field.attributes.type === "header_separator" ? (
                            <div className="border-b-2 border-solid border-secondary my-3">
                                <h2 className="text-2xl">
                                    {field.attributes.label}
                                </h2>
                            </div>
                        ) : field.attributes.type === "text_area" ? (
                            <div className="my-5">
                                <Textarea
                                    label={field.attributes.label}
                                    name={field_name}
                                    value={formik.values[field_name]}
                                />
                            </div>
                        ) : field.attributes.type === "boolean" ? (
                            <div className="my-5">
                                <label className="text-sm text-secondary font-bold">
                                    {field.attributes.label}
                                </label>

                                <Radio
                                    name={field_name}
                                    options={[
                                        {
                                            label: "Yes",
                                            value: "Yes",
                                        },
                                        {
                                            label: "No",
                                            value: "No",
                                        },
                                    ]}
                                    isNotFormHook={false}
                                    value={formik.values[field_name]}
                                />
                            </div>
                        ) : (
                            <div className="my-5">
                                <Input
                                    label={field.attributes.label}
                                    name={field_name}
                                    value={formik.values[field_name]}
                                    type={
                                        field.attributes.type === "signature"
                                            ? "text"
                                            : (field.attributes.type as
                                                  | "number"
                                                  | "text"
                                                  | "email"
                                                  | "password"
                                                  | "date"
                                                  | "tel")
                                    }
                                    onValueChange={
                                        field.attributes.type === "tel"
                                            ? (value: string) =>
                                                  formik.setFieldValue(
                                                      field_name,
                                                      value
                                                  )
                                            : undefined
                                    }
                                />
                            </div>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};

export default SlideForm;
