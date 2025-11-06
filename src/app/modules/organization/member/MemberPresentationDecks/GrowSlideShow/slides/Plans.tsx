import { Form, FormikProvider, useFormik } from "formik";
import { PlanSchema } from "../../../../../../core/services/answers/answers.schema";
import Textarea from "../../../../../../core/components/Forms/TextArea";
import { RootState } from "../../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import { GrowSlideProps } from ".";
import Input from "../../../../../../core/components/Forms/Input";
import Button from "../../../../../../core/components/Button";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/member-presentation-decks";
import Radio from "../../../../../../core/components/Forms/Radio";
import { PLAN_TYPES } from "../../../../../../core/constants/plan-types";
import Checkbox from "../../../../../../core/components/Forms/CheckBox";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Plans: React.FC<GrowSlideProps> = ({
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
            plan_prescribed:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.plan_prescribed || undefined,
            plan_types:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.plan_types || undefined,
            plan_member_selected:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.plan_member_selected || undefined,
            plan_coaching_status:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.plan_coaching_status || undefined,
            plan_notes:
                memberPresentationDeck?.relationships?.grow_slide_answer
                    ?.attributes?.plan_notes || undefined,
        },
        validationSchema: PlanSchema,
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
            <h2 className="text-2xl font-extrabold text-secondary">Plans</h2>
            <FormikProvider value={formik}>
                <Form
                    action=""
                    className="flex flex-col gap-y-2 h-ful overflow-y-auto grow"
                >
                    <Input
                        name="plan_prescribed"
                        label={
                            <label className="text-sm text-secondary">
                                Plan{" "}
                                <span className="font-bold uppercase">
                                    prescribed
                                </span>{" "}
                                by the Coach
                            </label>
                        }
                        type="text"
                    />
                    <div className="flex gap-x-2">
                        {PLAN_TYPES.map((planType) => {
                            return (
                                <Checkbox
                                    label={planType.label}
                                    name="plan_types"
                                    value={planType.value}
                                    defaultChecked={formik.values.plan_types?.includes(
                                        planType.value
                                    )}
                                />
                            );
                        })}
                    </div>
                    {/* <Radio
                        name="plan_type"
                        options={[
                            {
                                label: "BASE",
                                value: "Base",
                            },
                            {
                                label: "BURN",
                                value: "Burn",
                            },
                            {
                                label: "BUILD",
                                value: "Build",
                            },
                        ]}
                        value={formik.values.plan_type}
                        onChange={(e) =>
                            formik.setFieldValue("plan_type", e.target.value)
                        }
                        orientation="horizontal"
                    /> */}
                    <Input
                        name="plan_member_selected"
                        label={
                            <label className="text-sm text-secondary">
                                Plan{" "}
                                <span className="font-bold uppercase">
                                    member selected
                                </span>
                            </label>
                        }
                        type="text"
                    />
                    <Radio
                        name="plan_coaching_status"
                        options={[
                            {
                                label: "Coached Client",
                                value: "Coached Client",
                            },
                            {
                                label: "Warm No",
                                value: "Warm No",
                            },
                            {
                                label: "Cold No",
                                value: "Cold No",
                            },
                        ]}
                        value={formik.values.plan_coaching_status}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "plan_coaching_status",
                                e.target.value
                            )
                        }
                        orientation="horizontal"
                    />
                    <Input
                        type="text"
                        label={
                            <label className="text-sm text-secondary">
                                Notes
                            </label>
                        }
                        name="plan_notes"
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

export default Plans;
