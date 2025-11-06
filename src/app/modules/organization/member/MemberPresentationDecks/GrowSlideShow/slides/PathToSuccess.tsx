import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GrowSlideProps } from ".";
import { RootState } from "../../../../../../core/state/reducer";
import { convertToPercent } from "../../../../../../core/helpers/toPercent";
import Today from "../../../../../../../../assets/img/today.png";
import Goal from "../../../../../../../../assets/img/goal.png";
import Path from "../../../../../../../../assets/img/path.png";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/group-assessments";
import Button from "../../../../../../core/components/Button";
import { calculateAge } from "../../../../../../core/helpers/calculateAge";
import moment from "moment";
import { IGroupAssessmentMember } from "../../../../../../core/interfaces/group-assessments.interface";

const PathToSuccess: React.FC<GrowSlideProps> = ({
    memberPresentationDeck,
    isCurrent,
    updateCurrentSlide,
    setCurrentSlide,
    assessment,
}) => {
    const { getMemberLatestGroupAssessment } = mapDispatchToProps();

    const [groupAssessmentMember, setGroupAssessmentMember] =
        useState<IGroupAssessmentMember>();

    const { data: getMemberData } = useSelector(
        (state: RootState) => state.members.getMember
    );

    const { data: groupAssessmentData } = useSelector(
        (state: RootState) =>
            state.groupAssessments.getMemberLatestGroupAssessment
    );

    useEffect(() => {
        if (!assessment) {
            getMemberLatestGroupAssessment({
                member_id: getMemberData?.id,
            });
        }
    }, []);

    useEffect(() => {
        if (assessment) {
            setGroupAssessmentMember(assessment);
        } else {
            setGroupAssessmentMember(groupAssessmentData);
        }
    }, [assessment, groupAssessmentData]);

    const totalTimeBudget = useMemo(() => {
        return (
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .time_budget_other ?? 0) +
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .time_budget_shopping ?? 0) +
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .time_budget_social_media ?? 0) +
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .time_budget_sports_gaming ?? 0) +
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .time_budget_streaming ?? 0)
        );
    }, [memberPresentationDeck.relationships.grow_slide_answer?.attributes]);

    const wellnessBudgetTotal = useMemo(() => {
        const processedGroceries =
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .wellness_budget_groceries ?? 0) *
            ((memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .wellness_budget_percent_processed_food ?? 0) /
                100);
        return (
            ((memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .wellness_budget_dining_out ?? 0) +
                (memberPresentationDeck.relationships.grow_slide_answer
                    ?.attributes.wellness_budget_shopping ?? 0) +
                (memberPresentationDeck.relationships.grow_slide_answer
                    ?.attributes.wellness_budget_sick_cold_meds ?? 0) +
                processedGroceries) *
            2
        );
    }, [memberPresentationDeck.relationships.grow_slide_answer?.attributes]);

    const monthsBestShape = useMemo(() => {
        return (
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .past_best_shape_years ?? 0) *
                12 +
            (memberPresentationDeck.relationships.grow_slide_answer?.attributes
                .past_best_shape_months ?? 0)
        );
    }, [memberPresentationDeck.relationships.grow_slide_answer?.attributes]);

    const goalBodyFat = useMemo(() => {
        let bodyFat = {
            low: 0,
            high: 0,
        };
        if (getMemberData) {
            const age = calculateAge(getMemberData?.attributes.birthday);
            if (getMemberData.attributes.gender === "male") {
                if (age >= 20 && age <= 39) {
                    bodyFat.low = 8;
                    bodyFat.high = 19;
                } else if (age >= 40 && age <= 59) {
                    bodyFat.low = 11;
                    bodyFat.high = 21;
                } else if (age >= 60 && age <= 79) {
                    bodyFat.low = 13;
                    bodyFat.high = 24;
                }
            } else {
                if (age >= 20 && age <= 39) {
                    bodyFat.low = 21;
                    bodyFat.high = 32;
                } else if (age >= 40 && age <= 59) {
                    bodyFat.low = 23;
                    bodyFat.high = 33;
                } else if (age >= 60 && age <= 79) {
                    bodyFat.low = 24;
                    bodyFat.high = 35;
                }
            }
        }
        return bodyFat;
    }, [groupAssessmentMember?.attributes, getMemberData?.attributes]);

    const goalWeight = useMemo(() => {
        let weight = {
            low: 0,
            high: 0,
        };
        if (groupAssessmentMember) {
            const lbm =
                groupAssessmentMember?.attributes?.weight -
                groupAssessmentMember.attributes.fat_mass;

            weight.low = Math.round(lbm / (1 - goalBodyFat.low / 100));
            weight.high = Math.round(lbm / (1 - goalBodyFat.high / 100));
        }
        return weight;
    }, [groupAssessmentMember?.attributes, goalBodyFat]);

    const goalFatMass = useMemo(() => {
        let fatMass = {
            low: 0,
            high: 0,
        };
        if (groupAssessmentMember) {
            fatMass.low = Math.round(
                groupAssessmentMember?.attributes?.weight - goalWeight.high
            );
            fatMass.high = Math.round(
                groupAssessmentMember?.attributes?.weight - goalWeight.low
            );
        }

        fatMass.low = fatMass.low < 0 ? 0 : fatMass.low;
        fatMass.high = fatMass.high < 0 ? 0 : fatMass.high;
        
        return fatMass;
    }, [groupAssessmentMember?.attributes, goalBodyFat]);

    const weeksToGoal = useMemo(() => {
        let weeks = {
            low: 0,
            high: 0,
        };
        if (groupAssessmentMember) {
            weeks.low = Number((goalFatMass.low / 1.5).toFixed(1));
            weeks.high = Number((goalFatMass.high / 1.5).toFixed(1));
        }

        weeks.low = weeks.low < 0 ? 0 : weeks.low;
        weeks.high = weeks.high < 0 ? 0 : weeks.high;

        return weeks;
    }, [groupAssessmentMember?.attributes, goalFatMass]);

    const goalMonth = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + weeksToGoal.high * 7);
        return moment(date).format("MMM YYYY");
    }, [weeksToGoal.high]);

    return (
        <div
            className={`h-full flex-col gap-y-5 ${
                isCurrent ? "flex" : "hidden"
            }`}
        >
            <h2 className="text-4xl font-extrabold text-secondary text-center">
                {getMemberData?.attributes.first_name}{" "}
                {getMemberData?.attributes.last_name}'s Path to Success
            </h2>
            <div className="flex justify-between">
                <h3 className="text-xl xl:text-2xl text-secondary font-bold">
                    Time Budget {totalTimeBudget} Hours
                </h3>
                <h3 className="text-xl xl:text-2xl text-secondary font-bold">
                    Wellness Budget ${wellnessBudgetTotal}
                </h3>
                <h3 className="text-xl xl:text-2xl text-secondary font-bold">
                    Months Since Best Shape of Your Life {monthsBestShape}
                </h3>
            </div>
            <div className="flex flex-col gap-y-5 overflow-y-auto grow">
                <div className="flex gap-x-2 w-full grow">
                    <div className="flex flex-col w-fit items-center">
                        <img
                            src={Today}
                            alt="Today"
                            className="w-[150px] xl:w-[180px] 2xl:w-[200px] mt-[180px] xl:mt-[220px] 2xl:mt-[330px]"
                        />
                        <p className="font-bold text-lg">
                            Weight{" "}
                            {groupAssessmentMember?.attributes?.weight
                                ? `${groupAssessmentMember?.attributes?.weight} lbs`
                                : "Not available"}
                        </p>
                        <p className="font-bold text-lg">
                            {groupAssessmentMember?.attributes?.weight
                                ? `${groupAssessmentMember?.attributes?.percent_body_fat} %`
                                : "Not available"}{" "}
                            Body Fat
                        </p>
                        <p className="font-bold text-lg">
                            Fat Mass{" "}
                            {groupAssessmentMember?.attributes?.weight
                                ? `${groupAssessmentMember?.attributes?.fat_mass} lbs`
                                : "Not available"}
                        </p>
                    </div>
                    <div className="flex flex-col w-1/3 grow items-center">
                        <img
                            src={Path}
                            alt="path"
                            className="mt-[150px] xl:mt-[230px] 2xl:mt-[250px]"
                        />
                    </div>

                    <div className="flex flex-col w-fit items-center">
                        <img
                            src={Goal}
                            alt="Goal"
                            className="w-[200px] xl:w-[300px] 2xl:w-[400px]"
                        />
                        <p className="font-bold text-lg">
                            Weight {goalWeight.low}-{goalWeight.high} lbs
                        </p>
                        <p className="font-bold text-lg">
                            {goalBodyFat.low}-{goalBodyFat.high}% Body Fat Body
                            Fat
                        </p>
                        <p className="font-bold text-lg">
                            Fat Mass {goalFatMass.low}-{goalFatMass.high} lbs
                        </p>
                    </div>
                </div>
                <div className="relative flex flex-col items-center -mt-[180px] xl:-mt-[200px] 2xl:-mt-20">
                    <CalendarIcon className="w-[200px]" />
                    <div className="absolute m-auto top-[95px] text-center">
                        <p className="text-lg font-bold">
                            {weeksToGoal.low}-{weeksToGoal.high} Weeks
                        </p>
                        <p className="text-lg font-bold">{goalMonth}</p>
                    </div>
                    <p className="text-xl font-bold text-center">
                        Date goal will be achieved
                    </p>
                </div>
            </div>
            <div className="flex justify-center gap-x-3">
                <Button
                    variant="secondary"
                    label="Exit Presentation"
                    onClick={updateCurrentSlide}
                />
                <Button
                    variant="primary"
                    label="Previous"
                    onClick={() => setCurrentSlide((prev) => prev - 1)}
                />
                <Button
                    variant="primary"
                    label="Next"
                    onClick={() => setCurrentSlide((prev) => prev + 1)}
                />
            </div>
        </div>
    );
};

export default PathToSuccess;
