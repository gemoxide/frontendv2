import { Form, FormikProvider, useFormik } from "formik";
import { CoachingSchema } from "../../../../../../core/services/answers/answers.schema";
import Textarea from "../../../../../../core/components/Forms/TextArea";
import { RootState } from "../../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import Radio from "../../../../../../core/components/Forms/Radio";
import { GrowSlideProps } from ".";
import { mapNumberOptions } from "../../../../../../core/helpers/mapNumberOptions";
import Button from "../../../../../../core/components/Button";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/member-presentation-decks";
import Input from "../../../../../../core/components/Forms/Input";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Coaching: React.FC<GrowSlideProps> = ({
    memberPresentationDeck,
    isCurrent,
    updateCurrentSlide,
    setCurrentSlide,
}) => {
    const { createGrowPresentationAnswer } = mapDispatchToProps();
    const {
        loading,
        success: createGrowPresentationAnswerSuccess,
        error: createGrowPresentationAnswerError,
    } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.createGrowPresentationAnswer
    );

    const { data: getMemberData } = useSelector(
        (state: RootState) => state.members.getMember
    );

    const formik = useFormik({
        initialValues: {
            coaching_plan:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.coaching_plan || undefined,
            coaching_confidence:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.coaching_confidence || undefined,
            coaching_help:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.coaching_help || undefined,
        },
        validationSchema: CoachingSchema,
        onSubmit: async (values) => {
            createGrowPresentationAnswer({
                id: memberPresentationDeck.id,
                member_id: getMemberData?.id,
                payload: values,
            });
            setCurrentSlide((prev) => prev + 1);
        },
    });

    useEffect(() => {
        if (createGrowPresentationAnswerError) {
            toast.error("Something went wrong. Your answers were not saved.");
        }
    }, [createGrowPresentationAnswerError]);

    return (
        <div
            className={`h-full flex-col gap-y-5 ${
                isCurrent ? "flex" : "hidden"
            }`}
        >
            <h2 className="text-2xl font-extrabold text-secondary">Coaching</h2>
            <FormikProvider value={formik}>
                <Form
                    action=""
                    className="flex flex-col gap-y-2 h-ful overflow-y-auto grow"
                >
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">
                                    What
                                </span>
                                's{" "}
                                <span className="font-bold uppercase">
                                    your plan
                                </span>{" "}
                                on{" "}
                                <span className="font-bold uppercase">
                                    reaching all
                                </span>{" "}
                                your <span className="font-bold">goals</span>?
                            </label>
                        }
                        name="coaching_plan"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />

                    <label className="text-sm text-secondary">
                        On a scale of <span className="font-bold">1-10</span>,
                        how{" "}
                        <span className="font-bold uppercase">confident</span>{" "}
                        do you feel you can{" "}
                        <span className="font-bold uppercase">achieve</span>{" "}
                        your <span className="font-bold uppercase">goals</span>{" "}
                        on <span className="font-bold uppercase">your own</span>
                        ?
                    </label>
                    <Radio
                        name="coaching_confidence"
                        options={mapNumberOptions(10)}
                        value={formik.values.coaching_confidence}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "coaching_confidence",
                                Number(e.target.value)
                            )
                        }
                        orientation="horizontal"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">
                                    What can i do
                                </span>{" "}
                                to{" "}
                                <span className="font-bold uppercase">
                                    help
                                </span>{" "}
                                you get your{" "}
                                <span className="font-bold uppercase">
                                    confidence
                                </span>{" "}
                                to a <span className="font-bold">10</span>?{" "}
                                <span className="font-bold uppercase">Why</span>{" "}
                                that number?
                            </label>
                        }
                        name="coaching_help"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                </Form>
            </FormikProvider>
            <div className="flex justify-center gap-x-3 pb-8">
                <Button
                    variant="secondary"
                    label="Exit Presentation"
                    onClick={updateCurrentSlide}
                />
                <Button
                    variant="primary"
                    label="Previous"
                    isSubmitting={loading}
                    onClick={() => setCurrentSlide((prev) => prev - 1)}
                />
                <Button
                    variant="primary"
                    label="Next"
                    isSubmitting={loading}
                    onClick={formik.submitForm}
                />
            </div>
        </div>
    );
};

export default Coaching;
