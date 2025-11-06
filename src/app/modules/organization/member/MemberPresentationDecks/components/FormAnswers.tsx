import { Fragment, useEffect } from "react";
import { mapDispatchToProps } from "../../../../../core/state/reducer/answers";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { IFormField } from "../../../../../core/interfaces/form-fields.interface";

interface Props {
    id: string;
}

const FormAnswers: React.FC<Props> = ({ id }) => {
    const { id: memberId } = useParams();

    const { getMemberPresentationDeckFormAnswers } = mapDispatchToProps();

    const { data, loading, success } = useSelector(
        (state: RootState) => state.answers.getMemberPresentationDeckFormAnswers
    );

    useEffect(() => {
        if (!!id && !!memberId) {
            getMemberPresentationDeckFormAnswers({
                id: id,
                member_id: memberId,
            });
        }
    }, [id]);

    const renderAnswer = (field: IFormField) => {
        if (field.attributes.type === "boolean") {
            return [1, "1", true, "Yes", "yes"].includes(
                field.relationships.answer.attributes.answer
            )
                ? "Yes"
                : "No";
        }

        return field.relationships.answer
            ? field.relationships.answer.attributes.answer
            : "No Answer";
    };

    return (
        <div className="w-full flex flex-col gap-y-2 pb-5 py-2 px-5 h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold text-secondary">
                Form Answers
            </h2>
            {data?.map((form) => {
                return (
                    <div className="flex flex-col" key={form.id}>
                        <h3 className="text-xl font-bold">
                            {form.attributes.description}
                        </h3>
                        <div className="flex flex-col px-5">
                            {form.relationships.form_fields.map((field) => {
                                return (
                                    <Fragment key={field.id}>
                                        <p>{field.attributes.label}</p>
                                        <p className="indent-5">
                                            {field.relationships.answer
                                                ? renderAnswer(field)
                                                : "No Answer"}
                                        </p>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FormAnswers;
