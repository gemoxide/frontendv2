import { Form, FormikProvider, useFormik } from "formik";
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
import { PastSchema } from "../../../../../../core/services/answers/answers.schema";
import { convertStringToBoolean } from "../../../../../../core/helpers/convertStringToBoolean";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Past: React.FC<GrowSlideProps> = ({
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
            past_fitness_nutrition_program:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_fitness_nutrition_program || undefined,
            past_diets_exercise:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_diets_exercise || undefined,
            past_habits:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_habits || undefined,
            past_best_shape_years:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_best_shape_years || undefined,
            past_best_shape_months:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_best_shape_months || undefined,
            past_feel:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_feel || undefined,
            past_different:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_different || undefined,
            past_reasons:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_reasons || undefined,
            past_has_wellness_budget:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_has_wellness_budget || undefined,
        },
        validationSchema: PastSchema,
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
            <h2 className="text-2xl font-extrabold text-secondary">Past</h2>
            <FormikProvider value={formik}>
                <Form
                    action=""
                    className="flex flex-col gap-y-2 h-ful overflow-y-auto pb-2"
                >
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                Are you{" "}
                                <span className="font-bold uppercase">
                                    currently involved
                                </span>{" "}
                                in a{" "}
                                <span className="font-bold uppercase">
                                    fitness
                                </span>{" "}
                                and/or{" "}
                                <span className="font-bold uppercase">
                                    nutrition
                                </span>{" "}
                                program? If so, what does it{" "}
                                <span className="font-bold uppercase">
                                    look like
                                </span>
                                ?
                            </label>
                        }
                        name="past_fitness_nutrition_program"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                What have you{" "}
                                <span className="font-bold uppercase">
                                    done
                                </span>{" "}
                                in{" "}
                                <span className="font-bold uppercase">
                                    past
                                </span>
                                ?{" "}
                                <span className="font-bold uppercase">
                                    diets, exercise
                                </span>{" "}
                                Program
                            </label>
                        }
                        name="past_diets_exercise"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <label className="text-sm text-secondary">
                        When was the{" "}
                        <span className="font-bold uppercase">last time</span>{" "}
                        you felt you were in the{" "}
                        <span className="font-bold uppercase">
                            best shape of your life
                        </span>
                        ?
                    </label>
                    <div className="flex gap-x-2">
                        <Input
                            label="Years"
                            type="number"
                            name="past_best_shape_years"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                            min="0"
                        />
                        <Input
                            label="Months"
                            type="number"
                            name="past_best_shape_months"
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
                                <span className="font-bold uppercase">HOW</span>{" "}
                                did you{" "}
                                <span className="font-bold uppercase">
                                    feel
                                </span>{" "}
                                at that time?
                            </label>
                        }
                        name="past_feel"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">
                                    What
                                </span>{" "}
                                is{" "}
                                <span className="font-bold uppercase">
                                    different
                                </span>{" "}
                                now?
                            </label>
                        }
                        name="past_different"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                In your opinion, what were the{" "}
                                <span className="font-bold uppercase">
                                    reasons why
                                </span>{" "}
                                the things you tried{" "}
                                <span className="font-bold">
                                    didn't work long term
                                </span>
                                ?
                            </label>
                        }
                        name="past_reasons"
                        autoComplete
                        disabled={loading}
                        variant="primary"
                    />
                    <label className="text-sm text-secondary">
                        How would you{" "}
                        <span className="font-bold uppercase">rate</span> your{" "}
                        <span className="font-bold uppercase">knowledge</span>{" "}
                        and <span className="font-bold uppercase">habits</span>{" "}
                        <span className="font-bold">of</span>{" "}
                        <span className="font-bold uppercase">nutrition</span>{" "}
                        on a <span className="font-bold">scale of 1-10</span>?
                    </label>
                    <Radio
                        name="past_habits"
                        options={mapNumberOptions(10)}
                        value={formik.values.past_habits}
                        orientation="horizontal"
                        onChange={(e) =>
                            formik.setFieldValue(
                                "past_habits",
                                Number(e.target.value)
                            )
                        }
                    />
                    <label className="text-sm text-secondary">
                        Do you <span className="font-bold uppercase">have</span>{" "}
                        a{" "}
                        <span className="font-bold uppercase">
                            wellness budget
                        </span>
                        ?
                    </label>
                    <Radio
                        name="past_has_wellness_budget"
                        options={[
                            {
                                label: "Yes",
                                value: true,
                            },
                            {
                                label: "No",
                                value: false,
                            },
                        ]}
                        orientation="horizontal"
                        value={formik.values.past_has_wellness_budget}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "past_has_wellness_budget",
                                convertStringToBoolean(e.target.value)
                            )
                        }
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

export default Past;
