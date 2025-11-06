import { Form, FormikProvider, useFormik } from "formik";
import { GoalsMotivationSchema } from "../../../../../../core/services/answers/answers.schema";
import Textarea from "../../../../../../core/components/Forms/TextArea";
import { RootState } from "../../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import Radio from "../../../../../../core/components/Forms/Radio";
import { GrowSlideProps } from ".";
import { mapNumberOptions } from "../../../../../../core/helpers/mapNumberOptions";
import Input from "../../../../../../core/components/Forms/Input";
import { preventNegative } from "../../../../../../core/helpers/preventNegative";
import { preventDecimal } from "../../../../../../core/helpers/preventDecimal";
import Button from "../../../../../../core/components/Button";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/member-presentation-decks";
import { useEffect } from "react";
import { toast } from "react-toastify";

const GoalsMotivations: React.FC<GrowSlideProps> = ({
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
            goals_motivations_fitness_goals:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_fitness_goals || undefined,
            goals_motivations_affect_life:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_affect_life || undefined,
            goals_motivations_important:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_important || undefined,
            goals_motivations_months:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_months || undefined,
            goals_motivations_years:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_years || undefined,
            goals_motivations_affected:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_affected || undefined,
            goals_motivations_support:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_support || undefined,
            goals_motivations_feel:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.goals_motivations_feel || undefined,
        },
        validationSchema: GoalsMotivationSchema,
        onSubmit: async (values) => {
            createGrowPresentationAnswer({
                id: memberPresentationDeck.id,
                member_id: getMemberData?.id,
                payload: values,
            });
            // setCurrentSlide((prev) => prev + 1);
        },
    });

    useEffect(() => {
        if (createGrowPresentationAnswerSuccess) {
            setCurrentSlide((prev) => prev + 1);
        }
    }, [createGrowPresentationAnswerSuccess]);

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
                Goals & Motivation
            </h2>
            <FormikProvider value={formik}>
                <Form
                    action=""
                    className="flex flex-col gap-y-2 h-ful overflow-y-auto pb-2"
                >
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                What are your{" "}
                                <span className="font-bold uppercase">
                                    3 fitness goals
                                </span>
                                ? <span className="font-bold">WHY</span>?
                            </label>
                        }
                        name="goals_motivations_fitness_goals"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">How</span>{" "}
                                will{" "}
                                <span className="font-bold uppercase">
                                    achieving
                                </span>{" "}
                                you goals{" "}
                                <span className="font-bold uppercase">
                                    affect your life
                                </span>
                                ?
                            </label>
                        }
                        name="goals_motivations_affect_life"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />

                    <label className="text-sm text-secondary">
                        <span className="font-bold uppercase">
                            How important
                        </span>{" "}
                        are these{" "}
                        <span className="font-bold uppercase">
                            goals to you
                        </span>{" "}
                        on a scale <span className="font-bold">1-10</span>?
                    </label>
                    <Radio
                        name="goals_motivations_important"
                        options={mapNumberOptions(10)}
                        value={formik.values.goals_motivations_important}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "goals_motivations_important",
                                Number(e.target.value)
                            )
                        }
                        orientation="horizontal"
                    />
                    <label className="text-sm text-secondary">
                        <span className="font-bold uppercase">How long</span>{" "}
                        have you been{" "}
                        <span className="font-bold uppercase">
                            thinking about
                        </span>{" "}
                        achieving these{" "}
                        <span className="font-bold uppercase">goals</span>?
                    </label>
                    <div className="flex gap-x-2">
                        <Input
                            label="Years"
                            type="number"
                            name="goals_motivations_years"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                            min="0"
                        />
                        <Input
                            label="Months"
                            type="number"
                            name="goals_motivations_months"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                            min="0"
                        />
                    </div>
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">
                                    Who else
                                </span>{" "}
                                will be{" "}
                                <span className="font-bold uppercase">
                                    affected
                                </span>{" "}
                                when you achieve these{" "}
                                <span className="font-bold uppercase">
                                    goals
                                </span>
                                ?
                            </label>
                        }
                        name="goals_motivations_affected"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">Who</span>{" "}
                                do you have in your life that{" "}
                                <span className="font-bold uppercase">
                                    will support you
                                </span>{" "}
                                in this journey?
                            </label>
                        }
                        name="goals_motivations_support"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">
                                    Tell me more
                                </span>{" "}
                                about that.{" "}
                                <span className="font-bold uppercase">How</span>{" "}
                                does that{" "}
                                <span className="font-bold uppercase">
                                    make you feel
                                </span>
                                ?
                            </label>
                        }
                        name="goals_motivations_feel"
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
                    label="Next"
                    isSubmitting={loading}
                    onClick={formik.submitForm}
                />
            </div>
        </div>
    );
};

export default GoalsMotivations;
