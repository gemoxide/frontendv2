import Button from "../../../../../../core/components/Button";
import Input from "../../../../../../core/components/Forms/Input";
import debounce from "lodash/debounce";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../core/interfaces/group-assessments.interface";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/group-assessments";
import Measurements from "./Sections/Measurements";
import BodyScan from "./Sections/BodyScan";
import Anterior from "./Sections/Anterior";
import Lateral from "./Sections/Lateral";
import Posterior from "./Sections/Posterior";
import Lunge from "./Sections/Lunge";
import Shoulder from "./Sections/Shoulder";
import FunctionalMovementScreen from "./Sections/FunctionalMovementScreen";
import Select from "../../../../../../core/components/Forms/Select";
import {
    fmsScoreDropdown,
    fmsScoreTooltip,
} from "../../../../../../core/constants/fms-score";
import { useState } from "react";

interface Props {
    groupAssessmentId: number;
    groupAssessmentMode: string;
    member: IGroupAssessmentMember;
    initialScore: number;
}

const FunctionalMovementForm: React.FC<Props> = ({
    groupAssessmentId,
    groupAssessmentMode,
    member,
    initialScore,
}) => {
    const { updateMemberAssessment } = mapDispatchToProps();
    const [fmsScore, setFmsScore] = useState<number>(initialScore);

    const updateFmsInitialScore = (
        name: string,
        value: number | string | boolean
    ) => {
        if (
            name === "overhead_squat_score" ||
            name === "shoulder_score" ||
            name === "lunge_score"
        ) {
            const newScore =
                fmsScore + (value as number) - (member.attributes as any)[name];
            setFmsScore(newScore);
        }
    };

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

        const [name, value] = Object.entries(param)[0];
        updateFmsInitialScore(name, value);
    };

    const handleUpdateAssessment = async (
        name: string,
        value: number | string
    ) => {
        await updateAssessment({ [name]: value });
        updateFmsInitialScore(name, value);
    };

    return (
        <div>
            <Button
                variant="primary"
                label="Complete Functional Movement"
                className="w-max ml-auto mr-0 block mb-2"
                onClick={() => {
                    updateAssessment({
                        is_functional_movement_complete: true,
                        is_body_scan_complete: true,
                        time_zone:
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                    });
                }}
            />
            <div className="grid gap-2 grid-cols-2">
                <Measurements
                    member={member}
                    updateAssessment={updateAssessment}
                />
                <BodyScan member={member} updateAssessment={updateAssessment} />
                {groupAssessmentMode === "Standard" ? (
                    <>
                        <div className="col-span-2 border border-solid border-grey grid grid-cols-6 gap-x-3 p-3 rounded-[10px]">
                            <span className="col-span-6">Overhead Squat</span>
                            <Anterior
                                member={member}
                                updateAssessment={updateAssessment}
                            />
                            <Lateral
                                member={member}
                                updateAssessment={updateAssessment}
                            />
                            <Posterior
                                member={member}
                                updateAssessment={updateAssessment}
                            />
                            <Select
                                name="overhead_squat_score"
                                label="Score"
                                className="mt-3 col-span-1"
                                options={fmsScoreDropdown}
                                placeHolder="Select Score"
                                tooltip={fmsScoreTooltip}
                                defaultValue={
                                    member.attributes.overhead_squat_score
                                }
                                onChange={debounce(
                                    (
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                        const value = Number(e.target.value);
                                        handleUpdateAssessment(
                                            "overhead_squat_score",
                                            value
                                        );
                                    },
                                    500
                                )}
                                autoComplete
                                isNotFormHook
                            />
                            <Input
                                label="Notes"
                                className="col-span-5 mt-3"
                                inputClassName="h-10"
                                name="overhead_squat_notes"
                                variant="primary"
                                defaultValue={
                                    member.attributes.overhead_squat_notes
                                }
                                onChange={debounce(
                                    (
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        const value = e.target.value;
                                        handleUpdateAssessment(
                                            "overhead_squat_notes",
                                            value
                                        );
                                    },
                                    500
                                )}
                                isNotFormHook
                            />
                        </div>
                        <Lunge
                            member={member}
                            updateAssessment={updateAssessment}
                        />
                        <Shoulder
                            member={member}
                            updateAssessment={updateAssessment}
                        />
                    </>
                ) : (
                    <FunctionalMovementScreen
                        member={member}
                        updateAssessment={updateAssessment}
                    />
                )}
            </div>
        </div>
    );
};

export default FunctionalMovementForm;
