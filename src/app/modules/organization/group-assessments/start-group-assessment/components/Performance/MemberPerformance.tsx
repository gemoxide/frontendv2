import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../core/interfaces/group-assessments.interface";
import MemberAvatar from "../../../../../../../../assets/img/default-user.png";
import { ReactComponent as KettleBell } from "../../../../../../../../assets/icons/kettle-bell-round.svg";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/group-assessments";
import { PERFORMANCE_EXERCISES } from "../../../../../../core/constants/performance-exercises";
import { PerformanceExercise } from "../../../../../../core/interfaces/exercise.interface";
import { ReactComponent as AllReps } from "../../../../../../../../assets/icons/all-reps.svg";

import MemberExercise from "./MemberExercise";
import Button from "../../../../../../core/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../core/state/reducer";
import { ROUTES } from "../../../../../../core/constants/routes";

interface Props {
    groupAssessmentId: number;
    member: IGroupAssessmentMember;
}

const MemberPerformance: React.FC<Props> = ({ groupAssessmentId, member }) => {
    const [exercisesCompleted, setExercisesCompleted] = useState(0);
    const [totalReps, setTotalReps] = useState(
        member?.attributes?.completed_reps
    );
    const [isResetReps, setIsResetReps] = useState(false);

    const { updateMemberAssessment } = mapDispatchToProps();

    const { loading } = useSelector(
        (state: RootState) => state.groupAssessments.updateMemberAssessment
    );

    const updateAssessment = (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => {
        updateMemberAssessment({
            ...param,
            group_assessment_id: groupAssessmentId,
            member_id: member.id,
        });
    };

    const updateCompletedExercise = (
        val: number,
        isInit: boolean,
        increment: boolean
    ) => {
        setExercisesCompleted(val);
        if (!isInit) {
            const setsComplete =
                val /
                PERFORMANCE_EXERCISES[
                    member.attributes.performance_test_type
                        .replaceAll(" ", "_")
                        .toLowerCase() as keyof PerformanceExercise
                ].length;

            //if increment is true, increment the sets completed by 1, else decrement by 1

            updateAssessment({
                sets_completed:
                    Math.floor(member.attributes.sets_completed) +
                    (increment ? setsComplete : -setsComplete),
                ...(setsComplete === 1 && {
                    is_performance_test_complete: true,
                    completed_reps: 0,
                }),
            });

            // updateAssessment({
            //     sets_completed:
            //         Math.floor(member.attributes.sets_completed) + setsComplete,
            //     ...(setsComplete === 1 && {
            //         is_performance_test_complete: true,
            //         completed_reps: 0,
            //     }),
            // });

            if (setsComplete === 1) {
                setTotalReps(0);
            }
            setIsResetReps(setsComplete === 1);
        }
    };

    const resetIsResetReps = () => {
        setIsResetReps(false);
    };

    let defaultReps = member.attributes.completed_reps ?? 0;

    return (
        <div className="flex flex-col w-[23.6%] gap-1">
            <div>
                <div className="flex flex-col lg:flex-row gap-x-2 items-center lg:items-start">
                    <img
                        src={member?.attributes?.avatar || MemberAvatar}
                        className="w-10 h-10 rounded-full"
                        alt={`${member.attributes.first_name} ${member.attributes.last_name}`}
                    />
                    <div className="text-center lg:text-start">
                        <Link
                            to={ROUTES.USER.member.parse(member.id)}
                            target="_blank"
                        >
                            <p className="text-secondary text-base font-bold">
                                {member.attributes.first_name}{" "}
                                {member.attributes.last_name}
                            </p>
                        </Link>
                        <p className="text-grey-secondary text-xs">
                            {member.attributes.performance_test_type}
                        </p>
                    </div>
                </div>
                <div className="h-4 my-2">
                    {/* {member.attributes.previous_sets_completed > 0 && ( */}
                    <p className="text-xs text-center lg:text-left">
                        Previous Performance:{" "}
                        {member.attributes?.previous_performance_test_score}{" "}
                    </p>
                    {/* )} */}
                </div>
            </div>
            <div className="flex">
                <div className="flex gap-x-1 h-4 mt-1 grow">
                    {[
                        ...Array(Math.floor(member.attributes.sets_completed)),
                    ].map((num, i) => (
                        <KettleBell key={i} className="w-4 h-4" />
                    ))}
                </div>

                {member?.attributes?.sets_completed > 0 && (
                    <Button
                        label={"-"}
                        isSubmitting={loading}
                        onClick={() =>
                            updateCompletedExercise(
                                PERFORMANCE_EXERCISES[
                                    member.attributes.performance_test_type
                                        .replaceAll(" ", "_")
                                        .toLowerCase() as keyof PerformanceExercise
                                ].length,
                                false,
                                false
                            )
                        }
                        variant="secondary"
                        className="rounded-[4px] min-h-[28px] w-7 h-7 p-0 grow-0 mr-2"
                    />
                )}

                <Button
                    label={<AllReps />}
                    isSubmitting={loading}
                    onClick={() =>
                        updateCompletedExercise(
                            PERFORMANCE_EXERCISES[
                                member.attributes.performance_test_type
                                    .replaceAll(" ", "_")
                                    .toLowerCase() as keyof PerformanceExercise
                            ].length,
                            false,
                            true
                        )
                    }
                    variant="secondary"
                    className="rounded-[4px] min-h-[28px] w-7 h-7 p-0 grow-0"
                />
            </div>

            <div className="flex flex-col rounded-[10px] border-grey gap-y-3">
                {member.attributes.performance_test_type &&
                    PERFORMANCE_EXERCISES[
                        member.attributes.performance_test_type
                            .replaceAll(" ", "_")
                            .toLowerCase() as keyof PerformanceExercise
                    ].map((exercise, i) => {
                        const reps =
                            defaultReps >= exercise.reps
                                ? exercise.reps
                                : defaultReps;
                        defaultReps -= reps;
                        return (
                            <MemberExercise
                                defaultReps={reps}
                                isResetReps={isResetReps}
                                isDisabled={exercisesCompleted < i}
                                exercise={exercise}
                                member={member}
                                updateAssessment={updateAssessment}
                                updateCompletedExercise={(isInit: boolean) =>
                                    updateCompletedExercise(i + 1, isInit, true)
                                }
                                updateCompletedReps={(reps) =>
                                    setTotalReps((prev) => {
                                        const previousReps = prev ?? 0;
                                        updateAssessment({
                                            completed_reps: previousReps + reps,
                                        });
                                        return previousReps + reps;
                                    })
                                }
                                resetIsResetReps={resetIsResetReps}
                                key={i}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default MemberPerformance;
