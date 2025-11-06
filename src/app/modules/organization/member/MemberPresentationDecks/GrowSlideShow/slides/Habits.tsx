import { useEffect, useMemo } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { BudgetSchema } from "../../../../../../core/services/answers/answers.schema";
import Textarea from "../../../../../../core/components/Forms/TextArea";
import { RootState } from "../../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import { GrowSlideProps } from ".";
import Input from "../../../../../../core/components/Forms/Input";
import { preventNegative } from "../../../../../../core/helpers/preventNegative";
import { preventDecimal } from "../../../../../../core/helpers/preventDecimal";
import Button from "../../../../../../core/components/Button";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/member-presentation-decks";
import { toast } from "react-toastify";

const Habits: React.FC<GrowSlideProps> = ({
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
            time_budget_social_media:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.time_budget_social_media || undefined,
            time_budget_streaming:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.time_budget_streaming || undefined,
            time_budget_shopping:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.time_budget_shopping || undefined,
            time_budget_sports_gaming:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.time_budget_sports_gaming || undefined,
            time_budget_other:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.time_budget_other || undefined,
            wellness_budget_dining_out:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.wellness_budget_dining_out || undefined,
            wellness_budget_sick_cold_meds:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.wellness_budget_sick_cold_meds || undefined,
            wellness_budget_shopping:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.wellness_budget_shopping || undefined,
            wellness_budget_groceries:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.wellness_budget_groceries || undefined,
            wellness_budget_percent_processed_food:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.wellness_budget_percent_processed_food ||
                undefined,
            wants_needs_feel:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.wants_needs_feel || undefined,
            past_best_shape_years:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.past_best_shape_years || undefined,
        },
        validationSchema: BudgetSchema,
        onSubmit: async (values) => {
            createGrowPresentationAnswer({
                id: memberPresentationDeck.id,
                member_id: getMemberData?.id,
                payload: values,
            });
            setCurrentSlide((prev) => prev + 1);
        },
    });

    const totalTimeBudget = useMemo(() => {
        return (
            (formik.values.time_budget_social_media ?? 0) +
            (formik.values.time_budget_streaming ?? 0) +
            (formik.values.time_budget_shopping ?? 0) +
            (formik.values.time_budget_sports_gaming ?? 0) +
            (formik.values.time_budget_other ?? 0)
        );
    }, [
        formik.values.time_budget_social_media,
        formik.values.time_budget_streaming,
        formik.values.time_budget_shopping,
        formik.values.time_budget_sports_gaming,
        formik.values.time_budget_other,
    ]);

    const processedGroceries = useMemo(() => {
        return (
            (formik.values.wellness_budget_groceries ?? 0) *
            ((formik.values.wellness_budget_percent_processed_food ?? 0) / 100)
        );
    }, [
        formik.values.wellness_budget_groceries,
        formik.values.wellness_budget_percent_processed_food,
    ]);

    const totalWellnessBudget = useMemo(() => {
        return (
            ((formik.values.wellness_budget_dining_out ?? 0) +
                (formik.values.wellness_budget_sick_cold_meds ?? 0) +
                (formik.values.wellness_budget_shopping ?? 0) +
                processedGroceries) *
            2
        );
    }, [
        formik.values.wellness_budget_dining_out,
        formik.values.wellness_budget_sick_cold_meds,
        formik.values.wellness_budget_shopping,
        processedGroceries,
    ]);

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
                Now, let's <span className="uppercase">look into</span> some{" "}
                <span className="uppercase">habits</span> you{" "}
                <span className="font-bold">might have</span> now or in past
                which were <span className="uppercase">preventing you</span>{" "}
                from <span className="uppercase">achieving</span> your{" "}
                <span className="uppercase">goals</span> & see if we{" "}
                <span className="uppercase">can avoid</span> them in the future
            </h2>
            <FormikProvider value={formik}>
                <Form
                    action=""
                    className="flex flex-col gap-y-2 h-ful overflow-y-auto pb-2"
                >
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
                    <h3 className="text-xl font-bold">Time budget</h3>
                    <p className="text-sm text-secondary">
                        How much{" "}
                        <span className="font-bold uppercase">
                            hours per week
                        </span>{" "}
                        do you spend doing the following?
                    </p>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="time_budget_social_media"
                            label="Social Media"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="time_budget_streaming"
                            label="Streaming"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="time_budget_shopping"
                            label="Internet Surfing"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="time_budget_sports_gaming"
                            label="Watching Sports or Video Gaming"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="time_budget_other"
                            label="Other"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                        <div className="w-1/3"></div>
                        <Input
                            type="number"
                            className="w-1/3"
                            name="total_time_budget"
                            isNotFormHook
                            value={totalTimeBudget}
                            readonly
                            label="Total Hours Per Week"
                        />
                    </div>
                    <h3 className="text-xl font-bold">Wellness budget</h3>
                    <p className="text-sm text-secondary">
                        How much{" "}
                        <span className="font-bold">$ do you spend</span>{" "}
                        <span className="font-bold uppercase">per week</span>{" "}
                        doing the following?
                    </p>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="wellness_budget_dining_out"
                            label="Dining Out"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="wellness_budget_sick_cold_meds"
                            label="Energy Drinks/Coffee"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="wellness_budget_shopping"
                            label="Retail Therapy"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                    </div>
                    <div className="flex gap-x-2">
                        <Input
                            className="w-1/3"
                            name="wellness_budget_groceries"
                            label="Groceries"
                            type="number"
                            onKeyDown={(e) => {
                                preventNegative(e);
                                preventDecimal(e);
                            }}
                        />
                        <div className="w-1/3 flex gap-x-2">
                            <Input
                                className="w-1/2"
                                name="wellness_budget_percent_processed_food"
                                label="What % is processed food?"
                                type="number"
                                onKeyDown={(e) => {
                                    preventNegative(e);
                                    preventDecimal(e);
                                }}
                            />
                            <Input
                                className="w-1/2"
                                name="wellness_budget_processed_groceries"
                                label="$ of Processed Groceries"
                                type="number"
                                isNotFormHook
                                readonly
                                value={processedGroceries}
                            />
                        </div>

                        <Input
                            className="w-1/3"
                            type="number"
                            name="total_wellness_budget"
                            isNotFormHook
                            label="Total $ Every 2 Weeks"
                            readonly
                            value={totalWellnessBudget}
                        />
                    </div>
                    <p className="text-sm text-secondary">
                        <span className="font-bold uppercase">Wants</span> &{" "}
                        <span className="font-bold uppercase">Needs</span>{" "}
                        analysis
                    </p>
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                <span className="font-bold uppercase">
                                    Tell me more
                                </span>{" "}
                                about that.{" "}
                                <span className="font-bold uppercase">How</span>{" "}
                                does that make{" "}
                                <span className="font-bold uppercase">
                                    you feel
                                </span>
                                ?
                            </label>
                        }
                        name="wants_needs_feel"
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

export default Habits;
