import { useState, useEffect } from "react";
import { ReactComponent as AllReps } from "../../../../../../../../assets/icons/all-reps.svg";
import debounce from "lodash/debounce";
import Button from "../../../../../../core/components/Button";
import { Exercise } from "../../../../../../core/interfaces/exercise.interface";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../core/interfaces/group-assessments.interface";
import Input from "../../../../../../core/components/Forms/Input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../core/state/reducer";

interface Props {
    defaultReps: number;
    isResetReps: boolean;
    isDisabled: boolean;
    exercise: Exercise;
    member: IGroupAssessmentMember;
    updateAssessment: (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => void;
    updateCompletedExercise: (isInit: boolean) => void;
    resetIsResetReps: () => void;
    updateCompletedReps: (reps: number) => void;
}

const MemberExercise: React.FC<Props> = ({
    isResetReps,
    isDisabled,
    exercise,
    member,
    updateAssessment,
    updateCompletedExercise,
    resetIsResetReps,
    updateCompletedReps,
    defaultReps,
}) => {
    const { loading } = useSelector(
        (state: RootState) => state.groupAssessments.updateMemberAssessment
    );

    const [reps, setReps] = useState(defaultReps);
    const [isInit, setIsInit] = useState(true);

    const subtractReps = () => {
        if (reps > 0) {
            setReps(reps - 1);
            updateCompletedReps(-1);
        }
    };

    const addReps = () => {
        if (reps < exercise.reps) {
            setReps(reps + 1);
            updateCompletedReps(1);
        }
    };

    const maxReps = () => {
        setReps((prev) => {
            updateCompletedReps(exercise.reps - prev);
            return exercise.reps;
        });
    };

    useEffect(() => {
        if (reps >= exercise.reps) {
            updateCompletedExercise(isInit);
            setIsInit(false);
        }
    }, [reps]);

    useEffect(() => {
        if (isResetReps) {
            setReps(0);
            resetIsResetReps();
        }
    }, [isResetReps]);

    return (
        <div
            className={`flex flex-col gap-y-1 border border-grey p-3 rounded-[10px] ${
                reps >= exercise.reps ? "bg-tertiary" : ""
            }`}
        >
            <div className="flex justify-between items-center">
                <span className="text-sm font-bold">{exercise.name}</span>
                <span className="text-xs">{exercise.type}</span>
            </div>
            <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 justify-between">
                <div>
                    <p className="text-grey-secondary text-xs">Reps</p>
                    <p className="text-secondary text-base">
                        {exercise.repsText || exercise.reps}
                    </p>
                </div>

                <div>
                    {exercise.weight_key && (
                        <>
                            <p className="text-grey-secondary text-xs">
                                Weight
                            </p>
                            <Input
                                inputClassName="!px-3 py-0 h-9"
                                name={exercise?.weight_key}
                                type="number"
                                variant="primary"
                                defaultValue={
                                    member.attributes[
                                        exercise.weight_key as keyof typeof member.attributes
                                    ]
                                }
                                onChange={debounce(
                                    (
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        updateAssessment({
                                            [exercise?.weight_key || ""]:
                                                parseFloat(e.target.value),
                                        });
                                    },
                                    500
                                )}
                                isNotFormHook
                            />
                        </>
                    )}
                </div>

                <div
                    className={`flex gap-x-1 items-end pb-[4px] mt-2 ${
                        isDisabled || reps >= exercise.reps
                            ? "pointer-events-none"
                            : ""
                    }`}
                >
                    <Button
                        label="-"
                        onClick={subtractReps}
                        variant="secondary"
                        className="rounded-[4px] min-h-[28px] w-7 h-7 p-0"
                    />
                    <p>{reps}</p>
                    <Button
                        label="+"
                        onClick={addReps}
                        variant="secondary"
                        className="rounded-[4px] min-h-[28px] w-7 h-7 p-0"
                    />
                    <Button
                        label={<AllReps />}
                        isSubmitting={loading}
                        onClick={maxReps}
                        variant="secondary"
                        className="rounded-[4px] min-h-[28px] w-7 h-7 p-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default MemberExercise;
