import { Form, FormikProvider, useFormik } from "formik";
import { SummarySchema } from "../../../../../../core/services/answers/answers.schema";
import Textarea from "../../../../../../core/components/Forms/TextArea";
import { RootState } from "../../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import { GrowSlideProps } from ".";
import Button from "../../../../../../core/components/Button";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/member-presentation-decks";
import Input from "../../../../../../core/components/Forms/Input";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GrowSummary: React.FC<GrowSlideProps> = ({
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
            summary_goal:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.summary_goal || undefined,
            summary_x_factor:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.summary_x_factor || undefined,
            summary_obstacles:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.summary_obstacles || undefined,
            summary_pillar_gap:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.summary_pillar_gap || undefined,
        },
        validationSchema: SummarySchema,
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
            <h2 className="text-2xl font-extrabold text-secondary">
                Grow Summary
            </h2>
            <FormikProvider value={formik}>
                <Form
                    action=""
                    className="flex flex-col gap-y-2 h-ful overflow-y-auto grow"
                >
                    <Input
                        type="text"
                        label="GOAL"
                        name="summary_goal"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label="X Factor"
                        name="summary_x_factor"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label="Obstacles"
                        name="summary_obstacles"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label="Pillar Gap"
                        name="summary_pillar_gap"
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

export default GrowSummary;
